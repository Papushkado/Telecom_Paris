"use strict";
function sendMessage() {
    var textEdit = document.getElementById("textedit").value;

    if (textEdit.trim() !== "") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("textedit").value = ''; // Clear text field after sending
            }
        };
        xhttp.open("GET", "chat.php?phrase=" + encodeURIComponent(textEdit), true);
        xhttp.send();
    }
}


function loadChat() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayChat(this.responseText);
        }
    };
    xhttp.open("GET", "chatlog.txt", true);
    xhttp.send();
}

function displayChat(chatText) {
    var chatLines = chatText.split('\n').filter(Boolean); // Remove empty lines
    var textaDiv = document.getElementById("texta");

    
    textaDiv.innerHTML = '';
    for (var i = Math.max(0, chatLines.length - 10); i < chatLines.length; i++) {
        var pElement = document.createElement('p');
        pElement.textContent = chatLines[i];
        textaDiv.insertBefore(pElement, textaDiv.firstChild);
    }
}

setInterval(loadChat, 1000);
loadChat();
