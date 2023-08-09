const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()) 

const userController = require('./controllers/userController');
const { adder } = userController;
const { getInventory } = userController;
const { refLookup } = userController;
const { categoryLookup } = userController;



//add inventory
app.post('/api/garmentAdd',adder);

//post all inventory
app.get('/api/inventory', getInventory);

//lookup by reference number
app.get('/api/inventory/:reference', refLookup);

//lookup by characteristics, Queery
app.get('/api/inventory', categoryLookup);







const SERVER_PORT = 5050;
app.listen(SERVER_PORT, () => console.log(`Server jamming on ${SERVER_PORT}`));