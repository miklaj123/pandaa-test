// Funkcja wyszukiwania miasta
function searchCity() {
    const cityName = document.getElementById('cityNameInput').value.trim().toLowerCase();
    if (!cityName) {
        alert('Proszę wpisać nazwę miasta.');
        return;
    }

    // Tutaj pobieramy dane z pliku JSON
    fetch('./country.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas pobierania danych.');
            }
            return response.json();
        })
        .then(data => {
            const filteredData = data.filter(item => item.Miasto.toLowerCase() === cityName);
            displayResults(filteredData);
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas pobierania danych.');
        });
}

// Funkcja wyświetlająca wyniki wyszukiwania
function displayResults(data) {
    const resultsTable = document.getElementById('resultsBody');
    resultsTable.innerHTML = ''; // Wyczyść zawartość tabeli przed dodaniem nowych danych

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.Imie || 'Brak'}</td><td>${item.Nazwisko || 'Brak'}</td><td>${item['Numer Telefonu'] || 'Brak'}</td><td>${item.Miasto || 'Brak'}</td><td>${item.Ulica || 'Brak'}</td><td>${item.Kraj || 'Brak'}</td><td>${item['Adres Pocztowy'] || 'Brak'}</td>`;
        resultsTable.appendChild(row);
    });
}
