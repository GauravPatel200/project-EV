// ==============================
// All Stations Data
// ==============================

let allStations = [];

const container = document.getElementById(
    "stationContainer"
);

// ==============================
// Load Stations from Backend
// ==============================

async function loadStations() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/stations"
        );

        const data = await response.json();

        allStations = data;

        displayStations(allStations);

        populateLocations(allStations);

    }

    catch (error) {

        console.log(error);

        container.innerHTML =
            "<h2>Unable to load stations.</h2>";

    }

}

// ==============================
// Display Stations
// ==============================

function displayStations(data) {

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =
            "<h2>No Stations Found</h2>";

        return;

    }

    data.forEach(station => {

        container.innerHTML += `

        <div class="station-card">

            <img

                src="http://localhost:5000/uploads/${station.image}"

                alt="${station.name}"

                class="station-image"

            >

            <h2>

                ${station.name}

            </h2>

            <p>

                📍 ${station.location}

            </p>

            <p>

                ⚡ Charger :
                ${station.chargerType}

            </p>

            <p>

                🔌 Available Slots :
                ${station.slots}

            </p>

            <p>

                💰 ₹${station.pricePerUnit} / Unit

            </p>

            <button

                onclick="bookStation('${station._id}')"

            >

                Book Now

            </button>

        </div>

        `;

    });

}

// ==============================
// Populate Location Dropdown
// ==============================

function populateLocations(data) {

    const select = document.getElementById(
        "locationFilter"
    );

    select.innerHTML =

        `<option value="">

            All Locations

        </option>`;

    const locations = [

        ...new Set(

            data.map(

                item => item.location

            )

        )

    ];

    locations.forEach(location => {

        select.innerHTML +=

        `<option value="${location}">

            ${location}

        </option>`;

    });

}

// ==============================
// Search + Filter
// ==============================

function filterStations() {

    const search =

        document.getElementById(

            "searchInput"

        ).value.toLowerCase();

    const location =

        document.getElementById(

            "locationFilter"

        ).value;

    const filtered = allStations.filter(

        station => {

            const matchSearch =

                station.name

                    .toLowerCase()

                    .includes(search)

                ||

                station.location

                    .toLowerCase()

                    .includes(search);

            const matchLocation =

                location === ""

                ||

                station.location === location;

            return (

                matchSearch

                &&

                matchLocation

            );

        }

    );

    displayStations(filtered);

}

// ==============================
// Search Event
// ==============================

document.getElementById(

    "searchInput"

).addEventListener(

    "input",

    filterStations

);

// ==============================
// Location Filter Event
// ==============================

document.getElementById(

    "locationFilter"

).addEventListener(

    "change",

    filterStations

);

// ==============================
// Book Station
// ==============================

function bookStation(id) {

    localStorage.setItem(

        "stationId",

        id

    );

    window.location.href =

        "booking.html";

}

// ==============================
// Initial Load
// ==============================

loadStations();