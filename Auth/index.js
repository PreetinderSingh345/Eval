const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = 5000;

const userRouter = require("./src/routers/auth");

dotenv.config({ path: ".env" });

app.use(cors());
app.use(express.json());
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("We have a request at the root route of the auth service");
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
