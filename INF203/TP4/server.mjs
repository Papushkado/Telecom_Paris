"use strict";

import {createServer} from "http";
import fs from "fs";
import mime from "mime";
import querystring from "querystring";

let visitedUsers = []; 

// handle requests
function webserver( request, response ) {
    try {
    if (request.url == "/end"){
        response.setHeader("Content-Type", "html; charset=utf-8");  
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    }
    else if (request.url.startsWith("/hi?visiteur=")){
        const name = querystring.unescape(request.url).substring(13);
        response.setHeader("Content-Type", "text/html; charset=utf-8");  
        response.end(`<html><body><script>document.write('hi ${name}');</script></body></html>`);
    }
    else if (request.url.startsWith('/root')){
        const filepath = request.url.substring(6);
        if (fs.existsSync(filepath)) {
            response.setHeader("Content-Type", mime.getType(filepath));
            response.end(fs.readFileSync(filepath));
        } else {
            response.statusCode = 404;
            response.end("the file " + filepath + " does not exist on the server");
        }
    } else if (request.url.startsWith("/coucou")) {
        const parsedUrl = new URL("http://localhost:8000" + request.url);
        const userName = parsedUrl.searchParams.get("nom");

        if (userName) {
            const sanitizedUserName = userName.replace(/</g, "_").replace(/>/g, "_");

            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(`<html><body>coucou ${sanitizedUserName}, the following users have already visited this page: ${visitedUsers.join(", ")}</body></html>`);
            visitedUsers.push(sanitizedUserName);
        } else {
            response.statusCode = 400;
            response.end("Bad Request: Please provide a valid user name.");
        }
    } else if (request.url == "/clear") {
        visitedUsers = [];
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<html><body>Cleared the list of visited users.</body></html>");
    } 
    else {
    response.setHeader("Content-Type", "text/html; charset=utf-8");  
    response.end("<!doctype html><html><body>Server works.</body></html>");
    }
} catch (error) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end(`Internal Server Error: ${error.message}`);
}
}

// instanciate server
const server = createServer(webserver);

// server starting
server.listen(process.argv[2], (err) => {}); //Donc on a argv[0]=la commande faite et argv[1]= server.mjs

//server.listen(8000, (err)=> {})