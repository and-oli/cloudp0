const express = require('express');
const router = express.Router();

function users(con) {


  router.get('/', function (req, res, next) {
    
    con.query(`SELECT * FROM EVENTS WHERE ?`,req.query, function (err, result, fields) {

      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, result});
    });
  });

  router.get('/event', function (req, res, next) {
    
    con.query(`SELECT * FROM EVENTS WHERE ?`,req.query, function (err, result, fields) {

      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, result});
    });
  });

  router.post("/", function (req, res) {

    con.query("insert into EVENTS set ?", req.body, function (err) {
      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, message:"Event registered!", err});

    });
  });

  router.delete("/", function (req, res) {

    con.query("delete from EVENTS where ?", req.query, function (err) {
      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, message:"Event deleted", err});

    });
  });

  
  router.put("/", function (req, res) {
    
    con.query("update EVENTS set ? where ?", [req.body, req.query], function (err) {
      if (err) {
        console.error(err);
        return res.json({success:false, err});
      }
      return res.json({success:true, message:"Event updated", err});

    });
  });
  return router;
}

module.exports = users;
