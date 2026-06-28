// assets/js/entry.js
(function() {
  'use strict';

  var currentTab = localStorage.getItem('fic_entryTab') || 'batch';

  function initEntry() {
    var container = document.getElementById('scEntry');
    if (!container) return;

    container.innerHTML =
      '<div class="page-enter">' +
        '<p style="margin:0 0 12px;font-size:16px;font-weight:700;color:var(--text);">' + window.t('newEntry') + '</p>' +
        '<div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:14px;" id="entryTabBar">' +
          '<button class="segBtn' + (currentTab === 'batch' ? ' on' : '') + '" data-etab="batch">' + window.t('tabBatch') + '</button>' +
          '<button class="segBtn' + (currentTab === 'single' ? ' on' : '') + '" data-etab="single">' + window.t('tabSingle') + '</button>' +
          '<button class="segBtn' + (currentTab === 'expense' ? ' on' : '') + '" data-etab="expense">' + window.t('tabExpense') + '</button>' +
        '</div>' +
        '<div id="pBatch" style="' + (currentTab === 'batch' ? '' : 'display:none;') + '"></div>' +
        '<div id="pSingle" style="' + (currentTab === 'single' ? '' : 'display:none;') + '"></div>' +
        '<div id="pExpense" style="' + (currentTab === 'expense' ? '' : 'display:none;') + '"></div>' +
      '</div>';

    // Tab switching
    container.querySelectorAll('[data-etab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        currentTab = btn.getAttribute('data-etab');
        localStorage.setItem('fic_entryTab', currentTab);
        
        container.querySelectorAll('[data-etab]').forEach(function(b) { 
          b.classList.toggle('on', b === btn); 
        });
        
        container.querySelector('#pBatch').style.display = currentTab === 'batch' ? 'block' : 'none';
        container.querySelector('#pSingle').style.display = currentTab === 'single' ? 'block' : 'none';
        container.querySelector('#pExpense').style.display = currentTab === 'expense' ? 'block' : 'none';
        
        // Initialize the active tab
        if (currentTab === 'batch') window.initBatch();
        else if (currentTab === 'single') window.initSingle();
        else if (currentTab === 'expense') window.initExpense();
      });
    });

    // Initialize the active tab
    if (currentTab === 'batch') window.initBatch();
    else if (currentTab === 'single') window.initSingle();
    else if (currentTab === 'expense') window.initExpense();

    window.applyLang();
  }

  window.initEntry = function() {
    // Load members first, then init
    var cached = window.Cache.get('members');
    if (cached) {
      initEntry();
    } else {
      window.apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          window.Cache.set('members', result.members || []);
          initEntry();
        })
        .catch(function() {
          initEntry(); // Try anyway with empty members
        });
    }
  };

})();
