const express = require("express");
const app = express()
app.use(express.json())
app.use(express.static("public"))
app.listen((1516), () =>
    console.log("server started successfully"))
const studentRouter = require("./student")
app.use("/students", studentRouter)
