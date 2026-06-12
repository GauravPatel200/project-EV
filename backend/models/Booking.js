const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(

    {

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        stationId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Station",

            required: true

        },

        vehicleNumber: {

            type: String,

            required: true

        },

        chargerType: {

            type: String,

            required: true

        },

        date: {

            type: String,

            required: true

        },

        time: {

            type: String,

            required: true

        },

        status: {

            type: String,

            default: "Booked"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Booking",

    bookingSchema

);