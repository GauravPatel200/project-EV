const Booking = require("../models/Booking");

const Station = require("../models/Station");

/* =========================
   CREATE BOOKING
========================= */

const createBooking = async (

    req,

    res

) => {

    try {

        const {

            stationId,

            vehicleNumber,

            chargerType,

            date,

            time

        } = req.body;


        const station = await Station.findById(stationId);

            if (!station) {

                return res.status(404).json({

                    message: "Station Not Found"

                });

            }

            if (station.slots <= 0) {

                return res.status(400).json({

                    message: "No Slots Available"

                });

            }

        const booking = await Booking.create({

            userId: req.user.id,

            stationId,

            vehicleNumber,

            chargerType,

            date,

            time

        });

        station.slots = station.slots - 1;

        await station.save();

        res.status(201).json({

            success: true,

            message: "Booking Successful",

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Booking Failed"

        });

    }

};

/* =========================
   MY BOOKINGS
========================= */

const getMyBookings = async (

    req,

    res

) => {

    try {

        const bookings = await Booking.find({

            userId: req.user.id

        }).populate(

            "stationId"

        );

        const result = bookings.map(

            item => ({

                _id: item._id,

                stationName:

                    item.stationId.name,

                location:

                    item.stationId.location,

                vehicleNumber:

                    item.vehicleNumber,

                chargerType:

                    item.chargerType,

                date:

                    item.date,

                time:

                    item.time,

                status:

                    item.status

            })

        );

        res.json(result);

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/* =========================
   CANCEL BOOKING
========================= */

const cancelBooking = async (req, res) => {

    try {

        // Booking Find karo
        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({

                message: "Booking Not Found"

            });

        }

        // Station Find karo
        const station = await Station.findById(

            booking.stationId

        );

        if (station) {

            // Slot wapas increase karo
            station.slots += 1;

            await station.save();

        }

        // Booking Delete karo
        await Booking.findByIdAndDelete(

            req.params.id

        );

        res.json({

            success: true,

            message: "Booking Cancelled Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};

module.exports = {

    createBooking,

    getMyBookings,

    cancelBooking

};