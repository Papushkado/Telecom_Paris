"use strict";

import {createServer} from "http";
import fs from "fs";
import mime from "mime";


function createPieChart(data) {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercentage = 0;

    const pieSlices = data.map((item) => {
        const percentage = (item.value / totalValue) * 100;
        const color = item.color || "gray";


        const startAngle = (cumulativePercentage / 100) * 360;
        cumulativePercentage += percentage;
        const endAngle = (cumulativePercentage / 100) * 360;


        const midAngle = (startAngle + endAngle) / 2;


        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;


        const x = 100; 
        const y = 100; 
        const radius = 100; 

        const pathData = [
            `M ${x} ${y}`, 
            `L ${x + radius * Math.cos(startAngleRad)} ${y + radius * Math.sin(startAngleRad)}`, // Draw line to the starting point
            `A ${radius} ${radius} 0 ${percentage > 50 ? 1 : 0} 1 ${x + radius * Math.cos(endAngleRad)} ${y + radius * Math.sin(endAngleRad)}`, // Draw the arc
            'Z' 
        ];

        return `<path fill="${color}" d="${pathData.join(' ')}" />`;
    });

    const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">${pieSlices.join('')}</svg>`;

    return svg;
}

function webserver( request, response ) {
    try {
    if (request.url == "/kill"){
        response.setHeader("Content-Type", "html; charset=utf-8");  
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    }
    else if (request.url.startsWith('/Root')){
        const filepath = request.url.substring(6);
        if (fs.existsSync(filepath)) {
            response.setHeader("Content-Type", mime.getType(filepath));
            response.end(fs.readFileSync(filepath));
        } else {
            response.statusCode = 404;
            response.end("the file " + filepath + " does not exist on the server");
        }
    } 
    else if (request.url == '/Items'){
        response.setHeader("Content-Type", "application/json");
        let u = fs.readFileSync("storage.json", "utf-8");
        //console.log(u);
        response.end(u);
        //response.end(/client/storage.json);
    }
    else if (request.url == "/clear"){
        console.log("je suis arrivé ici");
        fs.writeFileSync("storage.json", JSON.stringify([{ "title": "empty", "color": "red", "value": 1 }]));
        console.log("et là");
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ message: 'ok clear' }));
        return;
    }
    else if (request.url == "/restore"){
        let defaultData = fs.readFileSync("secours.json", "utf-8");
            fs.writeFileSync("storage.json", defaultData);
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ message: 'ok' }));
    }
    else if (request.url.startsWith('/add')) {
        const params = new URLSearchParams(request.url.split('?')[1]);
        const title = params.get('title');
        const value = parseInt(params.get('value'));
        const color = params.get('color');

        let items = JSON.parse(fs.readFileSync("storage.json", "utf-8"));

        items.push({ "title": title, "color": color, "value": value });

        fs.writeFileSync("storage.json", JSON.stringify(items));

        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ message: 'ok add' }));

    } else if (request.url.startsWith('/remove')) {
        const index = parseInt(request.url.split('?')[1].split('=')[1]);
        let items = JSON.parse(fs.readFileSync("storage.json", "utf-8"));
        console.log(items);
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);
            fs.writeFileSync("storage.json", JSON.stringify(items));
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ message: 'ok remove' }));
            
    }
    } else if (request.url == "/PieCh") {
        console.log("checkpoint1");
        const jsonData = fs.readFileSync("storage.json", "utf-8");
        const parsedData = JSON.parse(jsonData);
        const svg = createPieChart(parsedData);
        console.log("checkpoint2");
        response.setHeader("Content-Type", "image/svg+xml");
        response.end(svg);
    }
    else {
        console.log("ici");
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ error: 'Invalid index for removal' }));
        }


} catch (error) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end(`Internal Server Error: ${error.message}`);
}
}



const server = createServer(webserver);

server.listen(process.argv[2], (err) => {}); //Donc on a argv[0]=la commande faite et argv[1]= server.mjs

//server.listen(8000, (err)=> {})