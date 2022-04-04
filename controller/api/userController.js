const connection = require('../../db/db')

exports.CreateCandidiate = (req ,res)=>{
connection.query('INSERT INTO Candidate SET ?', [req.body], (err, result) => {
  if (err) throw err;

  res.status(201).send(`User added with ID: ${req.body.id}`);
});
} 

exports.findUser = (req, res) => {
    connection.query(`select * from Candidate WHERE ID = ?`,[req.params.id],(err,result,fields)=>{
      if(err){
        throw err;
      }
      res.send(result);
    })
}
exports.getAllData = (req, res) => {
  connection.query(`select id,name,img,description,job from Candidate `,(err,result,fields)=>{
    if(err){
      return console.log(err);
    }
    res.send(result);
  })
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
  
    connection.query('UPDATE Candidate SET job = ? WHERE id = ?', [req.body.job, id], (error, result) => {
        if (error) throw error;
  
        res.send('User updated successfully.');
    });
}
exports.deleteUser = (req, res) => {
  
    connection.query('DELETE FROM Candidate WHERE ID = ?', [req.params.id], (err, result,fields) => {
        if (err){ throw err;}
  
        res.send('User deleted.');
    });
    
}