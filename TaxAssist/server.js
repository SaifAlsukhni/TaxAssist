const http = require('http')
const fs = require('fs')
const mime = require('mime-types')

const routeMap = {
    '/': './public/views/index.html',
    '/about': './public/views/about.html'
}

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let route = routeMap[request.url]
    if(!route)
        route = '.' + request.url

    if (fs.existsSync(route)) {
        fs.readFile(route, function (error, content) {
            if (error) {
                response.writeHead(500)
                response.end()
            } else {
                let contentType = mime.lookup(route)
                response.writeHead(200, {'Content-Type': contentType})
                response.end(content, 'utf-8')
            }

        })
    } else {
        response.writeHead(404)
        response.end('404: Page Not Found')
    }
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')