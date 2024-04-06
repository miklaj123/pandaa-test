document.getElementById('submit-query').addEventListener('click', function() {
    const query = document.getElementById('query').value.trim().toLowerCase();
    if (!query) {
        alert('Proszę wpisać słowo kluczowe.');
        return;
    }

    clearResultsTable(); // Clear the table before displaying new results

    fetch('test/country.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.miasto.toLowerCase().includes(query) ||
                                                       item.imie.toLowerCase().includes(query) ||
                                                       item.nazwisko.toLowerCase().includes(query));
            displayResults(filteredData);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayResults(data) {
    const tableBody = document.getElementById('table-body');
    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">Brak danych dla podanych kryteriów.</td>`;
        tableBody.appendChild(row);
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.imie}</td>
                         <td>${item.nazwisko}</td>
                         <td>${item.miasto}</td>
                         <td>${item.ulica}</td>
                         <td>${item.kraj}</td>
                         <td>${item.adresPocztowy}</td>`;
        tableBody.appendChild(row);
    });
}

function clearResultsTable() {
    document.getElementById('table-body').innerHTML = '';
}
