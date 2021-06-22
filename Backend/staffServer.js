const express = require("express");

const cors = require("cors");
const port = 8081;
const staff= express();


staff.use(express.json());
staff.use(express.urlencoded({ extended: false }));
staff.use(cors());

const Staff = require("./staff/routes/staff");

staff.use("/staff", Staff);

staff.listen(port, function () {
	console.log("Staff server running on localhost:" + port);
});

  