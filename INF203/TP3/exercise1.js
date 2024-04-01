"use strict";

/*
let xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onload = function'){

};
xhr.send();
*/
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("texta").value = this.responseText;
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}

function loadDoc2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            insertTextWithColors(this.responseText);
        }
    };
    xhttp.open("GET", "text.txt", true);
    xhttp.send();
}

function insertTextWithColors(text) {
    var lines = text.split('\n');
    var colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown', 'teal', 'maroon', 'navy', 'olive'];

    var texta2Div = document.getElementById("texta2");
    texta2Div.innerHTML = ''; 

    lines.forEach(function(line, index) {
        var pElement = document.createElement('p');
        pElement.textContent = line;
        pElement.style.color = colors[index % colors.length];
        texta2Div.appendChild(pElement);
    });
}
