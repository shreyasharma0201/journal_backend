const express = require("express");
const app = express();
require("dotenv").config();
const teacherRouter = require("./routes/teacherRoutes");
const studentRouter = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
app.use(express.json());
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

app.listen(process.env.PORT, ()=>{
    console.log("server is running", process.env.PORT);
})
