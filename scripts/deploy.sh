#!/usr/bin/env bash
# Push the current repo to GitHub and deploy to Hostinger via rsync.
# Usage:
#   DEPLOY_HOST=host DEPLOY_USER=user DEPLOY_TARGET=/path/on/server [DEPLOY_PORT=22] [REMOTE=origin] [BRANCH=main] ./scripts/deploy.sh
# Environment:
#   DEPLOY_HOST, DEPLOY_USER, DEPLOY_TARGET, DEPLOY_PORT, SSH_KEY -> forwarded to deploy_hostinger.sh
#   REMOTE (default: origin) -> git remote for push
#   BRANCH (default: current checked-out branch) -> branch to push
#   SKIP_GIT=1             -> skip pushing to Git before deploy
#   SKIP_NPM_INSTALL=1     -> skip local npm ci
#   SKIP_BUILD=1           -> skip npm run build even if defined
#   RUN_REMOTE_COMMANDS=1  -> run remote npm install / pm2 restart after upload
#   EXCLUDE_NODE_MODULES=1 -> skip uploading node_modules in the final rsync
#   AUTO_COMMIT=0          -> disable auto-commit of uncommitted changes before push
#   COMMIT_MESSAGE="..."   -> custom commit message when AUTO_COMMIT runs
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

DEFAULT_HOST="217.21.94.162"
DEFAULT_USER="u222466996"
DEFAULT_TARGET="public_html"
DEFAULT_PORT="65002"

DEPLOY_HOST=${DEPLOY_HOST:-$DEFAULT_HOST}
DEPLOY_USER=${DEPLOY_USER:-$DEFAULT_USER}
DEPLOY_TARGET=${DEPLOY_TARGET:-$DEFAULT_TARGET}
DEPLOY_PORT=${DEPLOY_PORT:-$DEFAULT_PORT}
SSH_KEY=${SSH_KEY:-}

if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_TARGET" ]; then
  cat <<EOF
Missing deployment variables. Provide DEPLOY_HOST, DEPLOY_USER, and DEPLOY_TARGET. Example:
  DEPLOY_HOST=server.example.com DEPLOY_USER=deploy DEPLOY_TARGET=/home/deploy/app ./scripts/deploy.sh
EOF
  exit 2
fi

if [ "${SKIP_GIT:-0}" != "1" ]; then
  REMOTE=${REMOTE:-origin}
  DEFAULT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  BRANCH=${BRANCH:-$DEFAULT_BRANCH}
  AUTO_COMMIT=${AUTO_COMMIT:-1}

  if ! git diff --cached --quiet || ! git diff --quiet; then
    if [ "$AUTO_COMMIT" = "1" ]; then
      echo "📝 Auto-committing pending changes"
      git add -A
      if git diff --cached --quiet; then
        echo "ℹ️  Nothing new to commit after staging."
      else
        COMMIT_MESSAGE=${COMMIT_MESSAGE:-"chore: deploy $(date -u +'%Y-%m-%d %H:%M:%SZ')"}
        git commit -m "$COMMIT_MESSAGE"
      fi
    else
      echo "Uncommitted changes detected. Commit or stash before deploying."
      exit 3
    fi
  fi

  echo "🚀 Pushing branch '$BRANCH' to GitHub remote '$REMOTE'"
  git push "$REMOTE" "$BRANCH"
else
  echo "ℹ️  Skipping Git push (unset SKIP_GIT or set SKIP_GIT=0 to enable)."
fi

BUILD_DIR="$(mktemp -d "${TMPDIR:-/tmp}/pos-website-build.XXXXXX")"
cleanup() {
  rm -rf "$BUILD_DIR"
}
trap cleanup EXIT

echo "🧱 Preparing deploy bundle in $BUILD_DIR"
rsync -a --delete --exclude='.git' --exclude='node_modules' --exclude='.github' --exclude='.DS_Store' "$REPO_ROOT"/ "$BUILD_DIR"/

INSTALLED_DEPS=0

if [ -f "$BUILD_DIR/package.json" ]; then
  if [ "${SKIP_NPM_INSTALL:-0}" != "1" ]; then
    if command -v npm >/dev/null 2>&1; then
      echo "📦 Installing project dependencies locally"
      (cd "$BUILD_DIR" && npm ci)
      INSTALLED_DEPS=1
    else
      echo "⚠️ npm not available locally; skipping dependency install"
    fi
  else
    echo "ℹ️  Local npm install disabled via SKIP_NPM_INSTALL=1"
  fi

  if [ "${SKIP_BUILD:-0}" != "1" ]; then
    if command -v npm >/dev/null 2>&1; then
      echo "🛠  Running npm run build --if-present"
      (cd "$BUILD_DIR" && npm run build --if-present)
    else
      echo "⚠️ npm not available locally; skipping build step"
    fi
  else
    echo "ℹ️  Build step disabled via SKIP_BUILD=1"
  fi

  if [ "$INSTALLED_DEPS" -eq 1 ] && command -v npm >/dev/null 2>&1; then
    echo "🧹 Pruning dev dependencies for production"
    (cd "$BUILD_DIR" && npm prune --production)
  fi
else
  echo "ℹ️  package.json not found; skipping npm install/build steps."
fi

echo "🔁 Syncing files to Hostinger ($DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_TARGET)…"
SOURCE_DIR="$BUILD_DIR" RUN_REMOTE_COMMANDS=${RUN_REMOTE_COMMANDS:-0} EXCLUDE_NODE_MODULES=${EXCLUDE_NODE_MODULES:-0} HOST=$DEPLOY_HOST USER=$DEPLOY_USER TARGET=$DEPLOY_TARGET PORT=$DEPLOY_PORT SSH_KEY=$SSH_KEY \
  "$SCRIPT_DIR/deploy_hostinger.sh"

echo "✅ Deployment complete."
