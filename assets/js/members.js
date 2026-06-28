// assets/js/members.js
(function() {
  'use strict';

  var membersCache = null;

  function loadMembers() {
    return new Promise(function(resolve) {
      var cached = Cache.get('members');
      if (cached) {
        membersCache = cached;
        resolve(cached);
        return;
      }
      showLoading(true);
      apiRequest('getPublicMembers', 'GET')
        .then(function(result) {
          membersCache = result.members || [];
          Cache.set('members', membersCache);
          showLoading(false);
          resolve(membersCache);
        })
        .catch(function() {
          showLoading(false);
          if (cached) resolve(cached);
          else resolve([]);
        });
    });
  }

  function renderList() {
    // ... search/filter logic using membersCache
    // Build HTML for each member card
  }

  function openSheet(code) {
    // ... fetch full member with key if needed, or just use cached data
    // Show drawer with member details
  }

  window.initMembers = function() {
    loadMembers().then(renderList);
    // attach search/filter listeners
  };
})();
