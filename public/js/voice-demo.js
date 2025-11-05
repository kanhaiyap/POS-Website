// Lightweight Voice Demo for Bhojan Mitra
// Uses Web Speech API (SpeechRecognition) to capture spoken orders,
// parse basic quantities and item names, and show a simulated order.

(function() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusEl = document.getElementById('status');
  const transcriptEl = document.getElementById('transcriptText');
  const parsedEl = document.getElementById('parsed');
  const placeOrderBtn = document.getElementById('placeOrder');
  const orderResult = document.getElementById('orderResult');

  // Basic menu (extend as needed)
  const menu = [
    'masala dosa',
    'dosa',
    'idli',
    'vada',
    'chai',
    'coffee',
    'pizza',
    'burger'
  ];

  const numberMap = {
    'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10
  };

  function textToNumber(token) {
    token = token.toLowerCase();
    if (numberMap[token] !== undefined) return numberMap[token];
    const n = parseInt(token, 10);
    return isNaN(n) ? null : n;
  }

  function parseOrder(text) {
    const orders = [];
    const lower = text.toLowerCase();

    // split on 'and' or commas
    const parts = lower.split(/,| and | & /);
    parts.forEach(part => {
      part = part.trim();
      if (!part) return;

      // find quantity (word or digit) and item
      const qtyMatch = part.match(/^(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
      let qty = 1;
      if (qtyMatch) qty = textToNumber(qtyMatch[1]) || 1;

      // find best matching menu item
      let found = null;
      for (const item of menu) {
        if (part.includes(item)) { found = item; break; }
      }
      // fallback: try last word
      if (!found) {
        const tokens = part.split(' ');
        const last = tokens.slice(-2).join(' ');
        // try last two words or last word
        if (menu.includes(last)) found = last;
        else if (menu.includes(tokens.slice(-1)[0])) found = tokens.slice(-1)[0];
      }

      if (found) orders.push({ item: found, qty });
    });

    return orders;
  }

  // Feature-detect
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    statusEl.textContent = 'Status: Web Speech API not supported in this browser.';
    startBtn.disabled = true;
    stopBtn.disabled = true;
    placeOrderBtn.disabled = true;
    transcriptEl.textContent = 'Please use Chrome or Edge on desktop or Android for the demo.';
    return;
  }

  const recog = new SpeechRecognition();
  recog.lang = 'en-IN';
  recog.interimResults = true;
  recog.maxAlternatives = 1;

  let interim = '';
  let finalTranscript = '';

  recog.onstart = () => {
    statusEl.textContent = 'Status: listening...';
  };

  recog.onresult = (ev) => {
    interim = '';
    finalTranscript = '';
    for (let i = 0; i < ev.results.length; ++i) {
      const res = ev.results[i];
      if (res.isFinal) finalTranscript += res[0].transcript + ' ';
      else interim += res[0].transcript;
    }
    transcriptEl.textContent = (finalTranscript + ' ' + interim).trim();

    const parsed = parseOrder(finalTranscript + ' ' + interim);
    renderParsed(parsed);
  };

  recog.onerror = (e) => {
    statusEl.textContent = 'Status: error - ' + e.error;
  };

  recog.onend = () => {
    statusEl.textContent = 'Status: idle';
  };

  startBtn.addEventListener('click', () => {
    try { recog.start(); } catch (e) { /* ignore start errors if already started */ }
    statusEl.textContent = 'Status: listening...';
  });

  stopBtn.addEventListener('click', () => { recog.stop(); statusEl.textContent = 'Status: stopped'; });

  function renderParsed(parsed) {
    parsedEl.innerHTML = '';
    if (!parsed.length) parsedEl.innerHTML = '<div>No items detected yet</div>';
    parsed.forEach(x => {
      const div = document.createElement('div');
      div.className = 'order-item';
      div.textContent = `${x.qty} × ${x.item}`;
      parsedEl.appendChild(div);
    });
  }

  placeOrderBtn.addEventListener('click', () => {
    const text = transcriptEl.textContent || '';
    const parsed = parseOrder(text);
    if (!parsed.length) { orderResult.textContent = 'No items to place.'; orderResult.style.color = 'red'; return; }
    orderResult.textContent = 'Order placed (simulated): ' + parsed.map(p => `${p.qty}×${p.item}`).join(', ');
    orderResult.style.color = 'green';
  });

})();
