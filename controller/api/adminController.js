const connection = require('../../db/db');
exports.getallAdmin=(req, res) => {
    connection.query(`select * from Admin `,(err,result,fields)=>{
      if(err){
        return console.log(err);
      }
      res.send(result);
    })
}

exports.addAdmin = (req, res) => {
    connection.query('INSERT INTO Admin SET ?', [req.body], (err, result) => {
      if (err) throw err;
      res.status(201).send(`User added : ${req.body.id}`);
  });
}

exports.findAdmin = (req, res) => {
    connection.query(`select * from Admin WHERE ID = ?`,[req.params.id],(err,result,fields)=>{
      if(err){
        throw err;
      }
      res.send(result);
    })
}

exports.deleteAdmin = (req, res) => {
  
    connection.query('DELETE FROM Admin WHERE ID = ?', [req.params.id], (err, result,fields) => {
        if (err){ throw err;}
  
        res.send('User deleted.');
    });
}

exports.updateAdmin = (req, res) => {
    const id = req.params.id;
  
    connection.query('UPDATE Admin SET username = ? WHERE id = ?', [req.body.username, id], (error, result) => {
        if (error) throw error;
  
        res.send('User updated successfully.');
    });
}