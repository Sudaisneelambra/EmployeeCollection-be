/**requiring dependencies,laibraries */
require("dotenv").config();
const experss = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

/**requiring from .env */
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

/**routes requiring */
const adminRoutes = require('./routes/adminRoutes')
const commonRoutes = require('./routes/commonRoutes')

const app = experss();
app.use(cors())
app.use(experss.json())

/**routes */
app.use('/admin',adminRoutes)
app.use('/login',commonRoutes)

/**database connection */
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed");
    console.log(err);
  });
