const upload = require(

    "../middleware/upload"

);


const express = require("express");

const router = express.Router();

const {

    getAllStations,

    getStationById,

    addStation,

    updateStation,

    deleteStation

} = require("../controllers/stationController");



/* GET ALL */

router.get(

    "/",

    getAllStations

);

/* GET SINGLE */

router.get(

    "/:id",

    getStationById

);

/* ADD STATION */

router.post(

    "/",

    upload.single("image"),

    addStation

);

/* UPDATE */

router.put(

    "/:id",

    updateStation

);

/* DELETE */

router.delete(

    "/:id",

    deleteStation

);

module.exports = router;