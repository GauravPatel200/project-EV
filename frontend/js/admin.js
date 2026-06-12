// ==========================
// Form aur Station List ko Select karo
// ==========================

const form = document.getElementById("stationForm");

const stationList = document.getElementById("stationList");


// ==========================
// Sare Stations Load Karna
// ==========================

async function loadStations() {

    const response = await fetch(

        "http://localhost:5000/api/stations"

    );

    const data = await response.json();

    stationList.innerHTML = "";

    data.forEach((item) => {

        stationList.innerHTML += `

        <div class="station">

            <div>

                <h3>${item.name}</h3>

                <p>Location : ${item.location}</p>

                <p>Charger : ${item.chargerType}</p>

                <p>Slots : ${item.slots}</p>

                <p>Price : ₹${item.pricePerUnit}</p>

            </div>

            <div>

                <button

                    onclick="editStation('${item._id}')"

                >

                    Edit

                </button>

                <button

                    class="deleteBtn"

                    onclick="deleteStation('${item._id}')"

                >

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}


// ==========================
// Add ya Update
// ==========================

form.addEventListener(

    "submit",

    async function (e) {

        e.preventDefault();

        // Form se Data uthao

        const formData = new FormData();

        formData.append(
            "name",
            document.getElementById("name").value
        );

        formData.append(
            "location",
            document.getElementById("location").value
        );

        formData.append(
            "chargerType",
            document.getElementById("chargerType").value
        );

        formData.append(
            "slots",
            document.getElementById("slots").value
        );

        formData.append(
            "pricePerUnit",
            document.getElementById("pricePerUnit").value
        );

        const imageFile =
            document.getElementById("image").files[0];

        if (imageFile) {

            formData.append(
                "image",
                imageFile
            );

        }


        // Check karo Edit chal raha hai ya Add

        const editId = form.dataset.editId;


        // Agar editId hai to PUT

        // warna POST

        const url = editId

            ? "http://localhost:5000/api/stations/" + editId

            : "http://localhost:5000/api/stations";


        const method = editId

            ? "PUT"

            : "POST";


        await fetch(

            url,

            {

                method: method,

               body: formData
            }

        );


        // Form Clear

        form.reset();


        // Edit Mode Remove

        delete form.dataset.editId;


        // List Reload

        loadStations();

    }

);


// ==========================
// Edit Station
// ==========================

async function editStation(id) {

    const response = await fetch(

        "http://localhost:5000/api/stations/" + id

    );

    const station = await response.json();


    // Form Auto Fill

    document.getElementById("name").value =

        station.name;


    document.getElementById("location").value =

        station.location;


    document.getElementById("chargerType").value =

        station.chargerType;


    document.getElementById("slots").value =

        station.slots;


    document.getElementById("pricePerUnit").value =

        station.pricePerUnit;


    // Save Edit ID

    form.dataset.editId = id;

}


// ==========================
// Delete Station
// ==========================

async function deleteStation(id) {

    const confirmDelete = confirm(

        "Delete this Station?"

    );

    if (!confirmDelete) {

        return;

    }

    await fetch(

        "http://localhost:5000/api/stations/" + id,

        {

            method: "DELETE"

        }

    );

    loadStations();

}


// ==========================
// Page Load hote hi Data lao
// ==========================

loadStations();