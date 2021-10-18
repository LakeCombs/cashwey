require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3455;
const UserRoute = require("./routes/UserRoute");
const TransactionRoute = require("./routes/TransactionRoute");
const connectDB = require("./config/mongodb");

connectDB();
app.get("/", (req, res) => {
  res.send("hello lake i am ready to ride");
});

app.use(express.json());
app.use(cors);
app.use("/api/user", UserRoute);
app.use("/api/transaction", TransactionRoute);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
