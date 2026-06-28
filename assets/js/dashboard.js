// assets/js/dashboard.js
(function() {
  'use strict';

  var dashboardData = null;

  function loadDashboard(month, year) {
    var cached = window.Cache.get('dashboard');
    if (cached) {
      dashboardData = cached;
      renderDashboard(cached);
      return;
    }

    window.showLoading(true);
    window.apiRequest('getDashboardSummary', 'GET', { month: month, year: year })
      .then(function(data) {
        window.showLoading(false);
        if (data && !data.error) {
          dashboardData = data;
          window.Cache.set('dashboard', data);
          renderDashboard(data);
        } else {
          showError('Failed to load dashboard data');
        }
      })
      .catch(function(error) {
        window.showLoading(false);
        console.error('Dashboard load error:', error);
        if (cached) {
          renderDashboard(cached);
          window.showToast('Using cached data');
        } else {
          showError('Failed to load dashboard');
        }
      });
  }

  function showError(message) {
    var container = document.getElementById('scDash');
    if (!container) return;
    container.innerHTML = 
      '<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">' +
        '<p style="font-size:24px;margin-bottom:12px;">⚠️</p>' +
        '<p>' + message + '</p>' +
        '<button onclick="location.reload()" class="chip" style="margin-top:12px;">' + window.t('retry') + '</button>' +
      '</div>';
  }

  function renderDashboard(data) {
    var container = document.getElementById('scDash');
    if (!container) return;

    var d = data || {};
    var totalDue = (d.monthlyExpected || 0) - (d.monthlyCollected || 0);

    container.innerHTML =
      '<div class="page-enter">' +
      // Row 1 - Organization
      '<div class="dash-grid">' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalMembers') + '</div>' +
          '<div class="value">' + (d.totalMembers || 0) + '</div>' +
          '<div class="sub"></div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalMonths') + '</div>' +
          '<div class="value">12</div>' +
          '<div class="sub">' + window.t('since') + ' Jul 2025</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalSavings') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalSavings || 0) + '</div>' +
          '<div class="sub">' + window.t('expected') + ': ' + window.formatCurrency(d.monthlyExpected || 0) + ' • ' + window.t('due') + ': ' + window.formatCurrency(totalDue) + '</div>' +
        '</div>' +
      '</div>' +

      // Row 2 - Banking
      '<div class="dash-grid">' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('bankBalance') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.bankBalance || 0) + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalDeposits') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalDeposits || 0) + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalWithdrawals') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalWithdrawals || 0) + '</div>' +
        '</div>' +
      '</div>' +

      // Row 3 - Financial
      '<div class="dash-grid">' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalExpenses') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalExpenses || 0) + '</div>' +
          '<div class="sub">' + (d.expenseCount || 0) + ' ' + window.t('expenseTransactions') + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalLoansGiven') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalLoansGiven || 0) + '</div>' +
          '<div class="sub">' + (d.overdueCount || 0) + ' ' + window.t('loansIssued') + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalLoansCollected') + '</div>' +
          '<div class="value" style="color:var(--success);">' + window.formatCurrency(d.totalLoansCollected || 0) + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('loanOverdues') + '</div>' +
          '<div class="value" style="color:var(--danger);">' + window.formatCurrency(d.loanOverdues || 0) + '</div>' +
          '<div class="sub">' + (d.overdueCount || 0) + ' ' + window.t('overdueLoans') + '</div>' +
        '</div>' +
      '</div>' +

      // Row 4 - Investments
      '<div class="dash-grid">' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('totalInvested') + '</div>' +
          '<div class="value">' + window.formatCurrency(d.totalInvested || 0) + '</div>' +
          '<div class="sub">' + (d.activeProjects || 0) + ' ' + window.t('activeProjects') + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('investmentProfit') + '</div>' +
          '<div class="value" style="color:var(--success);">' + window.formatCurrency(d.investmentProfit || 0) + '</div>' +
        '</div>' +
        '<div class="dash-stat">' +
          '<div class="label">' + window.t('netProfit') + '</div>' +
          '<div class="value" style="color:' + ((d.netProfit || 0) >= 0 ? 'var(--success)' : 'var(--danger)') + ';">' + window.formatCurrency(d.netProfit || 0) + '</div>' +
        '</div>' +
      '</div>' +

      // Recent Entries
      '<div class="card" style="margin-top:12px;">' +
        '<div style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:12px;">' + window.t('recentEntries') + '</div>' +
        (d.recentEntries && d.recentEntries.length > 0 ? 
          d.recentEntries.map(function(entry) {
            var icon = 'ph-thin ph-circle';
            var color = 'var(--primary)';
            var typeLabel = entry.type || 'Transaction';
            switch (entry.type) {
              case 'Bank Deposit': icon = 'ph-thin ph-bank'; color = 'var(--success)'; break;
              case 'Bank Withdrawal': icon = 'ph-thin ph-bank'; color = 'var(--danger)'; break;
              case 'Loan Given': 
              case 'Loan Disbursed': icon = 'ph-thin ph-hand-coins'; color = 'var(--warning)'; break;
              case 'Loan Recovery':
              case 'Loan Repayment': icon = 'ph-thin ph-hand-coins'; color = 'var(--success)'; break;
              case 'Expense': icon = 'ph-thin ph-receipt'; color = 'var(--danger)'; break;
              case 'Investment': icon = 'ph-thin ph-chart-line'; color = 'var(--primary)'; break;
            }
            var isIncome = entry.type === 'Bank Deposit' || entry.type === 'Loan Repayment' || 
                           entry.type === 'Loan Recovery';
            var isExpense = entry.type === 'Expense' || entry.type === 'Bank Withdrawal' ||
                            entry.type === 'Loan Given' || entry.type === 'Loan Disbursed';
            return '<div class="recent-entry">' +
              '<div class="entry-icon" style="color:' + color + ';"><i class="' + icon + '"></i></div>' +
              '<div class="entry-info">' +
                '<div class="entry-type">' + typeLabel + '</div>' +
                '<div class="entry-desc">' + (entry.description || '') + '</div>' +
              '</div>' +
              '<div class="entry-amount ' + (isIncome ? 'positive' : isExpense ? 'negative' : '') + '">' + window.formatCurrency(entry.amount) + '</div>' +
              '<div class="entry-date">' + (entry.date ? window.formatDate(entry.date) : '') + '</div>' +
            '</div>';
          }).join('') :
          '<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:12px;">No recent transactions</div>'
        ) +
      '</div>' +
      '</div>';

    window.applyLang();
  }

  // Expose init function globally
  window.initDashboard = function() {
    var month = window.getCurrentMonth();
    var year = window.getCurrentYear();
    loadDashboard(month, year);
  };

})();
