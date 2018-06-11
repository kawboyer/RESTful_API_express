const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Connection config
const mc = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'outline_db'
});

// Connect to database
mc.connect();

// Default route
app.get('/', function(req, res) {
  return res.send({ error: true, message: 'hello' })
});

// Retrieve all nodes
app.get('/nodes', function (req, res) {
  mc.query('SELECT * FROM nodes', function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Nodes list' });
  });
});

// Add a new node
app.post('/node', function(req, res) {
  let node_name = req.body.node_name;

  if(!node_name) {
    return res.status(400).send({ error: true, message: 'Plesse provide node name' });
  }

  mc.query('INSERT INTO nodes SET ?', { node_name: node_name }, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New node has been created succesfully!' });
  });
});

// Delete node
app.delete('/node', function(req, res) {
  let id = req.body.id;

  if(!id) {
    return res.status(400).send({ error: true, message: 'Plesase provide id' });
  }
  mc.query('DELETE FROM nodes WHERE id = ?', [id], function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Node has been updated succesfully.' });
  });
});


// Port set to 8082 for incoming http requests
app.listen(8082, function() {
  console.log('Node app is running on port 8082');
});