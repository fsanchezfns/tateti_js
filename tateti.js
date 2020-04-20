//Estructuras

var _player1 = {
    "id": 0,
    "name": ""
}

var _player2 = {
    "id": 1,
    "name": ""
}

var _response = {
    "status": "S",
    "msg": ""
}

var _board = [];
_board[0] = [];
_board[1] = [];
_board[2] = [];



function markBoard(fila, colum, mark) {

    value = _board[fila][colum];
    response = checkLibre(value);

    if (response.status == 'S') {

        _board[fila][colum] = mark


    }
    console.log(_board)
}

console.log(_board)


function checkLibre(valor) {
    if (valor == undefined) {
        res = hlResponse("S", "");
    } else {
        res = hlResponse("N", "El casillero esta ocupado");
    }
    return res;
}




function asginarNombres(name1, name2) {
    //console.log(name1 + name2)
    response = validarCampo(name1, name2);

    if (response.status == 'S') {
        _player1.name = name1;
        _player2.name = name2;
    }

}

//comprobaciones 
function validarCampo(name1, name2) {
    if (name1 == "") {
        return hlResponse("N", "El nombre del primer jugador no puede estar vacio");
    }

    if (name2 == "") {
        return hlResponse("N", "El nombre del segundo jugador no puede estar vacio");
    }

    // if ((typeof(name1) != String) || (typeof(name2) != String)) {
    //    return hlResponse("N","Los campos deben ser caracteres");
    //}

    return hlResponse("S", "");
}





function hlResponse(status, msg) {
    _response.status = status;
    _response.msg = msg;

    msgVisor = document.getElementById("msgReponse");

    switch (status) {

        case "N":
            msgVisor.className = "msgError"
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        case "S":
            msgVisor.className = "msgOk"
            msgVisor.style.display = "block";
            msgVisor.innerHTML = "ok";
            break;

        default:
            msgVisor.style.display = "none"; //S
    }

    return _response;
}