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

    setTimeout(() => {
        res.writeHead(408, {'Content-Type': 'application/json'})
        res.end('Time Out')
    },3000)

    // GET 방식의 product 모두 조회
    if (req.url === '/api/product' && req.method === 'GET') {
        getProducts(req, res)
    // GET 방식 param 기반의 데이터 조회
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    // POST 방식의 product 모두 추가
    }else if(req.url === '/api/product' && req.method === 'POST'){
        createProduct(req, res)
    // PUT 방식의 기존 product 업데이트
    }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    // 위 url에 맞지않으면 404 에러를 띄움
    } else {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not Found' }))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`))