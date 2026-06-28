// assets/js/dashboard.js
(function() {
  'use strict';

  function loadDashboard(month, year) {
    var cached = Cache.get('dashboard');
    if (cached) {
      renderDashboard(cached);
      return;
    }
    showLoading(true);
    apiRequest('getDashboardSummary', 'GET', { month: month, year: year })
      .then(function(data) {
        Cache.set('dashboard', data);
        renderDashboard(data);
        showLoading(false);
      })
      .catch(function() {
        showLoading(false);
        if (cached) renderDashboard(cached);
        else showToast('Failed to load dashboard');
      });
  }

  function renderDashboard(data) {
    var container = document.getElementById('scDash');
    if (!container) return;
    var d = data || getEmptyDashboard();
    // ... build HTML using d.totalMembers, d.totalSavings, etc.
    // (exact same HTML from previous version, but clean)
    container.innerHTML = buildDashboardHTML(d);
    applyLang(); // from core if needed
  }

  function getEmptyDashboard() {
    return {
      totalMembers: 0,
      totalSavings: 0,
      monthlyCollected: 0,
      monthlyExpected: 0,
      monthlyDue: 0,
      totalExpenses: 0,
      expenseCount: 0,
      bankBalance: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalLoansGiven: 0,
      totalLoansCollected: 0,
      loanOverdues: 0,
      overdueCount: 0,
      totalInvested: 0,
      activeProjects: 0,
      investmentProfit: 0,
      netProfit: 0,
      recentEntries: []
    };
  }

  function buildDashboardHTML(d) {
    // ... (use the HTML from the earlier dashboard render)
    // This is where you put the grid and recent entries
    return '<div class="page-enter">' + 
      // Row 1, 2, 3, 4 + recent entries
      '</div>';
  }

  // Expose init for the page
  window.initDashboard = function() {
    loadDashboard(getCurrentMonth(), getCurrentYear());
  };
})();
