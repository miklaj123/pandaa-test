// Funkcja wyszukiwania miasta
function searchCity() {
    const cityName = document.getElementById('fileNameInput').value.trim().toLowerCase();
    if (!cityName) {
        alert('Proszę wpisać nazwę miasta.');
        return;
    }

    clearResultsTable(); // Wyczyść tabelę wyników przed wyświetleniem nowych danych

    const filePath = `test/country.json`; // Ścieżka do pliku JSON zawierającego dane miast
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Brak danych dla: ${cityName}`);
            }
            return response.json();
        })
        .then(data => {
            const filteredData = data.filter(item => item.Miasto.toLowerCase() === cityName);
            if (filteredData.length > 0) {
                displayResults(filteredData);
            } else {
                displayNoData([cityName]);
            }
        })
        .catch(error => {
            alert(`Wystąpił błąd podczas pobierania danych: ${error.message}`);
        });
}

// Funkcja wyświetlająca wyniki wyszukiwania
function displayResults(data) {
    const resultsTable = document.getElementById('resultsBody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.Imie || 'Brak'}</td><td>${item.Nazwisko || 'Brak'}</td><td>${item['Nr.Telefonu'] || 'Brak'}</td><td>${item.Miasto || 'Brak'}</td><td>${item.Ulica || 'Brak'}</td><td>${item.Kraj || 'Brak'}</td><td>${item['Adres Pocztowy'] || 'Brak'}</td>`;
        resultsTable.appendChild(row);
    });
}

// Funkcja wyświetlająca informację o braku danych
function displayNoData(noDataForCity) {
    if (noDataForCity.length > 0) {
        const resultsTable = document.getElementById('resultsBody');
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7">Brak danych dla miasta: ${noDataForCity.join(', ')}</td>`;
        resultsTable.appendChild(row);
    }
}

// Funkcja czyszcząca tabelę wyników
function clearResultsTable() {
    const resultsTable = document.getElementById('resultsBody');
    resultsTable.innerHTML = ''; // Wyczyść zawartość tabeli przed dodaniem nowych danych
}

// Funkcja przełączania motywu
function toggleDarkMode() {
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');
    const table = document.getElementById('resultsTable');
    table.classList.toggle('dark-mode');
    const h1 = document.querySelector('h1');
    h1.classList.toggle('dark-mode');
    const placeholderText = document.querySelector('.placeholder-text');
    placeholderText.classList.toggle('dark-mode');
    const searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('dark-mode');
    const searchInput = document.getElementById('fileNameInput');
    searchInput.classList.toggle('dark-mode');
}

// Funkcja logowania użytkownika
function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Sprawdzanie poprawności danych logowania
    if (username === "PandaSearch" && password === "Panda-Leak") {
        document.getElementById("overlay").style.display = "none"; // Ukrycie okna logowania
        document.getElementById("mainContent").style.display = "block"; // Wyświetlenie głównego kontenera
        return false; // Zapobieganie domyślnej akcji formularza
    } else {
        alert("Niepoprawna nazwa użytkownika lub hasło.");
        return false; // Zapobieganie domyślnej akcji formularza
    }
}
