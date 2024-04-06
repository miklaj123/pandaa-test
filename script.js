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

// Funkcja wyszukiwania miasta, imienia i nazwiska
function searchCity() {
    const searchOption = document.getElementById('searchOptions').value;
    let searchString;
    switch(searchOption) {
        case 'city':
            searchString = document.getElementById('fileNameInput').value.trim().toLowerCase();
            break;
        case 'nameSurname':
            searchString = document.getElementById('fileNameInput').value.trim().toLowerCase();
            break;
        case 'name':
            searchString = document.getElementById('fileNameInput').value.trim().toLowerCase();
            break;
        case 'surname':
            searchString = document.getElementById('fileNameInput').value.trim().toLowerCase();
            break;
        case 'street':
            searchString = document.getElementById('fileNameInput').value.trim().toLowerCase();
            break;
        default:
            return;
    }

    if (!searchString) {
        alert('Proszę wpisać nazwę miasta lub imię i nazwisko.');
        return;
    }

    clearResultsTable(); // Wyczyść tabelę wyników przed wyświetleniem nowych danych

    const voivodeships = [
        'GREATER POLAND VOIVODESHIP',
        'KUJAWSKO-POMORSKIE',
        'LESSER POLAND VOIVODESHIP',
        'LOWER SILESIAN VOIVODESHIP',
        'LUBLIN VOIVODESHIP',
        'LUBUSZ',
        'MASOVIAN VOIVODESHIP',
        'OPOLE VOIVODESHIP',
        'PODLASIE',
        'POMERANIAN VOIVODESHIP',
        'SILESIAN VOIVODESHIP',
        'SUBCARPATHIAN VOIVODESHIP',
        'SWIETOKRZYSKIE',
        'WARMIAN-MASURIAN VOIVODESHIP',
        'WEST POMERANIAN VOIVODESHIP'
    ];

    let noDataForVoivodeships = [];

    voivodeships.forEach(voivodeship => {
        const filePath = `test/${voivodeship}/`;
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Brak danych dla: ${voivodeship}`);
                }
                return response.json();
            })
            .then(data => {
                switch(searchOption) {
                    case 'city':
                        displayResultsByCity(data, searchString);
                        break;
                    case 'nameSurname':
                        displayResultsByNameSurname(data, searchString);
                        break;
                    case 'name':
                        displayResultsByName(data, searchString, 'Imie');
                        break;
                    case 'surname':
                        displayResultsByName(data, searchString, 'Nazwisko');
                        break;
                    case 'street':
                        displayResultsByName(data, searchString, 'Ulica');
                        break;
                }
            })
            .catch(error => {
                noDataForVoivodeships.push(voivodeship.replace(/-/g, ' '));
            })
            .finally(() => {
                if (noDataForVoivodeships.length === voivodeships.length) {
                    displayNoData(noDataForVoivodeships);
                }
            });
    });
}

// Funkcja wyświetlająca wyniki wyszukiwania po imieniu i nazwisku
function displayResultsByNameSurname(data, searchString) {
    const resultsTable = document.getElementById('resultsBody');
    data.forEach(item => {
        if ((item['Imie'] && item['Imie'].toLowerCase() === searchString) || (item['Nazwisko'] && item['Nazwisko'].toLowerCase() === searchString)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.Imie || 'Brak'}</td><td>${item.Nazwisko || 'Brak'}</td><td>${item['Nr.Telefonu'] || 'Brak'}</td><td>${item.Miasto || 'Brak'}</td><td>${item.Ulica || 'Brak'}</td><td>${item.Kraj || 'Brak'}</td><td>${item['Adres Pocztowy'] || 'Brak'}</td>`;
            resultsTable.appendChild(row);
        }
    });
}

// Funkcja wyświetlająca wyniki wyszukiwania po imieniu, nazwisku lub ulicy
function displayResultsByName(data, searchString, propertyName) {
    const resultsTable = document.getElementById('resultsBody');
    data.forEach(item => {
        if (item[propertyName] && item[propertyName].toLowerCase().includes(searchString)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.Imie || 'Brak'}</td><td>${item.Nazwisko || 'Brak'}</td><td>${item['Nr.Telefonu'] || 'Brak'}</td><td>${item.Miasto || 'Brak'}</td><td>${item.Ulica || 'Brak'}</td><td>${item.Kraj || 'Brak'}</td><td>${item['Adres Pocztowy'] || 'Brak'}</td>`;
            resultsTable.appendChild(row);
        }
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
