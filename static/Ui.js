let playerWhiteLoggedIn = false
let playerBlackLoggedIn = false



function white() {
    if (login == oponentLogin[0]) {
        opLogin = oponentLogin[1]
    }
    else {
        opLogin = oponentLogin[0]
    }
    console.log(login)
    console.log(oponentLogin)
    document.getElementById("statusBar").innerHTML = ""
    document.getElementById("statusBar").innerHTML += `<h2>USER_ADDED<h2><p>Witaj <span style="color:white;">${login}</span>, grasz białymi. Grasz przeciwko ${opLogin}</p>`
    document.getElementById("userLogin").style.display = "none";
    document.getElementById("bg").style.display = "none";
    playerWhiteLoggedIn = true
    

}

function black() {
    if (login == oponentLogin[0]) {
        opLogin = oponentLogin[1]
    }
    else {
        opLogin = oponentLogin[0]
    }
    document.getElementById("statusBar").innerHTML = ""
    document.getElementById("statusBar").innerHTML += `<h2>USER_ADDED<h2><p>Witaj <span style="color:white;">${login}</span>, grasz czarnymi.  Grasz przeciwko ${opLogin}</p>`
    document.getElementById("userLogin").style.display = "none";
    document.getElementById("bg").style.display = "none";
    playerBlackLoggedIn = true
    // playerWhiteLoggedIn = true

}

function noColor() {
    document.getElementById("statusBar").innerHTML = ""
    document.getElementById("statusBar").innerHTML += `<h2>ERROR<h2><br><p>Brak wolnych miejsc do gry.</p>`
}

function badLogin() {
    document.getElementById("statusBar").innerHTML = ""
    document.getElementById("statusBar").innerHTML += `<h2>ERROR<h2><br><p>Login powtórzony.</p>`
}

function waitingRoom() {
    document.getElementById("statusBar").innerHTML = ""
    document.getElementById("statusBar").innerHTML += `<h2>USER_ADDED<h2><p>Witaj <span style="color:white;">${login}</span>, grasz białymi.</p>`
    document.getElementById("userLogin").innerHTML = "";
    document.getElementById("userLogin").innerHTML += `<div style="font-size:20px;">CZEKAJ...</div><br><div class="spinning-loader"></div>`;

}

function waitForMove(){
    let time = 30

    document.getElementById("bgTwo").style.display = "block";
    document.getElementById("bgTwo").innerHTML = ""
    document.getElementById("bgTwo").innerHTML += `<p style="position:absolute; top:100px; left:50%; color:white;">RUCH PRZECIWNIKA</p>`
    document.getElementById("root").style.pointerEvents = "none"

    if(window.currrentInterval!== undefined){clearInterval(window.currrentInterval)}
    window.currrentInterval = setInterval(function(){
        if(time > 0){
            document.getElementById("bgTwo").innerHTML = ""
            document.getElementById("bgTwo").innerHTML += `<p style="position:absolute; top:100px; left:50%; color:white;">${time}</p>`
            time--
        }else{
            document.getElementById("bgTwo").innerHTML = ""
            document.getElementById("bgTwo").innerHTML += `<p style="position:absolute; top:100px; left:50%; color:white;">${time}</p>`
        }
    },1000)

}

function urMove(){
    document.getElementById("bgTwo").innerHTML = ""
    document.getElementById("bgTwo").style.display = "none";
    document.getElementById("root").style.pointerEvents = "none";
}


function showGameField(pionki){
    document.getElementById("gameField").innerHTML = ""
    document.getElementById("gameField").innerHTML += JSON.stringify(pionki)
}