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

var _board = [];
var _player;
var isWin;
var isPlay;

function init() {

    _board[0] = [0, 0, 0];
    _board[1] = [0, 0, 0];
    _board[2] = [0, 0, 0];

    isWin = false;
    isPlay = false;

    hlResponse("S", "");

    //view
    document.getElementById("name1").readOnly = false;
    document.getElementById("name2").readOnly = false;
    document.getElementById("btnreset").style.display = "none";
    document.getElementById("btnplay").style.display = "block";

    //inicializador DE TD 
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            id = i + '' + j
            document.getElementById(id).className = "tdBoard";
        }

    }


}


function play(name1, name2) {
    isOk = assignName(name1, name2);

    if (isOk) {
        hlResponse('S', "");
        isPlay = true;
        randomPlayer();

        //view
        document.getElementById("name1").readOnly = true;
        document.getElementById("name2").readOnly = true;
        document.getElementById("btnplay").style.display = "none";


    }
}


function markBoard(fila, colum) {
    if (isWin == false && isPlay == true) { //si no hay ganador y se esta jugando evaluo toda la logica

        value = _board[fila][colum];
        isLibre = checkLibre(value); //verifico si el casillero esta libre

        if (isLibre == true) {
            indexString = fila.toString() + colum.toString(); //recupero el id de html
            indexBoard = document.getElementById(indexString);
            _board[fila][colum] = _player.id; //asigno el casillero al player
            playerAux = _player; //guardo el player para verificar el ganador

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
                hlResponse(playerAux.id, '¡HAS GANADO ' + playerAux.name + '!');
                document.getElementById("btnreset").style.display = "block";


            } else {

                isEnd = checkEnd(_board);

                if (isEnd) {
                    hlResponse("N", "FIN DEL JUEGO");
                    isPlay = false;
                    document.getElementById("btnreset").style.display = "block";

                } else {

                    hlResponse(_player.id, "JUEGA " + _player.name);
                }
            }

        }
    }
}


function randomPlayer() { //seleciono random el jugador
    n = Math.random();
    if (n > 0.5) {
        _player = _player1;
    } else {
        _player = _player2;
    }
    hlResponse(_player.id, "JUEGA " + _player.name);
}




function assignName(name1, name2) {
    isOk = checkName(name1, name2);

    if (isOk) {
        _player1.name = name1.toUpperCase();
        _player2.name = name2.toUpperCase();
    }

    return isOk;
}


function checkName(name1, name2) {
    if (name1 == "") {
        hlResponse("N", "INGRESAR JUGADOR 1");
        return false;
    }

    if (name2 == "") {
        hlResponse("N", "INGRESAR JUGADOR 2");
        return false;
    }

    if (name1.toUpperCase() == name2.toUpperCase()) {
        hlResponse("N", "LOS JUGADORES DEBEN SER DIFERENTES");
        return false;
    }

    return true;
}

function checkLibre(valor) { //Verifico si el casillero esta libre
    if (valor == 0) {
        hlResponse("S", "");
        return true;
    } else {
        hlResponse("N", "EL CASILLERO ESTA OCUPADO");
        return false;
    }
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


function checkEnd(board) {
    isEnd = true;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] == 0) isEnd = false; //si alguno es igual a 0 => alguno es vacio
        }
    }
    return isEnd;
}

/*
function toUpper(id) { //solo para view 
    console.log("fraco")
    str = document.getElementById(id);
    value = str.value.toUpperCase()
    console.log(value.toUpperCase())
    str.innerHTML = "asdasdasdasd"
}
*/

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

        case 1: //one
            msgVisor.className = "msgOne"
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        case 2: //two
            msgVisor.className = "msgTwo";
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        case "F":
            msgVisor.className = "msgOk";
            msgVisor.style.display = "block";
            msgVisor.innerHTML = msg;
            break;

        default:
            msgVisor.style.display = "none"; //S
    }

    return _response;
}