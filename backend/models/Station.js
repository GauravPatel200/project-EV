const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true

        },

        location: {

            type: String,

            required: true

        },

        chargerType: {

            type: String,

            required: true

        },

        slots: {

            type: Number,

            default: 0

        },

        pricePerUnit: {

            type: Number,

            default: 20

        },

        image: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Station",

    stationSchema

);