"use strict";


function showAddForm() {
    document.getElementById('MAINSHOW').innerHTML = ''; 
    document.getElementById('addForm').style.display = 'block'; 
    document.getElementById('removeForm').style.display = 'none'; 
}

function showRemoveForm() {
    document.getElementById('MAINSHOW').innerHTML = ''; 
    document.getElementById('addForm').style.display = 'none'; 
    document.getElementById('removeForm').style.display = 'block'; 
}

function show(){
    //console.log("cheh");
    fetch('../../Items')
        .then(response => response.json())
        .then(data => {
            document.getElementById('MAINSHOW').innerHTML = JSON.stringify(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function clear2(){
    console.log("je suis arrivé ici");
    fetch('../../clear', { method: 'GET' })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error clearing JSON:', error));
}

function restore() {
    fetch('../../restore', { method: 'POST' })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error restoring JSON:', error));
}

function add() {
    const title = document.getElementById('titleTF').value;
    const value = document.getElementById('valueTF').value;
    const color = document.getElementById('colorTF').value;

    const url = `../../add?title=${encodeURIComponent(title)}&value=${value}&color=${encodeURIComponent(color)}`;

    fetch(url, { method: 'POST' })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error adding element:', error));
}

function remove2() {
    const index = document.getElementById('indexTF').value;

    const url = `../../remove?index=${index}`;

    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error removing element:', error));
}

function showPieChart() {
    fetch(`../../PieCh`, { method: 'GET' })
        .then(response => response.blob())
        .then(blob => blob.text()).then(svg => { 
            //const container = document.createElement('div');
            //container.innerHTML = svgContent;
            //const url = URL.createObjectURL(blob);
            //const img = document.createElement('img');
            //img.src = url;
            document.getElementById('MAINSHOW').innerHTML = svg;
            //document.getElementById('MAINSHOW').appendChild(img);
        })
        .catch(error => console.error('Error fetching SVG:', error));
        //showLocalPieChart();
}

/*function showPieChart() {
    console.log("Checkmate 1");
    fetch(`../../PieCh`, { method: 'GET' })
        .then(response => response.blob())
        .then(blob => {
            console.log("checkmate 2");
            const url = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = url;
            document.getElementById('MAINSHOW').innerHTML = '';
            document.getElementById('MAINSHOW').appendChild(img);
            console.log("checkmate 2bis");
        })
        .catch(error => console.error('Error fetching SVG:', error));
}

function showLocalPieChart() {
    fetch('../../Items')
        .then(response => response.json())
        .then(data => {
            const svg = createLocalPieChart(data);
            document.getElementById('MAINSHOW').innerHTML = svg;
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function createLocalPieChart(data) {

    return '<svg>...</svg>';
}*/

function showLocalPieChart() {
    fetch('../../Items')
        .then(response => response.json())
        .then(data => {
            const svg = createLocalPieChart(data);
            const container = document.createElement('div');
            container.innerHTML = svg;
            document.getElementById('MAINSHOW').innerHTML = '';
            document.getElementById('MAINSHOW').appendChild(container.firstChild);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function createLocalPieChart(data) {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercentage = 0;

    const pieSlices = data.map((item) => {
        const percentage = (item.value / totalValue) * 100;
        const color = item.color || "gray";

        const startAngle = (cumulativePercentage / 100) * 360;
        cumulativePercentage += percentage;
        const endAngle = (cumulativePercentage / 100) * 360;

        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const x = 100; 
        const y = 100; 
        const radius = 100; 

        const pathData = [
            `M ${x} ${y}`, 
            `L ${x + radius * Math.cos(startAngleRad)} ${y + radius * Math.sin(startAngleRad)}`, 
            `A ${radius} ${radius} 0 ${percentage > 50 ? 1 : 0} 1 ${x + radius * Math.cos(endAngleRad)} ${y + radius * Math.sin(endAngleRad)}`, 
            'Z' 
        ];

        return `<path fill="${color}" d="${pathData.join(' ')}" />`;
    });

    const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">${pieSlices.join('')}</svg>`;

    return svg;
}
