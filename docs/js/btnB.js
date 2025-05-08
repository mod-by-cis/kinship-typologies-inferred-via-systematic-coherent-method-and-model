document.addEventListener('DOMContentLoaded', function () {
      // Znajdź wszystkie wiersze nagłówkowe
      document.querySelectorAll('tr.gr-title').forEach(titleX => {
        titleX.addEventListener('click', function () {
          const count = parseInt(titleX.dataset.target, 10);
          let row = titleX;
          for (let i = 0; i < count; i++) {
            row = row.nextElementSibling;
            if (!row || !row.classList.contains('gr-child')) continue;
            // Sprawdź, czy jest ukryty wg CSS, a potem przełącz
            const hidden = getComputedStyle(row).display === 'none';
            row.style.display = hidden ? 'table-row' : 'none';
          }
        });
      });
    });
