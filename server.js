// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// Retrieve nodes
app.get('/nodes', function (req, res) {
  mc.query('SELECT * FROM nodes', function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Nodes list' });
  });
});

// Retrieve node with id 
app.get('/node/:id', function(req, res) {
  let id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: true, message: 'Please provide id' });
  }
  mc.query('SELECT * FROM nodes WHERE id = ?', id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'Nodes list' });
  });
});

// Add a new node
app.post('/nodes', function(req, res) {
  let node_name = req.body.node_name;

  if(!node_name) {
    return res.status(400).send({ error: true, message: 'Please provide node name' });
  }
  mc.query('INSERT INTO nodes SET ?', { node_name: node_name }, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New node has been created succesfully!' });
  });
});

// Update node
app.put('/node', function(req, res) {
  let id = req.body.id;
  let node_name = req.body.node_name;

  if ( !id || !node_name) {
    return res.status(400).send({ error: node_name, message: 'Please provide node name and id'});
  }
  mc.query('UPDATE nodes SET node_name = ? id = ?', [node_name, id], function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Task has been updated succesfully' });
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

// Port set to 8080 for incoming http requests
app.listen(8080, function() {
  console.log('Listening on port 8080');
});