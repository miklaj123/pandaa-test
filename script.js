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

// Funkcja wyszukiwania miasta lub imienia i nazwiska
function search() {
    const searchCategory = document.getElementById('searchCategory').value;
    const searchQuery = document.getElementById('fileNameInput').value.trim().toLowerCase();

    if (!searchQuery) {
        alert('Proszę wpisać frazę do wyszukania.');
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
        if (searchCategory === 'city') {
            const filePath = `test/${voivodeship}/${searchQuery}.json`;
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Brak danych dla: ${voivodeship}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayResultsByCity(data);
                })
                .catch(error => {
                    noDataForVoivodeships.push(voivodeship.replace(/-/g, ' '));
                })
                .finally(() => {
                    if (noDataForVoivodeships.length === voivodeships.length) {
                        displayNoData(noDataForVoivodeships);
                    }
                });
        } else if (searchCategory === 'nameSurname') {
            const folderPath = `test/${voivodeship}/`;
            fetch(folderPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Brak danych dla: ${voivodeship}`);
                    }
                    return response.json();
                })
                .then(files => {
                    files.forEach(file => {
                        const filePath = `test/${voivodeship}/${file}`;
                        fetch(filePath)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Błąd pobierania danych: ${filePath}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                data.forEach(item => {
                                    if (item.Imie.toLowerCase() === searchQuery || item.Nazwisko.toLowerCase() === searchQuery) {
                                        displayResultsByNameSurname(item);
                                    }
                                });
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    });
                })
                .catch(error => {
                    noDataForVoivodeships.push(voivodeship.replace(/-/g, ' '));
                })
                .finally(() => {
                    if (noDataForVoivodeships.length === voivodeships.length) {
                        displayNoData(noDataForVoivodeships);
                    }
                });
        }
    });
}

// Funkcja wyświetlająca wyniki dla wyszukiwania według miasta
function displayResultsByCity(data) {
    const resultsTable = document.getElementById('resultsBody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.Imie || 'Brak'}</td><td>${item.Nazwisko || 'Brak'}</td><td>${item['Nr.Telefonu'] || 'Brak'}</td><td>${item.Miasto || 'Brak'}</td><td>${item.Ulica || 'Brak'}</td><td>${item.Kraj || 'Brak'}</td><td>${item['Adres Pocztowy'] || 'Brak'}</td>`;
        resultsTable.appendChild(row);
    });
}

// Funkcja wyświetlająca wyniki dla wyszukiwania według imienia i nazwiska
function displayResultsByNameSurname(data) {
    const resultsTable = document.getElementById('resultsBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${data.Imie || 'Brak'}</td><td>${data.Nazwisko || 'Brak'}</td><td>${data['Nr.Telefonu'] || 'Brak'}</td><td>${data.Miasto || 'Brak'}</td><td>${data.Ulica || 'Brak'}</td><td>${data.Kraj || 'Brak'}</td><td>${data['Adres Pocztowy'] || 'Brak'}</td>`;
    resultsTable.appendChild(row);
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
