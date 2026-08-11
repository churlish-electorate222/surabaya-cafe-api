// Surabaya Cafe API — Dashboard Script
// Fills live stats, sets base URLs, copy-to-clipboard

(function () {
  'use strict';

  const BASE = location.origin;

  // Set base URLs in code blocks
  document.getElementById('code-url-1').textContent = BASE + '/api/cafes';
  document.getElementById('code-url-curl').textContent = 'curl ' + BASE + '/api/cafes';
  document.getElementById('code-url-python').textContent = BASE + '/api/cafes';
  document.getElementById('code-url-browser').textContent = BASE + '/api/cafes';

  // Fetch live stats
  fetch(BASE + '/api/stats')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      document.getElementById('stat-total').textContent = d.total;
      document.getElementById('stat-areas').textContent = Object.keys(d.areas).length;
      // Format date
      var dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
      document.getElementById('stat-date').textContent = dateStr;
    })
    .catch(function () {
      document.getElementById('stat-total').textContent = '1.084';
      document.getElementById('stat-areas').textContent = '5';
      document.getElementById('stat-date').textContent = '2025';
    });

  // Fetch sample response
  fetch(BASE + '/api/cafes?limit=1')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var sample = d.data ? d.data[0] : (Array.isArray(d) ? d[0] : null);
      if (sample) {
        document.getElementById('sample-response').textContent =
          JSON.stringify(sample, null, 2);
      }
    })
    .catch(function () {
      document.getElementById('sample-response').textContent =
        '// Contoh tidak tersedia saat offline';
    });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var el = document.getElementById(targetId);
      var text = el.textContent || el.innerText;

      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Tersalin';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Salin';
          btn.classList.remove('copied');
        }, 1500);
      });
    });
  });

  // Language tab switching
  document.querySelectorAll('.lang-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Remove active from all tabs
      document.querySelectorAll('.lang-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      // Remove active from all content
      document.querySelectorAll('.lang-content').forEach(function (c) {
        c.classList.remove('active');
      });
      // Activate clicked tab
      tab.classList.add('active');
      // Activate corresponding content
      var lang = tab.getAttribute('data-lang');
      document.getElementById('lang-' + lang).classList.add('active');
    });
  });
})();
