/*  */
/*  */
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`mongodb://${process.env.SERVER_DB}/${process.env.DATABASE_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("DB is connected Successfully -------------------------");
  })
  .catch((err) => console.error(err));
