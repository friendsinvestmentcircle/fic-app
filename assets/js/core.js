// assets/js/core.js
(function() {
  'use strict';

  // ─── API Config ──────────────────────────
  window.API = {
    BASE_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    SECRET_KEY: 'FIC2025$ecretKey'
  };

  // ─── Cache ──────────────────────────────
  window.Cache = {
    get: function(key) {
      try {
        var raw = localStorage.getItem('fic_' + key);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (Date.now() - data.timestamp > 30 * 60 * 1000) return null;
        return data.value;
      } catch(e) { return null; }
    },
    set: function(key, value) {
      try {
        localStorage.setItem('fic_' + key, JSON.stringify({
          value: value,
          timestamp: Date.now()
        }));
      } catch(e) {}
    }
  };

  // ─── API Call ────────────────────────────
  window.apiRequest = function(action, method, params) {
    return new Promise(function(resolve, reject) {
      var url = API.BASE_URL + '?action=' + action + '&key=' + API.SECRET_KEY;
      if (method === 'GET' && params) {
        Object.keys(params).forEach(function(k) {
          url += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        });
      }
      var options = { method: method, mode: 'no-cors' };
      if (method === 'POST') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ action: action, key: API.SECRET_KEY, ...params });
      }
      fetch(url, options)
        .then(function(r) { return r.json(); })
        .then(resolve)
        .catch(reject);
    });
  };

  // ─── Translations ────────────────────────
  window.TR = { /* ... full TR object from earlier ... */ };
  window.t = function(key) {
    var lang = localStorage.getItem('fic_lang') || 'en';
    return (TR[lang] && TR[lang][key]) || (TR.en && TR.en[key]) || key;
  };

  // ─── Toast ──────────────────────────────
  window.showToast = function(msg) {
    var el = document.getElementById('ficToast');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function() { el.style.opacity = '0'; }, 3000);
  };

  // ─── Loading Overlay ────────────────────
  window.showLoading = function(show) {
    var el = document.getElementById('loadingOverlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'loadingOverlay';
      el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);display:none;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(2px);';
      el.innerHTML = '<div style="background:var(--surface);padding:20px;border-radius:var(--radius);display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:var(--shadow-lg);"><div style="width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;"></div><p style="font-size:13px;color:var(--text-secondary);">' + t('loading') + '</p></div>';
      document.body.appendChild(el);
      var style = document.createElement('style');
      style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(style);
    }
    el.style.display = show ? 'flex' : 'none';
  };

  // ─── Utilities ──────────────────────────
  window.formatCurrency = function(amount) {
    return '৳' + parseInt(amount || 0).toLocaleString('en-IN');
  };
  window.getCurrentMonth = function() {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][new Date().getMonth()];
  };
  window.getCurrentYear = function() {
    return new Date().getFullYear().toString();
  };
})();
