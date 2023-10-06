const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const getStudents = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`SELECT * from student`);
    res.status(200).json({data: rows});
});

const getFeed = asyncHandler(async (req, res) => {
    const student_id = req.UserID;
    const [rows] = await pool.query(
      `SELECT * FROM journal INNER JOIN tagged ON journal.j_id = tagged.J_id where tagged.S_id = ?;`,
      [student_id]
    );
    res.status(200).json({data: rows});
});

const login = asyncHandler(async (req, res) => {
    let body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt); 
    body.password = hash;
    const [rows] = await pool.query(
      `INSERT INTO student (name, email, password)
        SELECT * FROM (SELECT ?, ?, ?) AS tmp
        WHERE NOT EXISTS (
            SELECT email FROM student WHERE email=?
        ) LIMIT 1;`,
        [body.name, body.email, body.password, body.email]
    );
    const [studentId] = await pool.query(`SELECT s_id from student where email=?`,
    [body.email]);

    console.log(studentId[0].s_id);
    const accessToken = jwt.sign(
      { UserID: studentId[0].s_id },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
        mess: "Access Token created",
        token: accessToken
    })
})

module.exports = {getStudents, getFeed, login};