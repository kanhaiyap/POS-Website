#!/usr/bin/env bash
# Local deploy helper: rsync + remote install/restart for Hostinger
# Usage:
#   HOST=host.example.com USER=username PORT=22 TARGET=/path/on/server ./scripts/deploy_hostinger.sh
# Optional environment variables:
#   SOURCE_DIR           # Local directory to sync (defaults to current directory)
#   RUN_REMOTE_COMMANDS  # Set to 1 to run npm install / pm2 restart on the server
#   EXCLUDE_NODE_MODULES # Set to 1 to skip uploading node_modules (default uploads them)
# Or set the variables in your environment. If you need to authenticate with a key other than your default ssh agent,
# set SSH_KEY and the script will use it via ssh-agent.

set -euo pipefail

HOST=${HOST:-}
USER=${USER:-}
PORT=${PORT:-22}
TARGET=${TARGET:-}
SOURCE_DIR=${SOURCE_DIR:-.}
RUN_REMOTE_COMMANDS=${RUN_REMOTE_COMMANDS:-0}
EXCLUDE_NODE_MODULES=${EXCLUDE_NODE_MODULES:-0}
SSH_KEY=${SSH_KEY:-}

if [ -z "$HOST" ] || [ -z "$USER" ] || [ -z "$TARGET" ]; then
  echo "Missing required env vars. Example usage:"
  echo "  HOST=host.example.com USER=username PORT=22 TARGET=/path/on/server ./scripts/deploy_hostinger.sh"
  exit 2
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory '$SOURCE_DIR' does not exist"
  exit 3
fi

if [ -n "$SSH_KEY" ]; then
  # start an ephemeral agent for the provided key
  eval "$(ssh-agent -s)"
  ssh-add "$SSH_KEY"
fi

RSYNC_EXCLUDES=(--exclude='.git' --exclude='.github')
if [ "$EXCLUDE_NODE_MODULES" != "0" ]; then
  RSYNC_EXCLUDES+=(--exclude='node_modules')
fi

echo "Syncing files from $SOURCE_DIR to $USER@$HOST:$TARGET"
rsync -avz --delete "${RSYNC_EXCLUDES[@]}" "$SOURCE_DIR"/ "$USER@$HOST:$TARGET" -e "ssh -p $PORT"

if [ "$RUN_REMOTE_COMMANDS" != "0" ]; then
  echo "Running remote install and restart commands"
  ssh -p "$PORT" "$USER@$HOST" "mkdir -p '$TARGET' && cd '$TARGET' && if command -v npm >/dev/null 2>&1; then npm ci --production || true; if command -v pm2 >/dev/null 2>&1; then pm2 startOrRestart ecosystem.config.js --update-env || pm2 restart all || true; else nohup npm start >/dev/null 2>&1 & fi; else echo 'npm not found on remote host — skipped install and restart'; fi"
else
  echo "Skipping remote install/restart (set RUN_REMOTE_COMMANDS=1 to enable)."
fi

echo "Done. If you used SSH_KEY, remember to kill the agent: ssh-agent -k"
