const Station = require("../models/Station");

/* =========================
   GET ALL STATIONS
========================= */

const getAllStations = async (

    req,

    res

) => {

    try {

        const stations = await Station.find();

        res.json(stations);

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/* =========================
   GET SINGLE STATION
========================= */

const getStationById = async (

    req,

    res

) => {

    try {

        const station = await Station.findById(

            req.params.id

        );

        if (!station) {

            return res.status(404).json({

                message: "Station Not Found"

            });

        }

        res.json(station);

    }

    catch (error) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/* =========================
   ADD STATION (ADMIN)
========================= */

const addStation = async (

    req,

    res

) => {

    try {
        const station = await Station.create({

        name: req.body.name,

        location: req.body.location,

        chargerType: req.body.chargerType,

        slots: req.body.slots,

        pricePerUnit: req.body.pricePerUnit,

        image: req.file

            ? req.file.filename

            : ""

});

        res.status(201).json(station);

    }

    catch (error) {

        res.status(500).json({

            message: "Unable to Add Station"

        });

    }

};

/* =========================
   UPDATE STATION
========================= */

const updateStation = async (req, res) => {

    try {

        const station = await Station.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        if (!station) {

            return res.status(404).json({

                message: "Station Not Found"

            });

        }

        res.json({

            success: true,

            station

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Update Failed"

        });

    }

};

/* =========================
   DELETE STATION
========================= */

const deleteStation = async (req, res) => {

    try {

        const station = await Station.findByIdAndDelete(

            req.params.id

        );

        if (!station) {

            return res.status(404).json({

                message: "Station Not Found"

            });

        }

        res.json({

            success: true,

            message: "Station Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Delete Failed"

        });

    }

};


module.exports = {

    getAllStations,

    getStationById,

    addStation,

    updateStation,

    deleteStation

};