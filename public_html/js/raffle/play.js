window.addEventListener("load", function() {
    loadNumbers();
    numbersRefresh();
});
document.oncontextmenu = function() { return false }
var up = document.getElementById("upbutton");
up.addEventListener("mousedown", sustainedClick.bind(null, upraffle));
up.addEventListener("mouseup", stopClick);
up.addEventListener("touchend", stopClick);
up.addEventListener("mouseout", stopClick);
var down = document.getElementById("downbutton");
down.addEventListener("mousedown", sustainedClick.bind(null, downraffle));
down.addEventListener("mouseup", stopClick);
down.addEventListener("touchend", stopClick);
down.addEventListener("mouseout", stopClick);
document.getElementById("playbutton").addEventListener("click", form);
var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var num3 = document.getElementById('num3');
var num4 = document.getElementById('num4');
var num5 = document.getElementById('num5');
var form = document.getElementById('raffle_form');
var messageText = document.getElementById("numtext");
form.addEventListener("submit", createSend);
var loop;
var numbers;
const URL_API = 'https://asistenciasolidaria.000webhostapp.com/api/';

number('98');

function number(num) {
    num1.innerHTML = num;
    num2.innerHTML = minten(substr(oneplus(num1.innerHTML)));
    num3.innerHTML = minten(substr(oneplus(num2.innerHTML)));
    num4.innerHTML = minten(substr(oneplus(num3.innerHTML)));
    num5.innerHTML = minten(substr(oneplus(num4.innerHTML)));
}

function stopClick() {
    clearInterval(loop);
}

function sustainedClick(functions) {
    functions();
    loop = setInterval(functions, 200);
}

function upraffle() {
    let num = parseInt(num1.innerHTML) + 1;
    number(minten(substr(num)));
    collate();
}

function downraffle() {
    let num
    if (num1.innerHTML == '00') {
        num = '99'
    } else {
        num = parseInt(num1.innerHTML) - 1;
    }
    number(minten(substr(num)));
    collate();
}

function oneplus(num) {
    return parseInt(num) + 1;
}

function substr(substr) {
    substr = substr.toString();
    if (substr.length > 2) {
        substr = substr.substring(1, 3);
    }
    return substr;
}

function minten(num) {
    num = parseInt(num);
    if (num < 10) {
        num = '0' + num.toString();
    }
    return num;
}

function form() {
    loadNumbers();
    let num = document.getElementById("selected");
    num.setAttribute("value", num3.innerHTML);
    messageText.innerHTML = 'Numero Seleccionado';
    messageText.style.color = "#FFF";
}

function numbersRefresh() {
    loop = setInterval(loadNumbers, 3000);
}

function loadNumbers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            numbers = JSON.parse(this.responseText);
            collate();
        }
    };
    xhttp.open("GET", URL_API + "getnumbers", true);
    xhttp.send();
}

function collate() {
    for (let i = 1; i <= 5; i++) {
        let status = document.getElementById('status');
        let num = document.getElementById('num' + i);
        for (n of numbers) {
            if (parseInt(num.innerHTML) == n.number) {
                num.style.backgroundColor = "#F00";
                break;
            } else {
                num.style.backgroundColor = "rgb(46, 189, 17)";
            }
            if (num3.style.backgroundColor == 'rgb(46, 189, 17)') {
                status.innerHTML = 'Jugar con este Número';
                status.style.color = 'rgb(24, 141, 0)';

            } else {
                status.innerHTML = 'Lo Siento El Número Ya Esta Jugando';
                status.style.color = '#F00';
            }
        }
    }
}

function sendData() {
    let formData = new FormData(form);
    let object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);
}

function createSend() {
    let alertStatus = document.getElementById('alertStatus');
    let formData = new FormData(form);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            if (json.registered) {
                messageText.style.color = "rgb(9, 255, 0)";
                messageText.innerHTML = '<strong>Registro Aceptado. Gracias Por Participar</strong>';
                alertStatus.innerHTML = 'Registro Aceptado. Gracias Por Participar';
                alertStatus.style.color = 'rgb(46, 189, 17)';
                location.href = '#alert';
            } else {
                messageText.style.color = "#F00";
                messageText.innerHTML = ' <strong>Falló Registro. Número No Disponible</strong>';
                alertStatus.innerHTML = 'Falló Registro. Número No Disponible';
                alertStatus.style.color = '#F00';
                location.href = '#alert';
            }
            loadNumbers();
        }
    };
    xhttp.open("POST", URL_API + "selected_number", false);
    xhttp.send(formData);
}