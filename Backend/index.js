const express = require("express");

const app = express();
const port = 4000;

const employeeRouter = require("./src/routers/employee");

app.use(express.json());
app.use("/employee", employeeRouter);

app.get("/", (req, res) => {
  res.send("We have a request at the root route of the backend service");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
