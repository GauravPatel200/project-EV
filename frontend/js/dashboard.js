const user = JSON.parse(
    localStorage.getItem("user")
);

if (!user) {

    window.location.href =
        "login.html";

}

document.getElementById(
    "userName"
).innerText = user.name;

document.getElementById(
    "logoutBtn"
).addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
        "login.html";

});

async function loadStations() {

    try {

        const res = await fetch(

            "http://localhost:5000/api/stations"

        );

        const data = await res.json();

        document.getElementById(

            "stationCount"

        ).innerText = data.length;

    }

    catch (err) {

        console.log(err);

    }

}

async function loadBookings() {

    try {

        const token =
            localStorage.getItem("token");

        const res = await fetch(

            "http://localhost:5000/api/bookings/my",

            {

                headers: {

                    Authorization:

                        "Bearer " + token

                }

            }

        );

        const data = await res.json();

        document.getElementById(

            "bookingCount"

        ).innerText = data.length;

        let html = "";

       data.forEach(item => {

            html += `

            <tr>

                <td>${item.stationName}</td>

                <td>${item.date}</td>

                <td>${item.time}</td>

                <td>${item.status}</td>

                <td>

                    <button

                        onclick="cancelBooking('${item._id}')"

                    >

                        Cancel

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById(

            "bookingBody"

        ).innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}

loadStations();

loadBookings();

async function cancelBooking(id) {

    const token = localStorage.getItem("token");

    const confirmCancel = confirm(

        "Are you sure you want to cancel this booking?"

    );

    if (!confirmCancel) {

        return;

    }

    try {

        const res = await fetch(

            "http://localhost:5000/api/bookings/" + id,

            {

                method: "DELETE",

                headers: {

                    Authorization:

                        "Bearer " + token

                }

            }

        );

        const data = await res.json();

        alert(data.message);

        // Dashboard Refresh
        loadBookings();

        loadStations();

    }

    catch (err) {

        console.log(err);

    }

}