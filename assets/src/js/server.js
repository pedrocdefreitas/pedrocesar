const http = require('http') 
const port = 3000 
const ip = 'localhost'


const server = http.createServer((req, res) => { 
    console.log('Recebendo uma request!') 
    res.end('Aqui fica o que vamos enviar para o navegador como resposta!')})

server.listen(port, ip, () => { 
    console.log(`Servidor rodando em http://${ip}:${port}`) 
    // console.log('Para derrubar o servidor: ctrl + c'); })
})