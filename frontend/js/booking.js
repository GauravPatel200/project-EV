const stationId =
    localStorage.getItem("stationId");

document.getElementById(
    "stationId"
).value = stationId || "";

const bookingForm =
    document.getElementById(
        "bookingForm"
    );

bookingForm.addEventListener(

    "submit",

    async function(e){

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        const bookingData={

            stationId:

            document.getElementById(
                "stationId"
            ).value,

            vehicleNumber:

            document.getElementById(
                "vehicleNumber"
            ).value,

            date:

            document.getElementById(
                "date"
            ).value,

            time:

            document.getElementById(
                "time"
            ).value,

            chargerType:

            document.getElementById(
                "chargerType"
            ).value

        };

        try{

            const response=

            await fetch(

                "http://localhost:5000/api/bookings",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":

                        "application/json",

                        Authorization:

                        "Bearer "+token

                    },

                    body:JSON.stringify(

                        bookingData

                    )

                }

            );

            const data=

            await response.json();

            if(response.ok){

                document.getElementById(

                    "message"

                ).style.color="green";

                document.getElementById(

                    "message"

                ).innerText=

                "Booking Successful.";

                setTimeout(()=>{

                    window.location.href=

                    "dashboard.html";

                },1500);

            }

            else{

                document.getElementById(

                    "message"

                ).style.color="red";

                document.getElementById(

                    "message"

                ).innerText=

                data.message;

            }

        }

        catch(err){

            document.getElementById(

                "message"

            ).style.color="red";

            document.getElementById(

                "message"

            ).innerText=

            "Server Error.";

        }

    }

);