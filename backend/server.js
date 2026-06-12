const path = require("path");
const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const stationRoutes = require("./routes/stationRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(

    "/uploads",

    express.static(

        path.join(__dirname, "uploads")

    )

);

app.use("/api/auth", authRoutes);

app.use("/api/stations", stationRoutes);

app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "E-Fill Backend Running"

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(

        `Server Started On Port ${PORT}`

    );

});