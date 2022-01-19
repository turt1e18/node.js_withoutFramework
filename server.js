const http = require('http') // 기본적인 http 모듈 추가
const { getProducts, getProduct, createProduct, updateProduct } = require('./controllers/productController')
// const products = require('./data/products')

const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello World</h1>')
    // res.end()

    // res.writeHead(200,{ 'content-type':'application/json' })
    // res.end(JSON.stringify(products))

    // if (req.url === '/api/products' && req.method === 'GET') {
    //     res.writeHead(200, { 'content-type': 'application/json' })
    //     res.end(JSON.stringify(products))

    // } else {
    //     res.writeHead(404, { 'content-type': 'application/json' })
    //     res.end(JSON.stringify({message: 'Not Found'}))
    // }

    if (req.url === '/api/product' && req.method === 'GET') {
        getProducts(req, res)
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }else if(req.url === '/api/product' && req.method === 'POST'){
        createProduct(req, res)
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not Found' }))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`))