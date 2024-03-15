const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config();

/*MongoDB Connection*/
const PORT = process.env.PORT || 80;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`App Is Running At ${PORT}`);
  });
});
