//Estructuras
var _player1 = {
    "id": 1,
    "name": ""
}

var _player2 = {
    "id": 2,
    "name": ""
}

var _response = {
    "status": "S",
    "msg": ""
}

//inicializo todos con el valor 0 como valor vacio
var _board = [];
_board[0] = [0, 0, 0];
_board[1] = [0, 0, 0];
_board[2] = [0, 0, 0];

var _player = _player2
var isWin = false;



function markBoard(fila, colum) {
    if (isWin == false) { //si no hay ganador evaluo toda la logica

        value = _board[fila][colum];
        response = checkLibre(value); //verifico si el casillero esta libre

        if (response.status == 'S') {
            indexString = fila.toString() + colum.toString(); //recupero el id de html
            indexBoard = document.getElementById(indexString);
            _board[fila][colum] = _player.id; //asigno el casillero al player
            playerAux = _player //guardo el player para verificar el ganador

            switch (_player) { //logica para asignar el otro jugador y para el css
                case _player1:
                    indexBoard.className = "tdBoardOne";
                    _player = _player2;
                    break;

                case _player2:
                    indexBoard.className = "tdBoardTwo";
                    _player = _player1;
                    break;
            }

            isWin = checkWin(_board) //verifco ganador

            if (isWin) {
                hlResponse('F', 'gano el jugador ' + playerAux.name)
            } else {
                hlResponse("M", 'Le toca jugar a ' + _player.name);
            }

        }
    }
}


function checkLibre(valor) { //Verifico si el casillero esta libre
    if (valor == 0) {
        res = hlResponse("S", "");
    } else {
        res = hlResponse("N", "El casillero esta ocupado");
    }
    return res;
}

function assignName(name1, name2) {
    response = checkName(name1, name2);
    if (response.status == 'S') {
        _player1.name = name1;
        _player2.name = name2;
    }

}


function checkName(name1, name2) {
    if (name1 == "") {
        return hlResponse("N", "El nombre del primer jugador no puede estar vacio");
    }

    if (name2 == "") {
        return hlResponse("N", "El nombre del segundo jugador no puede estar vacio");
    }

    if (name1 == name2) {
        return hlResponse("N", "Los nombres deben ser diferentes");
    }

    return hlResponse("S", "");
}

function checkWin(board) {
    //horizontales
    if (board[0][0] != 0 && board[0][0] == board[0][1] && board[0][1] == board[0][2]) return true;
    if (board[1][0] != 0 && board[1][0] == board[1][1] && board[1][1] == board[1][2]) return true;
    if (board[2][0] != 0 && board[2][0] == board[2][1] && board[2][1] == board[2][2]) return true;

    //verticales
    if (board[0][0] != 0 && board[0][0] == board[1][0] && board[1][0] == board[2][0]) return true;
    if (board[0][1] != 0 && board[0][1] == board[1][1] && board[1][1] == board[2][1]) return true;
    if (board[0][2] != 0 && board[0][2] == board[1][2] && board[1][2] == board[2][2]) return true;

    //diagonales
    if (board[0][0] != 0 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) return true;
    if (board[2][0] != 0 && board[2][0] == board[1][1] && board[1][1] == board[0][2]) return true;

    return false;
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

        case "M":
            msgVisor.className = "msgInfo"
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        case "F":
            msgVisor.className = "msgOk"
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        default:
            msgVisor.style.display = "none"; //S
    }

    return _response;
}