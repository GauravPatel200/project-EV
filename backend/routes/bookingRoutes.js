const express = require("express");

const router = express.Router();

const authMiddleware = require(

    "../middleware/authMiddleware"

);

const {

    createBooking,

    getMyBookings,

    cancelBooking

} = require(

    "../controllers/bookingController"

);

/* CREATE BOOKING */

router.post(

    "/",

    authMiddleware,

    createBooking

);

/* MY BOOKINGS */

router.get(

    "/my",

    authMiddleware,

    getMyBookings

);

router.delete(

    "/:id",

    authMiddleware,

    cancelBooking

);

module.exports = router;