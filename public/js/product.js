// product.js — small interactions for pos-software page
document.addEventListener('DOMContentLoaded', function () {
  // Demo parsing (very small heuristic parser for demo purposes)
  const demoRun = document.getElementById('demo-run');
  const demoInput = document.getElementById('demo-input');
  const demoOutput = document.getElementById('demo-output');

  if (demoRun) {
    demoRun.addEventListener('click', () => {
      const text = (demoInput.value || '').toLowerCase();
      if (!text.trim()) {
        demoOutput.textContent = 'Please enter a sample utterance to parse.';
        return;
      }
      // Very naive parsing: look for numbers and known items
      const items = [];
      const menu = ['butter chicken','garlic naan','margherita pizza','coke','fries','burger'];
      menu.forEach(item => {
        if (text.includes(item)) {
          // find quantity before item
          const rx = new RegExp('(\\d+)\\s+' + item.replace(/ /g,'\\s+'));
          const m = text.match(rx);
          const qty = m ? parseInt(m[1],10) : 1;
          items.push({ item, qty });
        }
      });
      const upsells = items.map(i => ({ item: i.item, suggestion: 'Add a side (fries) or a drink (coke)' }));
      const out = {
        raw: text,
        parsedItems: items.length ? items : [{ item: 'No known menu items detected', qty: 0 }],
        upsells
      };
      demoOutput.textContent = JSON.stringify(out, null, 2);
    });
  }

  // Accordion logic
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
      // close all
      document.querySelectorAll('.accordion-panel').forEach(p => { p.style.maxHeight = null; });
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Allow pressing Enter in demo-input to run
  if (demoInput) {
    demoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        demoRun && demoRun.click();
      }
    });
  }

  // Lead capture analytics hook
  const leadForm = document.getElementById('lead-form');
  const leadMessage = document.getElementById('lead-message');
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      leadMessage.textContent = '';
      const email = (document.getElementById('lead-email').value || '').trim();
      const name = (document.getElementById('lead-name').value || '').trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) { leadMessage.style.color = '#d9534f'; leadMessage.textContent = 'Please enter a valid email.'; return; }

      try {
        // send to /api/lead
        const resp = await fetch('/api/lead', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, message: 'Product page demo interest' })
        });
        const json = await resp.json();
        if (resp.ok && json.success) {
          leadMessage.style.color = 'var(--accent-2)';
          leadMessage.textContent = json.message || 'Thanks — we will contact you soon.';
          // analytics: simple local counter
          try { const n = parseInt(localStorage.getItem('demoInterest')||'0',10)+1; localStorage.setItem('demoInterest', String(n)); } catch(e) {}
          // clear form
          leadForm.reset();
        } else {
          leadMessage.style.color = '#d9534f';
          leadMessage.textContent = (json && json.errors && json.errors.join(', ')) || 'Failed to submit. Try again later.';
        }
      } catch (err) {
        leadMessage.style.color = '#d9534f';
        leadMessage.textContent = 'Network error — please try again.';
      }
    });
  }

});
