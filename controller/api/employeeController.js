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
      });
    } else if (emp_email) {
      try {
        let sqlSearch = `select * from Employee WHERE emp_email = ?`;
        const search_query = mysql.format(sqlSearch, [emp_email]);
        let findUser = await helper.get(search_query);
        console.log( "user finde email : "+ findUser)
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
                if (err) throw err;
                return res.status(200).json({
                  msg: "User Signup Successfully !!!",
                  userDetails: user,
                });
                console.log(result);
              }
            );
          } else {
            return res
              .status(422)
              .json({ msg: "Password & Confirmed Password does not match" });
          }
        } else {
          return res.status(422).json({
            err: "This email is already register. Please register unique email",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Something Went Wrong 🤦‍♂️" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Something Went Wrong 🤦‍♂️" });
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
      if (findUser[0].emp_password === emp_password ) {
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
