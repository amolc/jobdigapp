const connection = require("../../db/db");
const helper = require("../../helper");
const mysql = require("mysql");

exports.employeeSignUp = async (req, res) => {
  try {
    let { emp_name, emp_email, emp_password, emp_confirmed_password } =
      req.body;
    if (!emp_name || !emp_email || !emp_password || !emp_confirmed_password) {
      return res.status(422).json({
        err: "Please add valid Email or Name or Password or Confirmed password",
        success: true,
      });
    } else if (emp_email) {
      try {
        let sqlSearch = `select * from Employee WHERE emp_email = ?`;
        const search_query = mysql.format(sqlSearch, [emp_email]);
        let findUser = await helper.get(search_query);
        console.log("user finde email : " , findUser);
        if (findUser.length === 0) {
          if (emp_password === emp_confirmed_password) {
            let user = {
              emp_name,
              emp_email,
              emp_password,
              emp_confirmed_password,
            };
            connection.query(
              "INSERT INTO Employee SET ?",
              [user],
              (err, result) => {
                if (err) {
                  return res.status(422).send({
                    msg: err.message,
                    success: true,
                  })

                }
                return res.status(200).json({
                  msg: "User Signup Successfully !!!",
                  userDetails: user,
                  success: true,
                });
                console.log(result);
              }
            );
          } else {
            return res
              .status(422)
              .json({
                msg: "Password & Confirmed Password does not match",
                success: true,
              });
          }
        } else {
          return res.status(200).json({
            msg: "This email is already register. Please register unique email",
            success: true,
          });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Something Went Wrong 🤦‍♂️", success: false });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: "Something Went Wrong 🤦‍♂️", success: false });
  }
};

exports.employeeLogin = async (req, res) => {
  try {
    let { emp_email, emp_password } = req.body;
    console.log(emp_email, emp_password);
    if (!emp_email || !emp_password) {
      return res.json({
        message: "Empty Field Found",
      });
    } else if (emp_email) {
      let sqlSearch = `select * from Employee WHERE emp_email = ?`;
      const search_query = mysql.format(sqlSearch, [emp_email]);
      let findUser = await helper.get(search_query);
      if (findUser[0].emp_password === emp_password) {
        return res.json({
          message: "user has Successfully LoggedIn",
          userDetails: { emp_email, emp_password },
        });
      } else {
        return res.json({
          message: "Invalid Email and Password. User Not Found !!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.markAsCompleted = async (req, res) => {
  const { jobId, status } = req.body;
  if (!jobId || !status)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  try {
    const query = "UPDATE PostJob SET status = ? WHERE id = ?";
    const to = status;
    const where = jobId;
    const result = await helper.update(query, to, where);
    console.log(result);
    res.status(200).send({
      success: true,
      msg: "Updated!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.selectedJob = async (req, res) => {
  const { candidateId, jobId } = req.body;
  if (!candidateId || !jobId)
    return res.status(422).send({
      success: false,
      msg: "required params are missing",
    });
  try {
    const query = "UPDATE PostJob SET candidateId = ? WHERE id = ?";
    const to = candidateId;
    const where = jobId;
    const result = await helper.update(query, to, where);
    console.log(result);
    res.status(200).send({
      success: true,
      msg: "Updated!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
