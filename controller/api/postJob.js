const connection = require("../../db/db");
const helper = require("../../helper");
const mysql = require("mysql");

exports.postJob = (req, res) => {
  req.body.employeeId = 1
  console.log(req.body)
  if (!req.body) return res.send("missing params");
  connection.query("INSERT INTO PostJob SET ?", [req.body], (err, result) => {
    if (err) {
      console.log(
        err
      )
      return res.status(200).send({
        success: false,
        msg: err.message
      })
    }
   return res.status(200).json({
     msg:"Post added success",
     employeeId:req.body.employeeId,
     success:true

   });
  });
};
exports.getallPostJob = (req, res) => {
  connection.query(`select * from PostJob `, (err, result, fields) => {
    if (err) {
      return res.statu(500).json({
        message:"something Went Wrong",
        success: false
      })
    }
    else{
      return res.status(200).json(
        {
          success:true,
          result
        }
      )
    }
  });
};
// hamza Dev -> 7/4/2022
exports.getAllJobs = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId) {
      return res.status(422).json({
        message: "Empty Filed found",
        error: error.message,
        success: false,
      });
    } else {
      let sqlSearch = `select * from PostJob WHERE employeeId = ? `;
      const search_query = mysql.format(sqlSearch, [employeeId]);
      let Jobs = await helper.get(search_query);
      console.log(Jobs.length);
      if (Jobs.length === 0) {
        return res.status(200).json({
          message: "Jobs not Exist",
          success: true,
        });
      } else {
        return res.json({
          message: "All Jobs",
          Jobs: Jobs,
          success:true
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went Wrong 🤦‍♂️ ",
      error: error.message,
      success: false,
    });
    console.log(error);
  }
};
exports.updateJob = async (req, res) => {
  try {
    const { id, event_name, Timing, status, Hourly_pay } = req.body;

    if (!id || !event_name || !Timing || !status || !Hourly_pay) {
      return res.status(422).send({
        success: false,
        msg: "required params are missing",
      });
    } else {
      connection.query(
        "UPDATE `PostJob` SET `event_name`=?,`Timing`=?,`status`=? ,`Hourly_pay`=? where `id`=?",
        [event_name, Timing, status, Hourly_pay, id],
        function (error, results, fields) {
          if (error) throw error;
          console.log();
          if (results.affectedRows === 0) {
            res.status(200).send({
              success: true,
              msg: "Id Not foud && Not Updated! ",
            });
          } else {
            res.status(200).send({
              success: true,
              msg: "Record Update Successfully! ",
            });
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went Wrong 🤦‍♂️ ",
      error: error.message,
      success: false,
    });
    console.log(error);
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Id not Found",
        error: error.message,
        success: false,
      });
    } else {
      connection.query(
        "DELETE FROM `PostJob` WHERE `id`=?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          console.log(results.affectedRows);
          if (results.affectedRows === 0) {
            return res.status(200).json({
              message: "Id not found",
              success: true,
            });
          } else {
            return res.status(200).json({
              message: "Job Deleted Successfuly 👍",
              success: true,
            });
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went Wrong 🤦‍♂️ ",
      error: error.message,
      success: false,
    });
    console.log(error);
  }
};
