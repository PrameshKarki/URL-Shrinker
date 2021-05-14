//Import modules
const express = require("express");

//Import controller
const appController=require("../controllers/appController");

//Set router
const router = express.Router();

router.get("/", appController.getIndex);

module.exports = router;