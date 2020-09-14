const http = require('http')
const fs = require('fs')
const path = require('path')

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'

    fs.readFile(filePath, function (error, content) {
       if (error) {
            response.writeHead(404)
            response.end()
        } else {
            response.writeHead(200, {'Content-Type': 'text/html' })
            response.end(content, 'utf-8')
        }

    })
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')