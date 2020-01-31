const express = require('express');
const router = express.Router();
function users(con) {

  const token = require('../auxiliary/token')(con);

  router.get('/', function (req, res, next) {

    con.query(`SELECT * FROM USERS`, function (err, result, fields) {

      if (err) {
        console.error(err);
        return res.json({ success: false, err });
      }
      return res.json({ success: true, result: result, fields });
    });
  });


  router.post("/user", function (req, res) {


    con.query(`SELECT * FROM USERS WHERE ?`,{mail:req.body.mail}, function (err, result, fields) {

      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      if(result.length === 0){
        con.query("insert into USERS set ?", req.body, function (err) {
          if (err) {
            console.error(err);
            return res.json({ success: false, err });
          }
          return res.json({ success: true, message: "User registered!", err });
        });
      }
      else{
        return res.json({success:false, message:"Unavailable email "});
      }
    });


  });
  
  router.delete("/", function (req, res) {

    con.query("delete from USERS where ?", req.body, function (err) {
      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, message:"User deleted", err});

    });
  });

  router.post("/authenticate", function (req, res) {
    token.getToken(req, res);
  });

  router.get("/checkToken", function (req, res) {
    token.checkToken(req, res);
  });
  return router;
}
module.exports = users;
