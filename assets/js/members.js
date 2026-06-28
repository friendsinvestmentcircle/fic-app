// assets/js/members.js
(function() {
  'use strict';

  var membersCache = [];

  function loadMembers() {
    return new Promise(function(resolve) {
      var cached = window.Cache.get('members');
      if (cached) {
        membersCache = cached;
        renderList();
        resolve(cached);
        return;
      }

      window.showLoading(true);
      window.apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          window.showLoading(false);
          membersCache = result.members || [];
          window.Cache.set('members', membersCache);
          renderList();
          resolve(membersCache);
        })
        .catch(function(error) {
          window.showLoading(false);
          console.error('Members load error:', error);
          if (cached) {
            membersCache = cached;
            renderList();
            window.showToast('Using cached data');
            resolve(cached);
          } else {
            showError('Failed to load members');
            resolve([]);
          }
        });
    });
  }

  function showError(message) {
    var container = document.getElementById('mList');
    if (!container) return;
    container.innerHTML = 
      '<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">' +
        '<p style="font-size:24px;margin-bottom:12px;">⚠️</p>' +
        '<p>' + message + '</p>' +
        '<button onclick="location.reload()" class="chip" style="margin-top:12px;">' + window.t('retry') + '</button>' +
      '</div>';
  }

  function renderList() {
    var container = document.getElementById('mList');
    if (!container) return;

    var q = document.getElementById('srch') ? document.getElementById('srch').value.trim() : '';
    var filter = document.querySelector('.stChip.on') ? document.querySelector('.stChip.on').getAttribute('data-s') : 'all';

    var filtered = membersCache.filter(function(m) {
      var name = localStorage.getItem('fic_lang') === 'en' ? m['Full Name (EN)'] || '' : m['Full Name (BN)'] || '';
      var code = m['Associate Code'] || '';
      var mobile = m['Mobile'] || '';
      var nameBn = m['Full Name (BN)'] || '';
      var match = !q || 
        name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        code.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        mobile.indexOf(q) > -1 ||
        nameBn.indexOf(q) > -1;
      
      // Status filter (simplified - paid status would come from savings)
      var statusOk = filter === 'all' || filter === 'paid' || filter === 'due';
      return match && statusOk;
    });

    var rCnt = document.getElementById('rCnt');
    if (rCnt) {
      rCnt.textContent = window.t('showing') + ' ' + filtered.length + ' ' + window.t('of') + ' ' + membersCache.length;
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:30px 20px;color:var(--text-muted);font-size:13px;">' + window.t('noMembers') + '</div>';
      return;
    }

    filtered.forEach(function(m) {
      var name = localStorage.getItem('fic_lang') === 'en' ? m['Full Name (EN)'] || '' : m['Full Name (BN)'] || '';
      var code = m['Associate Code'] || '';
      var mobile = m['Mobile'] || '';
      var addr = m['Local Address'] || m['Village'] || '';
      var status = m['Status'] || 'Active';
      var role = localStorage.getItem('fic_lang') === 'en' ? m['Designation (EN)'] || '' : m['Designation (BN)'] || '';
      
      var pill = status === 'Suspended' ? 
        '<span class="pillDue">Suspended</span>' :
        '<span class="pillPaid">Active</span>';

      var btn = document.createElement('button');
      btn.className = 'mCard';
      btn.setAttribute('data-c', code);
      btn.innerHTML =
        '<div style="display:flex;gap:10px;align-items:flex-start;">' +
          '<div class="avatar bn">' + window.initials(name) + '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
              '<p class="bn" style="margin:0;font-size:13px;font-weight:600;color:var(--text);">' +
                (name || code) +
              '</p>' + pill +
            '</div>' +
            '<p style="margin:1px 0 2px;font-size:10px;color:var(--text-muted);">' + code + (addr ? ' · ' + addr : '') + (role ? ' · ' + role : '') + '</p>' +
            '<p style="margin:0;font-size:11px;color:var(--primary);">' + mobile + '</p>' +
          '</div>' +
        '</div>';
      btn.addEventListener('click', function() { openMemberSheet(code); });
      container.appendChild(btn);
    });

    window.applyLang();
  }

  function openMemberSheet(code) {
    // Find member in cache
    var member = membersCache.filter(function(m) { return m['Associate Code'] === code; })[0];
    if (!member) {
      window.showToast('Member not found');
      return;
    }

    var name = localStorage.getItem('fic_lang') === 'en' ? member['Full Name (EN)'] || '' : member['Full Name (BN)'] || '';
    var mobile = member['Mobile'] || '';
    var addr = member['Local Address'] || member['Village'] || '';
    var status = member['Status'] || 'Active';
    var joinDate = member['Join Date'] || '';
    var role = localStorage.getItem('fic_lang') === 'en' ? member['Designation (EN)'] || '' : member['Designation (BN)'] || '';

    // Load savings data
    window.apiRequest('getMemberSavings', 'GET', { code: code })
      .then(function(data) {
        var totalSavings = data.totalSavings || 0;
        var totalLoan = data.totalLoan || 0;
        var history = data.history || [];

        var phoneClean = mobile.replace(/[^0-9]/g, '').replace(/^0/, '');
        var waHref = 'https://wa.me/880' + phoneClean;

        document.getElementById('shBody').innerHTML =
          '<div style="display:flex;justify-content:flex-end;">' +
            '<button id="cBtn" style="background:var(--hover);border:none;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);cursor:pointer;font-size:16px;transition:all var(--transition);">✕</button>' +
          '</div>' +
          '<div style="text-align:center;margin-bottom:12px;">' +
            '<div class="avatar bn" style="width:54px;height:54px;font-size:17px;font-weight:800;margin:0 auto 8px;">' + window.initials(name) + '</div>' +
            '<p class="bn" style="margin:0;font-size:16px;font-weight:700;color:var(--text);">' + (name || code) + '</p>' +
            '<p style="margin:1px 0 0;font-size:11px;color:var(--text-muted);">' + code + (joinDate ? ' · ' + joinDate : '') + '</p>' +
            '<div style="display:flex;gap:6px;justify-content:center;margin-top:6px;flex-wrap:wrap;">' +
              '<span style="font-size:11px;padding:3px 8px;border-radius:999px;background:var(--hover);color:var(--text-secondary);font-weight:500;" class="bn">' + role + '</span>' +
              (totalLoan > 0 ? '<span style="font-size:11px;padding:3px 8px;border-radius:999px;background:rgba(191,135,0,.12);color:var(--warning);font-weight:600;">' + window.t('loanBadge') + ': ' + window.formatCurrency(totalLoan) + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0;">' +
            '<a class="iconBtn" href="tel:' + mobile + '"><i class="ph-thin ph-phone"></i> ' + window.t('call') + '</a>' +
            '<a class="iconBtn" href="' + waHref + '"><i class="ph-thin ph-whatsapp-logo"></i> ' + window.t('whatsapp') + '</a>' +
            '<button class="iconBtn"><i class="ph-thin ph-envelope"></i> ' + window.t('email') + '</button>' +
            '<button class="iconBtn"><i class="ph-thin ph-map-pin"></i> ' + window.t('maps') + '</button>' +
          '</div>' +
          '<div class="card" style="margin-bottom:10px;">' +
            mkDetailRow(window.t('addrLabel'), addr, true) +
            mkDetailRow(window.t('mobileLabel'), '<span style="color:var(--primary);">' + mobile + '</span>', false) +
            mkDetailRow(window.t('joinedLabel'), joinDate, true) +
          '</div>' +
          '<div class="card">' +
            '<p style="margin:0;font-size:11px;color:var(--text-muted);">' + window.t('totalSavingsLabel') + '</p>' +
            '<p style="margin:2px 0 8px;font-size:23px;font-weight:800;color:var(--text);">' + window.formatCurrency(totalSavings) + '</p>' +
            (history.length > 0 ? 
              '<div style="max-height:120px;overflow-y:auto;border-top:1px solid var(--border);padding-top:8px;">' +
                history.slice(-5).reverse().map(function(h) {
                  return '<div style="display:flex;justify-content:space-between;font-size:11px;padding:3px 0;border-bottom:1px solid var(--border);">' +
                    '<span style="color:var(--text-muted);">' + (h.month || '') + ' ' + (h.year || '') + '</span>' +
                    '<span style="font-weight:600;">' + window.formatCurrency(h.amount) + '</span>' +
                  '</div>';
                }).join('') +
              '</div>' :
              ''
            ) +
          '</div>' +
          '<button id="histBtn" style="width:100%;margin-top:10px;background:none;border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;font-size:12px;color:var(--primary);font-weight:500;font-family:inherit;cursor:pointer;transition:all var(--transition);">' + window.t('fullHistory') + '</button>';

        document.getElementById('shOv').style.opacity = '1';
        document.getElementById('shOv').style.pointerEvents = 'auto';
        document.getElementById('shDrw').style.transform = 'translateY(0)';
        document.getElementById('cBtn').onclick = window.closeSheet;

        window.applyLang();
      })
      .catch(function(error) {
        console.error('Savings load error:', error);
        window.showToast('Failed to load savings data');
      });
  }

  function mkDetailRow(label, val, isLast) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;' + (isLast ? '' : 'border-bottom:1px solid var(--border);') + 'font-size:12px;">' +
      '<span style="color:var(--text-muted);">' + label + '</span>' +
      '<span class="bn" style="color:var(--text);">' + val + '</span>' +
    '</div>';
  }

  // Search and filter listeners
  function attachSearchListeners() {
    var searchInput = document.getElementById('srch');
    if (searchInput) {
      searchInput.removeEventListener('input', renderList);
      searchInput.addEventListener('input', renderList);
    }

    document.querySelectorAll('.stChip').forEach(function(chip) {
      chip.removeEventListener('click', function() {});
      chip.addEventListener('click', function() {
        document.querySelectorAll('.stChip').forEach(function(c) { c.classList.toggle('on', c === chip); });
        renderList();
      });
    });
  }

  // Expose init function
  window.initMembers = function() {
    loadMembers().then(function() {
      attachSearchListeners();
    });
  };

})();
