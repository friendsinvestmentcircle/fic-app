// assets/js/entry-batch.js
(function() {
  'use strict';

  var batchState = [];
  var membersCache = [];

  function initBatch() {
    membersCache = window.Cache.get('members') || [];
    batchState = membersCache.map(function() {
      return {
        amt: 0,
        charge: 0,
        rcv: getDefRcv(),
        mth: getDefMth(),
        rcvOv: false,
        mthOv: false,
        chargeOv: false,
        sel: true
      };
    });
  }

  function getDefRcv() {
    var btn = document.querySelector('.byBChip.on');
    return btn ? btn.getAttribute('data-v') : window.t('rcv1');
  }

  function getDefMth() {
    var sel = document.getElementById('bDefMeth');
    return sel ? sel.value : window.t('methods')[0];
  }

  function getDefAmt() {
    var inp = document.getElementById('bDefAmt');
    return inp ? (parseInt(inp.value) || 300) : 300;
  }

  function getDefCharge() {
    var inp = document.getElementById('bDefCharge');
    return inp ? (parseInt(inp.value) || 0) : 0;
  }

  function buildBatch() {
    var methods = window.t('methods');
    return '<div class="batch-mode-hint">' +
        '<p><strong>' + window.t('batchModeTitle') + '</strong> — ' + window.t('batchModeHint') + '</p>' +
      '</div>' +
      '<div class="card" style="margin-bottom:8px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
          '<p style="margin:0;font-size:12px;font-weight:600;color:var(--text);">' + window.t('defSettings') + '</p>' +
          '<button id="applyAllBtn" class="chip" style="font-size:10px;">' + window.t('applyAll') + '</button>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">' +
          '<div><label class="fl">' + window.t('monthLabel') + '</label>' +
            '<select id="bMonth">' + window.t('months').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
          '<div><label class="fl">' + window.t('defAmt') + '</label>' +
            '<input id="bDefAmt" type="number" value="300" style="text-align:right;"></div>' +
          '<div><label class="fl">' + window.t('defCharge') + '</label>' +
            '<input id="bDefCharge" type="number" value="0" style="text-align:right;"></div>' +
        '</div>' +
        '<div style="display:flex;gap:14px;flex-wrap:wrap;">' +
          '<div style="flex:1;min-width:100px;"><label class="fl">' + window.t('defReceiver') + '</label>' +
            '<div style="display:flex;gap:6px;">' +
              '<button class="chip on byBChip" data-v="' + window.t('rcv1') + '" style="font-size:11px;padding:4px 10px;">' + window.t('rcv1') + '</button>' +
              '<button class="chip byBChip" data-v="' + window.t('rcv2') + '" style="font-size:11px;padding:4px 10px;">' + window.t('rcv2') + '</button>' +
            '</div></div>' +
          '<div style="flex:1;min-width:100px;"><label class="fl">' + window.t('defMethod') + '</label>' +
            '<select id="bDefMeth" style="font-size:12px;padding:6px 8px;">' +
              methods.map(function(m) { return '<option value="' + m + '">' + m + '</option>'; }).join('') +
            '</select></div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:12px;padding:4px 2px 8px;font-size:10px;color:var(--text-muted);flex-wrap:wrap;">' +
        '<span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;background:var(--primary);border-radius:2px;display:inline-block;"></span>' + window.t('lgDefault') + '</span>' +
        '<span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;background:var(--primary);border-radius:2px;display:inline-block;opacity:0.5;"></span>' + window.t('lgReceiverOv') + '</span>' +
        '<span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border:1.5px solid var(--primary);border-radius:2px;display:inline-block;"></span>' + window.t('lgMethodOv') + '</span>' +
        '<span style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;background:var(--warning);border-radius:2px;display:inline-block;"></span>' + window.t('lgChargeOv') + '</span>' +
      '</div>' +
      '<div class="card" style="overflow:hidden;padding:0;">' +
        '<div class="batch-header">' +
          '<input type="checkbox" id="chkAll" class="rowChk col-check" checked>' +
          '<span class="col-member">' + window.t('colMember') + ' <span id="selCount" style="color:var(--primary);font-weight:700;"></span></span>' +
          '<span class="col-receiver">' + window.t('colReceiver') + '</span>' +
          '<span class="col-method">' + window.t('colMethod') + '</span>' +
          '<span class="col-charge">' + window.t('colCharge') + '</span>' +
          '<span class="col-amount">' + window.t('colAmount') + '</span>' +
        '</div>' +
        '<div id="batchList" style="padding:0 10px;"></div>' +
      '</div>' +
      '<div class="batch-footer">' +
        '<div class="footer-row">' +
          '<div class="entry-count"><span id="bEntryCount" style="font-weight:700;color:var(--text);">0</span> ' + window.t('entries') + ' &nbsp;·&nbsp; <span id="bRcvSplit" class="split-info"></span></div>' +
          '<span class="total">৳<span id="bTotal">0</span></span>' +
        '</div>' +
        '<div class="method-break" id="bMethBreak"></div>' +
        '<div class="footer-row" style="margin-top:4px;">' +
          '<span class="split-info" id="bChargeTotal">' + window.t('defCharge') + ': ৳0</span>' +
        '</div>' +
        '<button id="bSubmit" class="btn-primary" style="margin-top:8px;">' + window.t('submitBatch') + '</button>' +
      '</div>';
  }

  function renderBatchList() {
    var container = document.getElementById('batchList');
    if (!container) return;
    container.innerHTML = '';
    var methods = window.t('methods');
    var selectedCount = 0;

    membersCache.forEach(function(m, i) {
      var s = batchState[i] || { amt: 0, charge: 0, rcv: getDefRcv(), mth: getDefMth(), rcvOv: false, mthOv: false, chargeOv: false, sel: true };
      if (s.sel) selectedCount++;

      var name = localStorage.getItem('fic_lang') === 'en' ? m['Full Name (EN)'] || '' : m['Full Name (BN)'] || '';
      var code = m['Associate Code'] || '';

      var row = document.createElement('div');
      row.className = 'b-row' + (s.amt > 0 && s.sel ? ' has-amt' : '') + (s.sel ? '' : ' unchecked');
      row.setAttribute('data-idx', i);

      row.innerHTML =
        '<input type="checkbox" class="rowChk col-check" data-idx="' + i + '" ' + (s.sel ? 'checked' : '') + '>' +
        '<div class="col-member">' +
          '<div class="name bn">' + (name || code || 'Unknown') + '</div>' +
          '<div class="status">' + code + '</div>' +
        '</div>' +
        '<div class="col-receiver">' +
          '<div class="rcvToggle' + (s.rcvOv ? ' ov' : '') + '">' +
            '<button class="rcvBtn' + (s.rcv === window.t('rcv1') ? ' on' : '') + '" data-idx="' + i + '" data-v="' + window.t('rcv1') + '" title="' + window.t('rcv1') + '">' + window.t('rcv1Short') + '</button>' +
            '<button class="rcvBtn' + (s.rcv === window.t('rcv2') ? ' on' : '') + '" data-idx="' + i + '" data-v="' + window.t('rcv2') + '" title="' + window.t('rcv2') + '">' + window.t('rcv2Short') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="col-method">' +
          '<select class="mthSel' + (s.mthOv ? ' ov' : '') + '" data-idx="' + i + '"></select>' +
        '</div>' +
        '<div class="col-charge">' +
          '<input class="chargeInput' + (s.chargeOv ? ' ov' : '') + '" type="number" placeholder="0" data-idx="' + i + '" min="0" step="5" value="' + (s.charge > 0 ? s.charge : '') + '">' +
        '</div>' +
        '<div class="col-amount">' +
          '<input class="amtInput" type="number" placeholder="—" data-idx="' + i + '" min="0" step="100" value="' + (s.amt > 0 ? s.amt : '') + '">' +
        '</div>';

      var sel = row.querySelector('.mthSel');
      methods.forEach(function(mth) {
        var opt = document.createElement('option');
        opt.value = mth;
        opt.textContent = mth;
        if (mth === s.mth) opt.selected = true;
        sel.appendChild(opt);
      });

      // Row checkbox
      row.querySelector('.rowChk').addEventListener('change', function(e) {
        batchState[i].sel = e.target.checked;
        row.classList.toggle('unchecked', !e.target.checked);
        updateBatchFooter();
        var allChecked = batchState.every(function(x) { return x.sel; });
        var chkAll = document.getElementById('chkAll');
        if (chkAll) chkAll.checked = allChecked;
      });

      // Receiver toggle
      row.querySelectorAll('.rcvBtn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var defR = getDefRcv();
          batchState[i].rcv = btn.getAttribute('data-v');
          batchState[i].rcvOv = (batchState[i].rcv !== defR);
          row.querySelectorAll('.rcvBtn').forEach(function(b) {
            b.classList.toggle('on', b === btn);
          });
          row.querySelector('.rcvToggle').classList.toggle('ov', batchState[i].rcvOv);
          updateBatchFooter();
        });
      });

      // Method select
      sel.addEventListener('change', function() {
        batchState[i].mth = sel.value;
        batchState[i].mthOv = (sel.value !== getDefMth());
        sel.classList.toggle('ov', batchState[i].mthOv);
        updateBatchFooter();
      });

      // Charge input
      var chargeInput = row.querySelector('.chargeInput');
      chargeInput.addEventListener('input', function() {
        var charge = parseInt(chargeInput.value) || 0;
        var defCharge = getDefCharge();
        batchState[i].charge = charge;
        batchState[i].chargeOv = (charge !== defCharge);
        chargeInput.classList.toggle('ov', batchState[i].chargeOv);
        updateBatchFooter();
      });

      // Amount input
      var amtInput = row.querySelector('.amtInput');
      amtInput.addEventListener('input', function() {
        batchState[i].amt = parseInt(amtInput.value) || 0;
        row.classList.toggle('has-amt', batchState[i].amt > 0 && batchState[i].sel);
        updateBatchFooter();
      });

      container.appendChild(row);
    });

    var selCount = document.getElementById('selCount');
    if (selCount) selCount.textContent = '(' + selectedCount + ')';
    updateBatchFooter();
  }

  function updateBatchFooter() {
    var total = 0, count = 0, rcv1Total = 0, rcv2Total = 0, totalCharge = 0;
    var methMap = {};
    batchState.forEach(function(s) {
      if (s.amt > 0 && s.sel) {
        total += s.amt;
        totalCharge += s.charge || 0;
        count++;
        if (s.rcv === window.t('rcv1')) rcv1Total += s.amt;
        else rcv2Total += s.amt;
        methMap[s.mth] = (methMap[s.mth] || 0) + s.amt;
      }
    });

    var totalEl = document.getElementById('bTotal');
    if (totalEl) totalEl.textContent = total.toLocaleString('en-IN');

    var countEl = document.getElementById('bEntryCount');
    if (countEl) countEl.textContent = count;

    var splitEl = document.getElementById('bRcvSplit');
    if (splitEl) {
      splitEl.textContent = count > 0 ?
        window.t('rcv1') + ' ৳' + rcv1Total.toLocaleString('en-IN') + ' · ' + window.t('rcv2') + ' ৳' + rcv2Total.toLocaleString('en-IN') :
        '';
    }

    var breakEl = document.getElementById('bMethBreak');
    if (breakEl) {
      breakEl.innerHTML = '';
      Object.keys(methMap).forEach(function(k) {
        var span = document.createElement('span');
        span.className = 'tag';
        span.textContent = k + ' ৳' + methMap[k].toLocaleString('en-IN');
        breakEl.appendChild(span);
      });
    }

    var chargeEl = document.getElementById('bChargeTotal');
    if (chargeEl) {
      chargeEl.textContent = window.t('defCharge') + ': ৳' + totalCharge.toLocaleString('en-IN');
    }
  }

  function wireBatch() {
    var container = document.getElementById('pBatch');
    if (!container) return;

    var applyBtn = document.getElementById('applyAllBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        var defR = getDefRcv();
        var defM = getDefMth();
        var defCharge = getDefCharge();
        batchState.forEach(function(s) {
          s.rcv = defR;
          s.mth = defM;
          s.charge = defCharge;
          s.rcvOv = false;
          s.mthOv = false;
          s.chargeOv = false;
        });
        renderBatchList();
        window.showToast(window.t('appliedAll'));
      });
    }

    document.querySelectorAll('.byBChip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        document.querySelectorAll('.byBChip').forEach(function(c) { c.classList.remove('on'); });
        chip.classList.add('on');
        var defR = chip.getAttribute('data-v');
        batchState.forEach(function(s) {
          if (!s.rcvOv) s.rcv = defR;
        });
        document.querySelectorAll('#batchList .b-row').forEach(function(row) {
          var idx = parseInt(row.getAttribute('data-idx'));
          var s = batchState[idx];
          row.querySelectorAll('.rcvBtn').forEach(function(btn) {
            btn.classList.toggle('on', btn.getAttribute('data-v') === s.rcv);
          });
          row.querySelector('.rcvToggle').classList.toggle('ov', s.rcvOv);
        });
        updateBatchFooter();
      });
    });

    var defMethSel = document.getElementById('bDefMeth');
    if (defMethSel) {
      defMethSel.addEventListener('change', function() {
        var defM = this.value;
        batchState.forEach(function(s) {
          if (!s.mthOv) s.mth = defM;
        });
        document.querySelectorAll('#batchList .mthSel').forEach(function(sel) {
          var idx = parseInt(sel.getAttribute('data-idx'));
          sel.value = batchState[idx].mth;
          sel.classList.toggle('ov', batchState[idx].mthOv);
        });
        updateBatchFooter();
      });
    }

    var defChargeSel = document.getElementById('bDefCharge');
    if (defChargeSel) {
      defChargeSel.addEventListener('input', function() {
        var defCharge = parseInt(this.value) || 0;
        batchState.forEach(function(s) {
          if (!s.chargeOv) s.charge = defCharge;
        });
        document.querySelectorAll('#batchList .chargeInput').forEach(function(inp) {
          var idx = parseInt(inp.getAttribute('data-idx'));
          if (!batchState[idx].chargeOv) {
            inp.value = batchState[idx].charge || '';
          }
          inp.classList.toggle('ov', batchState[idx].chargeOv);
        });
        updateBatchFooter();
      });
    }

    var chkAll = document.getElementById('chkAll');
    if (chkAll) {
      chkAll.addEventListener('change', function() {
        var checked = this.checked;
        batchState.forEach(function(s) { s.sel = checked; });
        document.querySelectorAll('#batchList .rowChk').forEach(function(c) { c.checked = checked; });
        document.querySelectorAll('#batchList .b-row').forEach(function(row) {
          row.classList.toggle('unchecked', !checked);
        });
        updateBatchFooter();
      });
    }

    // Submit batch
    var submitBtn = document.getElementById('bSubmit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        var entries = [];
        var month = document.getElementById('bMonth') ? document.getElementById('bMonth').value : window.t('months')[0];
        
        batchState.forEach(function(s, i) {
          if (s.amt > 0 && s.sel) {
            var member = membersCache[i] || {};
            entries.push({
              associateCode: member['Associate Code'] || '',
              amount: s.amt,
              paymentMethod: s.mth,
              methodCharge: s.charge || 0,
              collectedBy: s.rcv,
              month: month,
              year: window.getCurrentYear(),
              date: new Date().toISOString().split('T')[0],
              notes: ''
            });
          }
        });

        if (entries.length === 0) {
          window.showToast(window.t('noAmt'));
          return;
        }

        window.showLoading(true);
        window.apiRequest('addBatch', 'POST', { entries: entries })
          .then(function(result) {
            window.showLoading(false);
            if (result.success) {
              window.showToast(result.savedCount + ' ' + window.t('batchSaved'));
              batchState.forEach(function(s) {
                s.amt = 0;
                s.charge = getDefCharge();
              });
              renderBatchList();
              window.Cache.clear('dashboard');
            } else {
              window.showToast(window.t('submitError') + ': ' + (result.error || ''));
            }
          })
          .catch(function(error) {
            window.showLoading(false);
            window.showToast(window.t('submitError'));
            console.error('Batch submit error:', error);
          });
      });
    }
  }

  // Expose
  window.initBatch = function() {
    var cached = window.Cache.get('members');
    if (cached) {
      membersCache = cached;
      initBatch();
      var container = document.getElementById('pBatch');
      if (container) {
        container.innerHTML = buildBatch();
        renderBatchList();
        wireBatch();
        window.applyLang();
      }
    } else {
      // Load members first
      window.apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          membersCache = result.members || [];
          window.Cache.set('members', membersCache);
          initBatch();
          var container = document.getElementById('pBatch');
          if (container) {
            container.innerHTML = buildBatch();
            renderBatchList();
            wireBatch();
            window.applyLang();
          }
        })
        .catch(function(error) {
          console.error('Failed to load members for batch:', error);
          window.showToast('Failed to load members');
        });
    }
  };

})();
