const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const getFeed = asyncHandler(async (req, res) => {
  const UserID = req.UserID;
  console.log(UserID);
  const [rows] = await pool.query(
    `SELECT * FROM journal where published_by = ?;`,
    [UserID]
  );
  res.status(200).json({ data: rows });
});

const login = asyncHandler(async (req, res) => {
  let body = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;
  const [rows] = await pool.query(
    `INSERT INTO teacher (name, email, password)
        SELECT * FROM (SELECT ?, ?, ?) AS tmp
        WHERE NOT EXISTS (
            SELECT email FROM teacher WHERE email=?
        ) LIMIT 1;`,
    [body.name, body.email, body.password, body.email]
  );
  const [teacherId] = await pool.query(
    `SELECT t_id from teacher where email=?`,
    [body.email]
  );

  console.log(teacherId[0].t_id);
  const accessToken = jwt.sign(
    { UserID: teacherId[0].t_id },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  res.status(200).json({
    mess: "Access Token created",
    token: accessToken,
  });
});

const createJournal = asyncHandler(async (req, res) => {
  const UserID = req.UserID;
  let body = req.body;
  const [rows] = await pool.query(
    `INSERT INTO journal (title, contents, published_by) values(?, ?, ?)`,
    [body.title, body.contents, UserID]
  );
  
  res.status(200).json({
    mess: "Journal created",
    data : rows
  });
});

const updateJournal = asyncHandler(async(req, res) => {
  const journalID = req.params.id;
  const [rows] = await pool.query(
    `UPDATE journal
      SET title = ?, contents = ?
      WHERE j_id = ?;`,
      [req.body.title, req.body.contents, journalID]
  );

  const getUpdated = await pool.query(
    `SELECT * from journal where j_id = ?`,
    [journalID]
  );
    res.status(200).json({
      mess: "Journal updated",
      data: getUpdated[0],
    });
  
});

const deleteJournal = asyncHandler(async (req, res) => {
  const journalID = req.params.id;
  const [rows] = await pool.query(`DELETE FROM journal WHERE j_id = ?;`, [journalID]);

  // const delfromtagged = await pool.query(`DELETE from journal where J_id = ?`, [
  //   journalID,
  // ]);
  // no need, as applied on cascase delete to the foreign key.
  res.status(200).json({
    mess: "Journal deleted",
  });
});

const tagStudent = asyncHandler(async (req, res) => {
  const journalID = req.params.id;
  const [rows] = await pool.query(
    `INSERT INTO tagged (J_id, S_id) values(?, ?)`,
    [journalID, req.body.S_id]
  );

  res.status(200).json({
    mess: "Student tagged",
    data: rows,
  });
});


module.exports = { getFeed, login, createJournal, updateJournal, deleteJournal, tagStudent};
