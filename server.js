const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Parse incoming JSON data
app.use(bodyParser.json());

// Path to your db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Read products data from db.json
const readData = () => {
  const rawData = fs.readFileSync(dbFilePath);
  return JSON.parse(rawData);
};

// Write data to db.json
const writeData = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Get all products
app.get('/products', (req, res) => {
  const products = readData();
  res.json(products);
});

// Add a new product
app.post('/products', (req, res) => {
  const products = readData();
  const newProduct = req.body;
  products.push(newProduct);
  writeData(products);
  res.json({ message: 'Product added successfully', product: newProduct });
});

// Edit a product
app.put('/products/:id', (req, res) => {
  const products = readData();
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === req.params.id);
  
  if (index !== -1) {
    products[index] = updatedProduct;
    writeData(products);
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const products = readData();
  const updatedProducts = products.filter(p => p.id !== req.params.id);
  
  if (products.length !== updatedProducts.length) {
    writeData(updatedProducts);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
