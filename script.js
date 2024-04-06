// Funkcja otwierająca okno logowania
function openLogin() {
    document.getElementById("overlay").style.display = "flex";
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

// Funkcja wyszukiwania danych (imię, nazwisko, miasto, itp.) z nowego pliku JSON
function search() {
    const searchTerm = document.getElementById('fileNameInput').value.trim().toLowerCase();
    if (!searchTerm) {
        alert('Proszę wpisać imię, nazwisko lub miasto.');
        return;
    }

    clearResultsTable(); // Wyczyść tabelę wyników przed wyświetleniem nowych danych

    // Ścieżka do pliku JSON z danymi
    const filePath = `test/country.json`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Błąd pobierania danych.`);
            }
            return response.json();
        })
        .then(data => {
            // Sprawdzanie, czy dane pasują do wyszukiwanego terminu (imię, nazwisko, miasto)
            const filteredData = data.filter(item => {
                return Object.values(item).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm)
                );
            });
            if (filteredData.length > 0) {
                displayResults(filteredData);
            } else {
                displayNoData(["Dane"]);
            }
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
            displayNoData(["Dane"]);
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
function displayNoData(noDataForVoivodeships) {
    if (noDataForVoivodeships.length > 0) {
        const resultsTable = document.getElementById('resultsBody');
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7">Brak danych dla większości województw.</td>`;
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
