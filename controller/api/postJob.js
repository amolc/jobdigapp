const connection = require('../../db/db');

exports.postJob = (req,res) =>{
    console.log(req.body);
    if(!req.body) return res.send("missing params")
    connection.query('INSERT INTO PostJob SET ?', [req.body], (err, result) => {
        if (err) throw err;
        res.status(201).send(`User added `);
    });
}
exports.getallPostJob=(req, res) => {
    connection.query(`select * from PostJob `,(err,result,fields)=>{
      if(err){
        return console.log(err);
      }
      res.send(result);
    })
}