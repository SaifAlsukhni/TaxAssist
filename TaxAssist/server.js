const http = require('http')
const fs = require('fs')
const path = require('path')

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'

    // Checks for the filePath extension and creates a variable for the Content type
    let extname = String(path.extname(filePath))
    let fileType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/js',
        '.png': 'image/png'
    }
    let contentType = fileType[extname]

    // If-statement that checks for the file existing
    if (fs.existsSync('./public/views/index.html')) {
        fs.readFile(filePath, function (error, content) {
            if (error) {
                response.writeHead(500)
                response.end()
            } else {
                response.writeHead(200, {'Content-Type': contentType})
                response.end(content, 'utf-8')
            }

        })
    } else {
        response.writeHead(404)
        response.end()
    }
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')