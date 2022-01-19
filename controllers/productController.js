const products = require("../models/productModel");
const { getPostData } = require("../utils");

// GET /api/product
async function getProducts(req, res) {
  try {
    const product = await products.findAll();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (err) {
    console.log(err);
  }
}

// GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await products.findById(id);

    if (!product) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
}

// POST /api/product
async function createProduct(req, res) {
  try {
    //  let body = ''

    //  req.on('data', (chunk) => {
    //      body += chunk.toString()
    //  })

    //  req.on('end', async() => {
    //     const {title,description,price} = JSON.parse(body)

    //     const product = {
    //         title,
    //         description,
    //         price
    //     }

    //     const newProduct = await products.create(product)
    //     res.writeHead(201, {'Content-Type' : 'application/json'})
    //     return res.end(JSON.stringify(newProduct))
    // })
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await products.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

// PUT /api/product/:id
async function updateProduct(req, res, id) {
  try {
    const product = await products.findById(id);

    if (!product) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updateProduct = await products.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateProduct));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};
