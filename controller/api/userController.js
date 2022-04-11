const connection = require("../../db/db");
const helper = require("../../helper");
const mysql = require("mysql");

exports.CreateCandidiate = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  connection.query("INSERT INTO Candidate SET ?", [req.body], (err, result) => {
    if (err) throw err;

    res.status(201).send({
      success: true,
      user: result,
      msg: "user added",
    });
  });
};
exports.signInCandidate = (req, res) => {
  const { email, password } = req.params;
  if (!email)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  connection.query(
    `select * from Candidate WHERE email = ? AND password = ?`,
    [email, password],
    (err, result, fields) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err: err,
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "User SignIn Successfully",
          success: true,
          result,
        });
      }
    }
  );
};

exports.findUser = (req, res) => {
  const id = req.params;
  if (!id)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  connection.query(
    `select * from Candidate WHERE ID = ?`,
    [req.params.id],
    (err, result, fields) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err: err,
          success: false,
        });
      } else {
        return res.status(200).json({
          success: true,
          result,
        });
      }
    }
  );
};
exports.getAllData = (req, res) => {
  connection.query(
    `select id,name,img,description,job from Candidate `,
    (err, result, fields) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err: err,
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "User SignIn Successfully",
          success: true,
          result,
        });
      }
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id;

  connection.query(
    "UPDATE Candidate SET job = ? WHERE id = ?",
    [req.body.job, id],
    (error, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err: err,
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "User Update Successfully",
          success: true,
          result,
        });
      }
    }
  );
};
exports.deleteUser = (req, res) => {
  connection.query(
    "DELETE FROM Candidate WHERE ID = ?",
    [req.params.id],
    (err, result, fields) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
          err: err,
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "User Delete Successfully",
          success: true,
          result,
        });
      }
    }
  );
};

exports.applyToJob = async (req, res) => {
  const { employeeId, candidateId, jobId } = req.body;
  if (!employeeId || !candidateId || !jobId)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  try {
    const query = "INSERT INTO job_applied SET ?";
    const data = {
      employeeId,
      candidateId,
      jobId,
    };
    const result = await helper.save(query, data);
    res.status(201).send({ success: true, msg: "Applied to the job!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, msg: "something went wrong! 🤦‍♂️" });
  }
};
