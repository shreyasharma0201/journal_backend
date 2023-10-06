const {getStudents, getFeed, login} = require("../controllers/studentControllers");
const studentAuth = require("../middleware/studentAuth");

const router = require("express").Router();

router.get("/students", studentAuth, getStudents);
router.get("/getFeed", studentAuth, getFeed);
router.post("/login", login);

module.exports = router;
