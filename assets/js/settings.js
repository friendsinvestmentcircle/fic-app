// assets/js/settings.js
(function() {
  'use strict';

  function renderSettings() {
    var container = document.getElementById('scSettings');
    if (!container) return;

    var lang = localStorage.getItem('fic_lang') || 'en';
    var theme = localStorage.getItem('fic_theme') || 'light';

    container.innerHTML =
      '<div class="page-enter">' +
        '<div class="aboutCard">' +
          '<div class="aboutLogo">F</div>' +
          '<div>' +
            '<p class="title">FIC Staff Portal</p>' +
            '<p class="sub">v2.0 · Modular Edition</p>' +
          '</div>' +
        '</div>' +
        '<div class="settingSection">' +
          '<p class="sectionHead">' + window.t('displaySection') + '</p>' +
          '<div class="settingRow" style="border-top:none;flex-direction:column;align-items:flex-start;padding-bottom:0;">' +
            '<p class="sLabel">' + window.t('languageLabel') + '</p>' +
          '</div>' +
          '<div class="langGroup">' +
            '<button class="langBtn' + (lang === 'bn' ? ' on' : '') + '" data-lang="bn">' +
              '<i class="ph-thin ph-translate"></i>' +
              '<span class="bn" style="font-size:12px;">' + window.t('langBn') + '</span>' +
            '</button>' +
            '<button class="langBtn' + (lang === 'en' ? ' on' : '') + '" data-lang="en">' +
              '<i class="ph-thin ph-translate"></i>' +
              '<span style="font-size:12px;">' + window.t('langEn') + '</span>' +
            '</button>' +
          '</div>' +
          '<div class="settingRow" style="flex-direction:column;align-items:flex-start;padding-bottom:0;">' +
            '<p class="sLabel">' + window.t('themeLabel') + '</p>' +
          '</div>' +
          '<div class="themeGroup">' +
            '<button class="themeBtn' + (theme === 'dark' ? ' on' : '') + '" data-th="dark">' +
              '<i class="ph-thin ph-moon"></i>' +
              '<span>' + window.t('themeDark') + '</span>' +
            '</button>' +
            '<button class="themeBtn' + (theme === 'light' ? ' on' : '') + '" data-th="light">' +
              '<i class="ph-thin ph-sun"></i>' +
              '<span>' + window.t('themeLight') + '</span>' +
            '</button>' +
            '<button class="themeBtn' + (theme === 'system' ? ' on' : '') + '" data-th="system">' +
              '<i class="ph-thin ph-desktop"></i>' +
              '<span>' + window.t('themeSystem') + '</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="settingSection">' +
          '<p class="sectionHead">' + window.t('aboutSection') + '</p>' +
          '<div class="settingRow" style="border-top:none;">' +
            '<p class="sLabel">' + window.t('versionLabel') + '</p>' +
            '<p class="sSub">2.0.0</p>' +
          '</div>' +
          '<div class="settingRow">' +
            '<p class="sLabel">' + window.t('membersLabel') + '</p>' +
            '<p class="sSub" style="font-weight:600;color:var(--primary);" id="memberCount">Loading...</p>' +
          '</div>' +
          '<div class="settingRow">' +
            '<p class="sLabel">' + window.t('periodLabel') + '</p>' +
            '<p class="sSub bn">' + window.t('juneLabel') + '</p>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--hover);border-radius:var(--radius-sm);">' +
          '<p style="font-size:10px;color:var(--text-muted);text-align:center;">' +
            'Cache: <span id="cacheStatus">Checking...</span> &nbsp;·&nbsp; ' +
            '<button id="clearCacheBtn" class="chip" style="font-size:9px;padding:2px 8px;">Clear Cache</button>' +
          '</p>' +
        '</div>' +
      '</div>';

    // Language buttons
    container.querySelectorAll('[data-lang]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = btn.getAttribute('data-lang');
        localStorage.setItem('fic_lang', lang);
        container.querySelectorAll('[data-lang]').forEach(function(b) { b.classList.toggle('on', b === btn); });
        window.applyLang();
        renderSettings(); // Re-render to update labels
      });
    });

    // Theme buttons
    container.querySelectorAll('[data-th]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var theme = btn.getAttribute('data-th');
        window.setTheme(theme);
        container.querySelectorAll('[data-th]').forEach(function(b) {
          b.classList.toggle('on', b.getAttribute('data-th') === theme);
        });
      });
    });

// In settings.js – this should already be there
var clearBtn = document.getElementById('clearCacheBtn');
if (clearBtn) {
  clearBtn.addEventListener('click', function() {
    // Clear localStorage cache
    window.Cache.clear();
    
    // Clear service worker caches
    if ('caches' in window) {
      caches.keys().then(function(names) {
        names.forEach(function(name) {
          caches.delete(name);
        });
      });
    }
    
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        registrations.forEach(function(reg) {
          reg.unregister();
        });
      });
    }
    
    window.showToast('Cache cleared – refresh the page');
  });
}

    // Update member count
    updateMemberCount();
    updateCacheStatus();
    window.applyLang();
  }

  function updateMemberCount() {
    var cached = window.Cache.get('members');
    if (cached) {
      var el = document.getElementById('memberCount');
      if (el) el.textContent = cached.length;
      return;
    }

    window.apiRequest('getPublicMembers', 'GET')
      .then(function(result) {
        var members = result.members || [];
        window.Cache.set('members', members);
        var el = document.getElementById('memberCount');
        if (el) el.textContent = members.length;
      })
      .catch(function() {
        var el = document.getElementById('memberCount');
        if (el) el.textContent = '? (offline)';
      });
  }

  function updateCacheStatus() {
    var el = document.getElementById('cacheStatus');
    if (!el) return;

    var hasMembers = !!window.Cache.get('members');
    var hasDashboard = !!window.Cache.get('dashboard');

    if (hasMembers || hasDashboard) {
      var status = [];
      if (hasMembers) status.push('Members ✓');
      if (hasDashboard) status.push('Dashboard ✓');
      el.textContent = status.join(' · ');
    } else {
      el.textContent = 'No cached data';
    }
  }

  window.initSettings = function() {
    renderSettings();
  };

})();
