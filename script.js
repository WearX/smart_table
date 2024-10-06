   // Rendezés Name és Start oszlopok szerint
   document.querySelectorAll('.shortable').forEach(header => {
    header.addEventListener('click', function() {
        let table = header.parentElement.parentElement.parentElement;
        let tbody = table.querySelector('tbody');
        let rows = Array.from(tbody.querySelectorAll('tr'));
        let index = Array.from(header.parentElement.children).indexOf(header);
        let ascending = header.dataset.sortOrder === 'asc';
        
        rows.sort((rowA, rowB) => {
            let cellA = rowA.children[index].innerText;
            let cellB = rowB.children[index].innerText;
            return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });
        
        rows.forEach(row => tbody.appendChild(row));
        header.dataset.sortOrder = ascending ? 'desc' : 'asc';
    });
});

// Keresés név alapján és szűrés évszám alapján
function filterTable() {
    let nameFilter = document.querySelector('.search-input').value.toLowerCase();
    let yearFilter = parseInt(document.querySelector('.search-input-year').value);
    let rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        let name = row.querySelector('td').innerText.toLowerCase();
        let start = parseInt(row.querySelector('.from').innerText);
        let end = parseInt(row.querySelector('.to').innerText);
        
        // Ellenőrizzük, hogy mindkét mező üres-e
        if (nameFilter === '' && isNaN(yearFilter)) {
            row.style.display = '';
        } else {
            // Ellenőrizzük, hogy a név és az évszám feltételek teljesülnek-e
            let nameMatch = name.includes(nameFilter);
            let yearMatch = isNaN(yearFilter) || (yearFilter >= start && yearFilter <= end);
            
            // Ha bármelyik feltétel nem teljesül, rejtjük el a sort
            if (nameMatch && yearMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Név szerinti keresés
document.querySelector('.search-input').addEventListener('input', filterTable);

// Év szerinti szűrés
document.querySelector('.search-input-year').addEventListener('input', filterTable);