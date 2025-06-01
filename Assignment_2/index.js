const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    const filePath = path.join(__dirname, 'files', query.name || '');

    // Create a file
    if (pathname === '/create' && req.method === 'GET') {
        if (!query.name || !query.content) {
            res.writeHead(400);
            res.end('Please provide file name and content');
            return;
        }
        fs.writeFile(filePath, query.content, (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error creating file');
            } else {
                res.writeHead(200);
                res.end(`File ${query.name} created successfully`);
            }
        });
    }

    // Read a file
    else if (pathname === '/read' && req.method === 'GET') {
        if (!query.name) {
            res.writeHead(400);
            res.end('Please provide file name');
            return;
        }
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    // Delete a file
    else if (pathname === '/delete' && req.method === 'GET') {
        if (!query.name) {
            res.writeHead(400);
            res.end('Please provide file name');
            return;
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found or cannot be deleted');
            } else {
                res.writeHead(200);
                res.end(`File ${query.name} deleted successfully`);
            }
        });
    }

    // Invalid route
    else {
        res.writeHead(404);
        res.end('Invalid endpoint');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
