// assets/js/entry-single.js
(function() {
  'use strict';

  var membersCache = [];

  function buildSingle() {
    var methods = window.t('methods');
    var options = membersCache.map(function(m) {
      var name = localStorage.getItem('fic_lang') === 'en' ? m['Full Name (EN)'] || '' : m['Full Name (BN)'] || '';
      var code = m['Associate Code'] || '';
      return '<option value="' + code + '">' + (name || code) + ' — ' + code + '</option>';
    }).join('');
    
    return '<div style="margin-bottom:10px;"><label class="fl">' + window.t('colMember') + '</label><select id="sMember"><option value="">' + window.t('selectMember') + '</option>' + options + '</select></div>' +
      '<div style="margin-bottom:10px;"><label class="fl">' + window.t('monthLabel') + '</label><select id="sMonth">' + window.t('months').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
      '<div style="margin-bottom:10px;"><label class="fl">' + window.t('amtLabel') + '</label><input id="sAmt" type="number" placeholder="300" style="text-align:right;"></div>' +
      '<div style="margin-bottom:10px;"><label class="fl">' + window.t('chargeLabel') + '</label><input id="sCharge" type="number" placeholder="0" style="text-align:right;"></div>' +
      '<div style="margin-bottom:10px;"><label class="fl">' + window.t('receiverLabel') + '</label><div style="display:flex;gap:6px;">' +
        '<button class="chip on bySChip" style="font-size:11px;">' + window.t('rcv1') + '</button>' +
        '<button class="chip bySChip" style="font-size:11px;">' + window.t('rcv2') + '</button>' +
      '</div></div>' +
      '<div style="margin-bottom:12px;"><label class="fl">' + window.t('methodLabel') + '</label><div style="display:flex;gap:5px;flex-wrap:wrap;">' +
        methods.map(function(m, i) {
          return '<button class="chip' + (i === 0 ? ' on' : '') + ' mSChip" style="font-size:11px;">' + m + '</button>';
        }).join('') +
      '</div></div>' +
      '<div style="margin-bottom:12px;"><label class="fl">' + window.t('noteLabel') + '</label><input id="sNote" type="text" placeholder="' + window.t('notePlaceholder') + '"></div>' +
      '<button id="sSave" class="btn-primary">' + window.t('saveBtn') + '</button>';
  }

  function wireSingle() {
    function toggleGroup(cls) {
      document.querySelectorAll('.' + cls).forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.' + cls).forEach(function(b) { b.classList.remove('on'); });
          btn.classList.add('on');
        });
      });
    }
    toggleGroup('bySChip');
    toggleGroup('mSChip');

    var saveBtn = document.getElementById('sSave');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() {
        var code = document.getElementById('sMember') ? document.getElementById('sMember').value : '';
        var amount = parseInt(document.getElementById('sAmt') ? document.getElementById('sAmt').value : 0);
        var charge = parseInt(document.getElementById('sCharge') ? document.getElementById('sCharge').value : 0);
        var receiver = document.querySelector('.bySChip.on') ? document.querySelector('.bySChip.on').textContent : window.t('rcv1');
        var method = document.querySelector('.mSChip.on') ? document.querySelector('.mSChip.on').textContent : window.t('methods')[0];
        var month = document.getElementById('sMonth') ? document.getElementById('sMonth').value : window.t('months')[0];
        var note = document.getElementById('sNote') ? document.getElementById('sNote').value : '';

        if (!code) {
          window.showToast(window.t('selectMember'));
          return;
        }
        if (!amount || amount <= 0) {
          window.showToast(window.t('noAmt'));
          return;
        }

        var entry = {
          associateCode: code,
          amount: amount,
          methodCharge: charge,
          collectedBy: receiver,
          paymentMethod: method,
          month: month,
          year: window.getCurrentYear(),
          date: new Date().toISOString().split('T')[0],
          notes: note
        };

        window.showLoading(true);
        window.apiRequest('addSingle', 'POST', { entry: entry })
          .then(function(result) {
            window.showLoading(false);
            if (result.success) {
              window.showToast(window.t('saved'));
              if (document.getElementById('sAmt')) document.getElementById('sAmt').value = '';
              if (document.getElementById('sCharge')) document.getElementById('sCharge').value = '';
              if (document.getElementById('sNote')) document.getElementById('sNote').value = '';
              window.Cache.clear('dashboard');
            } else {
              window.showToast(window.t('submitError') + ': ' + (result.error || ''));
            }
          })
          .catch(function(error) {
            window.showLoading(false);
            window.showToast(window.t('submitError'));
            console.error('Single submit error:', error);
          });
      });
    }
  }

  window.initSingle = function() {
    var cached = window.Cache.get('members');
    if (cached) {
      membersCache = cached;
      var container = document.getElementById('pSingle');
      if (container) {
        container.innerHTML = buildSingle();
        wireSingle();
        window.applyLang();
      }
    } else {
      window.apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          membersCache = result.members || [];
          window.Cache.set('members', membersCache);
          var container = document.getElementById('pSingle');
          if (container) {
            container.innerHTML = buildSingle();
            wireSingle();
            window.applyLang();
          }
        })
        .catch(function(error) {
          console.error('Failed to load members for single entry:', error);
          window.showToast('Failed to load members');
        });
    }
  };

})();
