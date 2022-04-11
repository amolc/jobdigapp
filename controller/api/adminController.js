const connection = require('../../db/db');
exports.getallAdmin=(req, res) => {
    connection.query(`select * from Admin `,(err,result,fields)=>{
      if(err){
        return res.status(500).json(
          {
            message: "Something went Wrong",
            success:false,
          }
        );
      }
      else{
        res.status(200).json(
          {
            result,
            success:true
          }
        )
      }
    });
}

exports.addAdmin = (req, res) => {
    connection.query('INSERT INTO Admin SET ?', [req.body], (err, result) => {
      if (err) {
        res.status(500).json({
          message:"Something went Wrong ",
          err:err,
        })
      }
      else{
        return res.status(200).json(
          {
            message:"User Add Successfully",
            success:true,
            id : req.body.id
          }
        )
      }
  });
}

exports.findAdmin = (req, res) => {
    connection.query(`select * from Admin WHERE ID = ?`,[req.params.id],(err,result,fields)=>{
      if(err){
        return res.status(500).json({
          message: "something Went Wrong",
          success:false
        })
        throw err;  
      }
      else{
        return res.status(200).json({
          success:true,
          result
        })
      }
    })
}

exports.deleteAdmin = (req, res) => {
    connection.query('DELETE FROM Admin WHERE ID = ?', [req.params.id], (err, result,fields) => {
        if (err){ throw err;}

        if(!err){
          return res.status(200).json(
            {
              message:"User delelete Successfully",
              success:true
            }
          )
        };
    });
}

exports.updateAdmin = (req, res) => {
    const id = req.params.id;
  
    connection.query('UPDATE Admin SET username = ? WHERE id = ?', [req.body.username, id], (error, result) => {
        if (error) throw error;
        if(!err){
          return res.status(200).json(
            {
              message:"User update Successfully",
              success:true
            }
          )
        };
    });
}