// assets/js/entry-expense.js
(function() {
  'use strict';

  var membersCache = [];

  function buildExpense() {
    var members = membersCache || [];
    var options = members.map(function(m) {
      var name = localStorage.getItem('fic_lang') === 'en' ? m['Full Name (EN)'] || '' : m['Full Name (BN)'] || '';
      var code = m['Associate Code'] || '';
      return '<option value="' + code + '">' + (name || code) + '</option>';
    }).join('');

    return '<div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:12px;">' +
        '<button class="segBtn' + (window._expTab === 'exp' ? ' on' : '') + '" data-exptab="exp" style="font-size:11px;">' + window.t('expTab') + '</button>' +
        '<button class="segBtn' + (window._expTab === 'bank' ? ' on' : '') + '" data-exptab="bank" style="font-size:11px;">' + window.t('bankTab') + '</button>' +
        '<button class="segBtn' + (window._expTab === 'loan' ? ' on' : '') + '" data-exptab="loan" style="font-size:11px;">' + window.t('loanTab') + '</button>' +
      '</div>' +
      '<div id="pExp" style="' + (window._expTab === 'exp' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('subjectLabel') + '</label><select id="expCategory">' + window.t('expCats').map(function(c) { return '<option>' + c + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('amtLabel') + '</label><input id="expAmount" type="number" placeholder="200" style="text-align:right;"></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('methodLabel') + '</label><select id="expMethod">' + window.t('methods').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + window.t('descLabel') + '</label><input id="expDesc" type="text" placeholder="' + window.t('descPh') + '"></div>' +
        '<button id="expSave" class="btn-primary">' + window.t('saveBtn') + '</button>' +
      '</div>' +
      '<div id="pBank" style="' + (window._expTab === 'bank' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('typeLabel') + '</label><select id="bankType">' + window.t('bankTypes').map(function(b) { return '<option>' + b + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('amtLabel') + '</label><input id="bankAmount" type="number" placeholder="10000" style="text-align:right;"></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('methodLabel') + '</label><select id="bankMethod">' + window.t('methods').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + window.t('descLabel') + '</label><input id="bankDesc" type="text" placeholder="' + window.t('descPh') + '"></div>' +
        '<button id="bankSave" class="btn-primary">' + window.t('saveBtn') + '</button>' +
      '</div>' +
      '<div id="pLoan" style="' + (window._expTab === 'loan' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('colMember') + '</label><select id="loanMember"><option value="">' + window.t('selectMember') + '</option>' + options + '</select></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('typeLabel') + '</label><select id="loanType">' + window.t('loanTypes').map(function(l) { return '<option>' + l + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('amtLabel') + '</label><input id="loanAmount" type="number" placeholder="1500" style="text-align:right;"></div>' +
        '<div style="margin-bottom:10px;"><label class="fl">' + window.t('methodLabel') + '</label><select id="loanMethod">' + window.t('methods').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + window.t('descLabel') + '</label><input id="loanDesc" type="text" placeholder="' + window.t('commentPh') + '"></div>' +
        '<button id="loanSave" class="btn-primary">' + window.t('saveBtn') + '</button>' +
      '</div>';
  }

  function wireExpense() {
    var wrapper = document.getElementById('pExpense');
    if (!wrapper) return;

    wrapper.querySelectorAll('[data-exptab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        window._expTab = btn.getAttribute('data-exptab');
        wrapper.querySelectorAll('[data-exptab]').forEach(function(b) { b.classList.toggle('on', b === btn); });
        wrapper.querySelector('#pExp').style.display = window._expTab === 'exp' ? 'block' : 'none';
        wrapper.querySelector('#pBank').style.display = window._expTab === 'bank' ? 'block' : 'none';
        wrapper.querySelector('#pLoan').style.display = window._expTab === 'loan' ? 'block' : 'none';
      });
    });

    // Expense save
    var expSave = document.getElementById('expSave');
    if (expSave) {
      expSave.addEventListener('click', function() {
        var category = document.getElementById('expCategory') ? document.getElementById('expCategory').value : '';
        var amount = parseInt(document.getElementById('expAmount') ? document.getElementById('expAmount').value : 0);
        var method = document.getElementById('expMethod') ? document.getElementById('expMethod').value : 'Cash';
        var desc = document.getElementById('expDesc') ? document.getElementById('expDesc').value : '';

        if (!amount || amount <= 0) {
          window.showToast(window.t('noAmt'));
          return;
        }

        var entry = {
          transactionType: 'Expense',
          category: category,
          amount: amount,
          method: method,
          handledBy: window.t('rcv1'),
          month: window.getCurrentMonth(),
          year: window.getCurrentYear(),
          date: new Date().toISOString().split('T')[0],
          notes: desc
        };

        submitTransaction(entry);
      });
    }

    // Bank save
    var bankSave = document.getElementById('bankSave');
    if (bankSave) {
      bankSave.addEventListener('click', function() {
        var type = document.getElementById('bankType') ? document.getElementById('bankType').value : '';
        var amount = parseInt(document.getElementById('bankAmount') ? document.getElementById('bankAmount').value : 0);
        var method = document.getElementById('bankMethod') ? document.getElementById('bankMethod').value : 'Bank';
        var desc = document.getElementById('bankDesc') ? document.getElementById('bankDesc').value : '';

        if (!amount || amount <= 0) {
          window.showToast(window.t('noAmt'));
          return;
        }

        var entry = {
          transactionType: type,
          category: 'Bank',
          amount: amount,
          method: method,
          handledBy: window.t('rcv1'),
          month: window.getCurrentMonth(),
          year: window.getCurrentYear(),
          date: new Date().toISOString().split('T')[0],
          notes: desc
        };

        submitTransaction(entry);
      });
    }

    // Loan save
    var loanSave = document.getElementById('loanSave');
    if (loanSave) {
      loanSave.addEventListener('click', function() {
        var code = document.getElementById('loanMember') ? document.getElementById('loanMember').value : '';
        var type = document.getElementById('loanType') ? document.getElementById('loanType').value : '';
        var amount = parseInt(document.getElementById('loanAmount') ? document.getElementById('loanAmount').value : 0);
        var method = document.getElementById('loanMethod') ? document.getElementById('loanMethod').value : 'Cash';
        var desc = document.getElementById('loanDesc') ? document.getElementById('loanDesc').value : '';

        if (!code) {
          window.showToast(window.t('selectMember'));
          return;
        }
        if (!amount || amount <= 0) {
          window.showToast(window.t('noAmt'));
          return;
        }

        var entry = {
          transactionType: type,
          associateCode: code,
          amount: amount,
          method: method,
          handledBy: window.t('rcv1'),
          month: window.getCurrentMonth(),
          year: window.getCurrentYear(),
          date: new Date().toISOString().split('T')[0],
          notes: desc
        };

        submitTransaction(entry);
      });
    }
  }

  function submitTransaction(entry) {
    window.showLoading(true);
    window.apiRequest('addTransaction', 'POST', { transaction: entry })
      .then(function(result) {
        window.showLoading(false);
        if (result.success) {
          window.showToast(window.t('saved'));
          window.Cache.clear('dashboard');
          // Reset forms
          document.querySelectorAll('#pExp input, #pBank input, #pLoan input').forEach(function(inp) {
            inp.value = '';
          });
        } else {
          window.showToast(window.t('submitError') + ': ' + (result.error || ''));
        }
      })
      .catch(function(error) {
        window.showLoading(false);
        window.showToast(window.t('submitError'));
        console.error('Transaction submit error:', error);
      });
  }

  window.initExpense = function() {
    window._expTab = window._expTab || 'exp';
    var cached = window.Cache.get('members');
    if (cached) {
      membersCache = cached;
      var container = document.getElementById('pExpense');
      if (container) {
        container.innerHTML = buildExpense();
        wireExpense();
        window.applyLang();
      }
    } else {
      window.apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          membersCache = result.members || [];
          window.Cache.set('members', membersCache);
          var container = document.getElementById('pExpense');
          if (container) {
            container.innerHTML = buildExpense();
            wireExpense();
            window.applyLang();
          }
        })
        .catch(function(error) {
          console.error('Failed to load members for expense:', error);
          window.showToast('Failed to load members');
        });
    }
  };

})();
