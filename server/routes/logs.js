const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/api/logs', (req, res) => {
  const { pipeline_name, status } = req.body;
  db.run(
    `INSERT INTO pipeline_logs (pipeline_name, status) VALUES (?, ?)`,
    [pipeline_name, status],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;
