// assets/js/core.js
(function() {
  'use strict';

  /* ═══════════════════════════════════════
     API CONFIGURATION
     ═══════════════════════════════════════ */
  
  window.API = {
    // ⚠️ REPLACE THIS WITH YOUR DEPLOYED APPS SCRIPT URL
    BASE_URL: 'https://script.google.com/macros/s/AKfycbxaPccoeLz_XA-gCOaC3_OogGWqLTR09-M5Upi5sBy3Lu8DLrZO-aV5P0jcy794FmOc-Q/exec',
    SECRET_KEY: 'FIC2025$ecretKey'
  };

  /* ═══════════════════════════════════════
     CACHE HELPERS
     ═══════════════════════════════════════ */

  window.Cache = {
    get: function(key) {
      try {
        var raw = localStorage.getItem('fic_' + key);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (Date.now() - data.timestamp > 30 * 60 * 1000) return null; // 30 min expiry
        return data.value;
      } catch(e) {
        return null;
      }
    },
    set: function(key, value) {
      try {
        localStorage.setItem('fic_' + key, JSON.stringify({
          value: value,
          timestamp: Date.now()
        }));
      } catch(e) {
        // localStorage full or unavailable
      }
    },
    clear: function(key) {
      if (key) {
        localStorage.removeItem('fic_' + key);
      } else {
        // Clear all FIC cache
        var keys = Object.keys(localStorage);
        keys.forEach(function(k) {
          if (k.indexOf('fic_') === 0) localStorage.removeItem(k);
        });
      }
    }
  };

/* ═══════════════════════════════════════
   API CALL
   ═══════════════════════════════════════ */

window.apiRequest = function(action, method, params) {
  return new Promise(function(resolve, reject) {
    var url = window.API.BASE_URL + '?action=' + action + '&key=' + window.API.SECRET_KEY;
    
    if (params) {
      Object.keys(params).forEach(function(k) {
        url += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      });
    }
    
    // For GET requests, use JSONP (script tag) – works around CORS
    if (method === 'GET' || !method) {
      var script = document.createElement('script');
      var callbackName = 'jsonp_callback_' + Date.now();
      window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        resolve(data);
      };
      script.src = url + '&callback=' + callbackName;
      script.onerror = function() {
        delete window[callbackName];
        document.body.removeChild(script);
        reject(new Error('JSONP request failed'));
      };
      document.body.appendChild(script);
    } else {
      // For POST, use fetch with no-cors (won't read response)
      var options = {
        method: method,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      };
      if (params) {
        options.body = JSON.stringify({
          action: action,
          key: window.API.SECRET_KEY,
          entries: params.entries || null,
          entry: params.entry || null,
          suspension: params.suspension || null,
          transaction: params.transaction || null
        });
      }
      fetch(url, options)
        .then(function() {
          resolve({ success: true, message: 'Submitted (response not readable)' });
        })
        .catch(reject);
    }
  });
};

  /* ═══════════════════════════════════════
     TOAST NOTIFICATION
     ═══════════════════════════════════════ */

  var toastTimer = null;

  window.showToast = function(msg) {
    var el = document.getElementById('ficToast');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      el.style.opacity = '0';
    }, 3000);
  };

  /* ═══════════════════════════════════════
     LOADING OVERLAY
     ═══════════════════════════════════════ */

  window.showLoading = function(show) {
    var el = document.getElementById('loadingOverlay');
    if (!el) {
      el = document.createElement('div');
      el.id = 'loadingOverlay';
      el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);display:none;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(2px);';
      el.innerHTML = '<div style="background:var(--surface);padding:20px 30px;border-radius:var(--radius);display:flex;flex-direction:column;align-items:center;gap:12px;box-shadow:var(--shadow-lg);"><div style="width:36px;height:36px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;"></div><p style="font-size:13px;color:var(--text-secondary);" id="loadingText">Loading...</p></div>';
      document.body.appendChild(el);
      
      // Add spin animation
      var style = document.createElement('style');
      style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(style);
    }
    el.style.display = show ? 'flex' : 'none';
    
    // Update loading text with translation
    var textEl = document.getElementById('loadingText');
    if (textEl && show) {
      textEl.textContent = window.t ? window.t('loading') : 'Loading...';
    }
  };

  /* ═══════════════════════════════════════
     TRANSLATIONS
     ═══════════════════════════════════════ */

  window.TR = {
    bn: {
      appTitle: 'FIC স্টাফ পোর্টাল',
      appSub: 'সদস্য · জুন ২০২৬',
      navHome: 'হোম',
      navMembers: 'সদস্য',
      navEntry: 'এন্ট্রি',
      navSettings: 'সেটিং',
      srch: 'নাম / কোড / নম্বর...',
      filterAll: 'সবাই',
      filterPaid: 'পরিশোধ',
      filterDue: 'বাকি',
      showing: 'দেখাচ্ছে',
      of: '/',
      paidBadge: 'পরিশোধ',
      dueBadge: 'বাকি',
      paidShort: '✓ পরিশোধ',
      dueShort: 'বাকি',
      totalMembers: 'সর্বমোট সদস্য',
      joinedThisMonth: 'এই মাসে যোগদান করেছেন',
      totalMonths: 'সর্বমোট মাস',
      since: 'থেকে',
      totalSavings: 'সর্বমোট সঞ্চয়',
      expected: 'প্রত্যাশিত',
      due: 'বাকি',
      bankBalance: 'ব্যাংক ব্যালেন্স',
      totalDeposits: 'সর্বমোট জমা',
      totalWithdrawals: 'সর্বমোট উত্তোলন',
      totalExpenses: 'সর্বমোট খরচ',
      expenseTransactions: 'খরচ লেনদেন',
      totalLoansGiven: 'সর্বমোট ঋণ বিতরণ',
      loansIssued: 'ঋণ ইস্যু',
      totalLoansCollected: 'সর্বমোট ঋণ সংগ্রহ',
      loanOverdues: 'মেয়াদোত্তীর্ণ ঋণ',
      overdueLoans: 'মেয়াদোত্তীর্ণ ঋণ',
      totalInvested: 'সর্বমোট বিনিয়োগ',
      activeProjects: 'সক্রিয় প্রকল্প',
      investmentProfit: 'বিনিয়োগ মুনাফা',
      netProfit: 'নিট মুনাফা',
      recentEntries: 'সাম্প্রতিক লেনদেন',
      bankDeposit: 'ব্যাংক জমা',
      bankWithdrawal: 'ব্যাংক উত্তোলন',
      loanIssued: 'ঋণ বিতরণ',
      loanRepayment: 'ঋণ পরিশোধ',
      investmentAdded: 'বিনিয়োগ যোগ',
      investmentProfitTxn: 'বিনিয়োগ মুনাফা',
      expense: 'খরচ',
      otherIncome: 'অন্যান্য আয়',
      batchModeTitle: 'ব্যাচ মোড',
      batchModeHint: 'ডিফল্ট সেট করুন → সব সদস্যের জন্য প্রযোজ্য। প্রতিটি সারিতে পরিমাণ, গ্রহণকারী, পদ্ধতি ও চার্জ পরিবর্তন করতে পারেন।',
      defSettings: 'ডিফল্ট সেটিং',
      applyAll: 'সবাইতে প্রয়োগ',
      monthLabel: 'মাস',
      defAmt: 'ডিফল্ট পরিমাণ',
      defCharge: 'ডিফল্ট চার্জ',
      defReceiver: 'ডিফল্ট গ্রহণকারী',
      defMethod: 'ডিফল্ট পদ্ধতি',
      colMember: 'সদস্য',
      colReceiver: 'গ্রহণকারী',
      colMethod: 'পদ্ধতি',
      colCharge: 'চার্জ',
      colAmount: 'পরিমাণ',
      lgDefault: 'ডিফল্ট',
      lgReceiverOv: 'পরিবর্তিত গ্রহণকারী',
      lgMethodOv: 'পরিবর্তিত পদ্ধতি',
      lgChargeOv: 'পরিবর্তিত চার্জ',
      entries: 'এন্ট্রি',
      submitBatch: 'সাবমিট',
      noAmt: 'কোনো পরিমাণ লেখা হয়নি',
      batchSaved: 'টি এন্ট্রি সফলভাবে সেভ হয়েছে ✓',
      selectMember: '— বেছে নিন —',
      amtLabel: 'পরিমাণ (৳)',
      chargeLabel: 'চার্জ (৳)',
      receiverLabel: 'গ্রহণকারী',
      methodLabel: 'পদ্ধতি',
      noteLabel: 'মন্তব্য (ঐচ্ছিক)',
      notePlaceholder: 'বিশেষ নোট...',
      saveBtn: 'সেভ',
      saved: 'সেভ হয়েছে ✓',
      subjectLabel: 'বিষয়',
      descLabel: 'বিবরণ',
      descPh: 'সংক্ষিপ্ত বিবরণ...',
      expTab: 'খরচ',
      bankTab: 'ব্যাংক',
      loanTab: 'ঋণ',
      typeLabel: 'ধরন',
      commentPh: 'মন্তব্য...',
      expCats: ['মুদ্রণ খরচ', 'পরিবহন', 'আপ্যায়ন', 'স্টেশনারি', 'অন্যান্য'],
      bankTypes: ['ব্যাংকে জমা', 'ব্যাংক থেকে উত্তোলন', 'বিনিয়োগ'],
      loanTypes: ['ঋণ বিতরণ', 'ঋণ পরিশোধ'],
      months: ['জুন ২০২৬', 'মে ২০২৬', 'এপ্রিল ২০২৬'],
      methods: ['বিকাশ', 'নগদ', 'রকেট', 'সরাসরি', 'ব্যাংক'],
      rcv1: 'তারেক',
      rcv2: 'রায়হান',
      rcv1Short: 'তা',
      rcv2Short: 'রা',
      settingsTitle: 'সেটিংস',
      displaySection: 'ডিসপ্লে',
      languageLabel: 'ভাষা',
      themeLabel: 'থিম',
      langBn: 'বাংলা',
      langEn: 'English',
      themeDark: 'ডার্ক',
      themeLight: 'লাইট',
      themeSystem: 'সিস্টেম',
      aboutSection: 'অ্যাপ তথ্য',
      versionLabel: 'সংস্করণ',
      membersLabel: 'মোট সদস্য',
      periodLabel: 'সময়কাল',
      appliedAll: 'সব সদস্যে ডিফল্ট প্রযোজ্য করা হয়েছে',
      totalSavingsLabel: 'মোট সঞ্চয়',
      fullHistory: 'পূর্ণ ইতিহাস দেখুন ↗',
      paymentDue: 'জুন ২০২৬ — এখনো পরিশোধ হয়নি',
      addrLabel: 'ঠিকানা',
      mobileLabel: 'মোবাইল',
      joinedLabel: 'যোগদান',
      loanBadge: 'ঋণ',
      juneLabel: 'জুন ২০২৬',
      call: 'কল',
      whatsapp: 'WhatsApp',
      email: 'Email',
      maps: 'Maps',
      loading: 'লোড হচ্ছে...',
      retry: 'পুনরায় চেষ্টা করুন',
      noMembers: 'কোনো সদস্য পাওয়া যায়নি',
      submitSuccess: 'সফলভাবে জমা দেওয়া হয়েছে',
      submitError: 'জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।'
    },
    en: {
      appTitle: 'FIC Staff Portal',
      appSub: 'Members · June 2026',
      navHome: 'Home',
      navMembers: 'Members',
      navEntry: 'Entry',
      navSettings: 'Settings',
      srch: 'Name / Code / Phone...',
      filterAll: 'All',
      filterPaid: 'Paid',
      filterDue: 'Due',
      showing: 'Showing',
      of: '/',
      paidBadge: 'paid',
      dueBadge: 'due',
      paidShort: '✓ paid',
      dueShort: 'due',
      totalMembers: 'Total Members',
      joinedThisMonth: 'joined this month',
      totalMonths: 'Total Months',
      since: 'Since',
      totalSavings: 'Total Savings',
      expected: 'Expected',
      due: 'Due',
      bankBalance: 'Bank Balance',
      totalDeposits: 'Total Deposits',
      totalWithdrawals: 'Total Withdrawals',
      totalExpenses: 'Total Expenses',
      expenseTransactions: 'expense transactions',
      totalLoansGiven: 'Total Loans Given',
      loansIssued: 'loans issued',
      totalLoansCollected: 'Total Loans Collected',
      loanOverdues: 'Loan Overdues',
      overdueLoans: 'overdue loans',
      totalInvested: 'Total Invested',
      activeProjects: 'active projects',
      investmentProfit: 'Investment Profit',
      netProfit: 'Net Profit',
      recentEntries: 'Recent Entries',
      bankDeposit: 'Bank Deposit',
      bankWithdrawal: 'Bank Withdrawal',
      loanIssued: 'Loan Issued',
      loanRepayment: 'Loan Repayment',
      investmentAdded: 'Investment Added',
      investmentProfitTxn: 'Investment Profit',
      expense: 'Expense',
      otherIncome: 'Other Income',
      batchModeTitle: 'Batch Mode',
      batchModeHint: 'Set defaults → applies to all members. Override amount, receiver, method, or charge per row.',
      defSettings: 'Default Settings',
      applyAll: 'Apply to All',
      monthLabel: 'Month',
      defAmt: 'Default Amount',
      defCharge: 'Default Charge',
      defReceiver: 'Default Receiver',
      defMethod: 'Default Method',
      colMember: 'Member',
      colReceiver: 'Receiver',
      colMethod: 'Method',
      colCharge: 'Charge',
      colAmount: 'Amount',
      lgDefault: 'Default',
      lgReceiverOv: 'Changed receiver',
      lgMethodOv: 'Changed method',
      lgChargeOv: 'Changed charge',
      entries: 'entries',
      submitBatch: 'Submit',
      noAmt: 'No amounts entered',
      batchSaved: ' entries saved ✓',
      selectMember: '— Select —',
      amtLabel: 'Amount (৳)',
      chargeLabel: 'Charge (৳)',
      receiverLabel: 'Received by',
      methodLabel: 'Method',
      noteLabel: 'Note (optional)',
      notePlaceholder: 'Special note...',
      saveBtn: 'Save',
      saved: 'Saved ✓',
      subjectLabel: 'Subject',
      descLabel: 'Description',
      descPh: 'Brief description...',
      expTab: 'Expense',
      bankTab: 'Bank',
      loanTab: 'Loan',
      typeLabel: 'Type',
      commentPh: 'Comment...',
      expCats: ['Printing', 'Transport', 'Refreshment', 'Stationery', 'Other'],
      bankTypes: ['Bank Deposit', 'Bank Withdrawal', 'Investment'],
      loanTypes: ['Loan Disbursed', 'Loan Repayment'],
      months: ['June 2026', 'May 2026', 'April 2026'],
      methods: ['bKash', 'Nagad', 'Rocket', 'Direct', 'Bank'],
      rcv1: 'Tarek',
      rcv2: 'Raihan',
      rcv1Short: 'Ta',
      rcv2Short: 'Ra',
      settingsTitle: 'Settings',
      displaySection: 'Display',
      languageLabel: 'Language',
      themeLabel: 'Theme',
      langBn: 'বাংলা',
      langEn: 'English',
      themeDark: 'Dark',
      themeLight: 'Light',
      themeSystem: 'System',
      aboutSection: 'About',
      versionLabel: 'Version',
      membersLabel: 'Total Members',
      periodLabel: 'Period',
      appliedAll: 'Defaults applied to all members',
      totalSavingsLabel: 'Total Savings',
      fullHistory: 'View full history ↗',
      paymentDue: 'June 2026 — Not yet paid',
      addrLabel: 'Address',
      mobileLabel: 'Mobile',
      joinedLabel: 'Joined',
      loanBadge: 'Loan',
      juneLabel: 'June 2026',
      call: 'Call',
      whatsapp: 'WhatsApp',
      email: 'Email',
      maps: 'Maps',
      loading: 'Loading...',
      retry: 'Retry',
      noMembers: 'No members found',
      submitSuccess: 'Submitted successfully',
      submitError: 'Failed to submit. Please try again.'
    }
  };

  /* ═══════════════════════════════════════
     TRANSLATION HELPER
     ═══════════════════════════════════════ */

  window.t = function(key) {
    var lang = localStorage.getItem('fic_lang') || 'en';
    return (window.TR[lang] && window.TR[lang][key]) ||
           (window.TR.en && window.TR.en[key]) ||
           key;
  };

  /* ═══════════════════════════════════════
     UTILITIES
     ═══════════════════════════════════════ */

  window.formatCurrency = function(amount) {
    return '৳' + parseInt(amount || 0).toLocaleString('en-IN');
  };

  window.initials = function(name) {
    if (!name) return '?';
    var words = name.split(' ');
    var result = '';
    for (var i = 0; i < Math.min(words.length, 2); i++) {
      result += words[i][0] || '';
    }
    return result.toUpperCase() || '?';
  };

  window.getCurrentMonth = function() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date().getMonth()];
  };

  window.getCurrentYear = function() {
    return new Date().getFullYear().toString();
  };

  window.getCurrentPage = function() {
    var path = window.location.pathname;
    if (path.indexOf('members') > -1) return 'members';
    if (path.indexOf('entry') > -1) return 'entry';
    if (path.indexOf('settings') > -1) return 'settings';
    return 'home';
  };

  window.formatDate = function(date) {
    var d = new Date(date);
    var lang = localStorage.getItem('fic_lang') || 'en';
    return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  /* ═══════════════════════════════════════
     THEME
     ═══════════════════════════════════════ */

  window.applyTheme = function(mode) {
    var resolved = mode;
    if (mode === 'system') {
      resolved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  window.setTheme = function(mode) {
    localStorage.setItem('fic_theme', mode);
    applyTheme(mode);
    document.querySelectorAll('.themeBtn').forEach(function(btn) {
      btn.classList.toggle('on', btn.getAttribute('data-th') === mode);
    });
  };

  /* ═══════════════════════════════════════
     LANGUAGE
     ═══════════════════════════════════════ */

  window.applyLang = function() {
    var lang = localStorage.getItem('fic_lang') || 'en';
    document.documentElement.lang = lang;

    var titleEl = document.getElementById('appTitle');
    var subEl = document.getElementById('appSub');
    if (titleEl) titleEl.textContent = window.t('appTitle');
    if (subEl) subEl.textContent = window.t('appSub');

    document.querySelectorAll('#bottomNav .navBtn').forEach(function(btn) {
      var screen = btn.getAttribute('data-screen');
      var span = btn.querySelector('span');
      if (screen === 'home' && span) span.textContent = window.t('navHome');
      else if (screen === 'members' && span) span.textContent = window.t('navMembers');
      else if (screen === 'entry' && span) span.textContent = window.t('navEntry');
      else if (screen === 'settings' && span) span.textContent = window.t('navSettings');
    });

    // Update loading overlay text
    var loadingText = document.getElementById('loadingText');
    if (loadingText) loadingText.textContent = window.t('loading');
  };

  /* ═══════════════════════════════════════
     INIT THEME & LANGUAGE
     ═══════════════════════════════════════ */

  window.initThemeAndLang = function() {
    var savedTheme = localStorage.getItem('fic_theme') || 'light';
    var savedLang = localStorage.getItem('fic_lang') || 'en';
    
    applyTheme(savedTheme);
    window.applyLang();

    // Theme system listener
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (localStorage.getItem('fic_theme') === 'system') applyTheme('system');
      });
    }

    // Role switcher
    document.querySelectorAll('.roleBtn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.roleBtn').forEach(function(b) { b.classList.toggle('on', b === btn); });
        var role = btn.getAttribute('data-role');
        var entryNav = document.getElementById('navEntry');
        if (entryNav) entryNav.style.display = role === 'accountant' ? 'flex' : 'none';
      });
    });

    // Initial entry nav visibility
    var role = document.querySelector('.roleBtn.on');
    var entryNav = document.getElementById('navEntry');
    if (entryNav) {
      var isAccountant = role ? role.getAttribute('data-role') === 'accountant' : false;
      entryNav.style.display = isAccountant ? 'flex' : 'none';
    }

    // Drawer overlay close
    var overlay = document.getElementById('shOv');
    if (overlay) overlay.addEventListener('click', closeSheet);

    // Bottom nav active state
    var page = getCurrentPage();
    document.querySelectorAll('#bottomNav .navBtn').forEach(function(btn) {
      var screen = btn.getAttribute('data-screen');
      btn.classList.toggle('on', screen === page);
      
      // Update icons
      var icon = btn.querySelector('i');
      if (icon) {
        var base = screen === 'home' ? 'house' :
                  screen === 'members' ? 'users' :
                  screen === 'entry' ? 'plus-circle' :
                  'gear';
        icon.className = btn.classList.contains('on') ? 'ph-fill ph-' + base : 'ph-thin ph-' + base;
      }
    });
  };

  /* ═══════════════════════════════════════
     CLOSE SHEET (Drawer)
     ═══════════════════════════════════════ */

  window.closeSheet = function() {
    var overlay = document.getElementById('shOv');
    var drawer = document.getElementById('shDrw');
    if (overlay) overlay.style.opacity = '0';
    if (overlay) overlay.style.pointerEvents = 'none';
    if (drawer) drawer.style.transform = 'translateY(100%)';
  };

})();
