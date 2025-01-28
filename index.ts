import * as http from 'node:http'

const app = http.createServer((request, response) => {
    response.end(JSON.stringify('Hello world'))
})

app.listen(3003)
console.log(`Server start on port:${3003}`)