document.addEventListener('DOMContentLoaded', function () {
      // Znajdź wszystkie wiersze nagłówkowe
      document.querySelectorAll('tr.group-label').forEach(label => {
        label.addEventListener('click', function () {
          const count = parseInt(label.dataset.target, 10);
          let row = label;
          for (let i = 0; i < count; i++) {
            row = row.nextElementSibling;
            if (!row || !row.classList.contains('group-row')) continue;
            // Sprawdź, czy jest ukryty wg CSS, a potem przełącz
            const hidden = getComputedStyle(row).display === 'none';
            row.style.display = hidden ? 'table-row' : 'none';
          }
        });
      });
    });
