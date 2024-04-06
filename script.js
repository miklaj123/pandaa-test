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

// Funkcja wyszukiwania miasta
function searchCity() {
    const cityName = document.getElementById('fileNameInput').value.trim().toLowerCase();
    if (!cityName) {
        alert('Proszę wpisać nazwę miasta.');
        return;
    }

    search(cityName, 'city');
}

// Funkcja wyszukiwania imienia i nazwiska
function searchNameSurname() {
    const nameSurname = document.getElementById('fileNameInput').value.trim().toLowerCase();
    if (!nameSurname) {
        alert('Proszę wpisać imię i nazwisko.');
        return;
    }

    search(nameSurname, 'nameSurname');
}

// Funkcja wyszukiwania
function search(query, category) {
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
        if (category === 'city') {
            const filePath = `test/${voivodeship}/${query}.json`;
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Brak danych dla: ${voivodeship}`);
                    }
                    return response.json();
                })
                .then(data => {
                    displayResults(data);
                })
                .catch(error => {
                    noDataForVoivodeships.push(voivodeship.replace(/-/g, ' '));
                })
                .finally(() => {
                    if (noDataForVoivodeships.length === voivodeships.length) {
                        displayNoData(noDataForVoivodeships);
                    }
                });
        } else if (category === 'nameSurname') {
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
                                    if (
                                        item.Imie.toLowerCase() === query ||
                                        item.Nazwisko.toLowerCase() === query
                                    ) {
                                        displayResults(item);
                                    }
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
                    });
                })
                .catch(error => {
                    noDataForVoivodeships.push(voivodeship.replace(/-/g, ' '));
                });
        }
    });
}

// Funkcja wyświetlająca wyniki wyszukiwania
function displayResults(data) {
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
