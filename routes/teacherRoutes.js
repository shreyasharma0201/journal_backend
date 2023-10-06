const {login, getFeed, createJournal, updateJournal, deleteJournal, tagStudent} = require("../controllers/teacherControllers");
const router = require("express").Router();
const teacherAuth = require("../middleware/teacherAuth");

router.post("/login", login);
router.post("/add-journal", teacherAuth, createJournal);
router.get("/Feed", teacherAuth, getFeed);
router.post("/tag-student/:id", teacherAuth, tagStudent);
router.put("/Feed/:id", teacherAuth, updateJournal);
router.delete("/Feed/:id", teacherAuth, deleteJournal);

module.exports = router;