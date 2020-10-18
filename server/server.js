const http = require('http');
const app = require('./app');

// Creating the server
const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port);

server.once('listening', () => {
    console.log(`The server is listening at http://localhost:${port}`);
});