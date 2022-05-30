let sprawdzanie = true
var oponentLogin
let login
let wdone = 0
let bdone = 0
let userColor = ""
let pom 
let ponName
let whosMove

document.getElementById("loginBtn").onclick = function () {
    let loginFetch = document.getElementById("loginInput").value
    //console.log(loginFetch)
    if (loginFetch != "") {
        const body = loginFetch// body czyli przesyłane na serwer dane

        //const headers = { "Content-Type": "application/json" } // nagłowek czyli typ danych

        fetch("/play", { method: "post", body }) // fetch
            .then(response => response.json())
            .then(
                data => {
                    if (data.color == "white") {
                        setInterval(function () {
                            if (sprawdzanie) {
                                checkOponent()
                            } else {
                                login = data.login
                                wdone++
                                if (wdone == 1) {
                                    white()
                                    userColor = data.color
                                }

                            }
                        }, 500)
                    }
                    if (data.color == "black") {
                        setInterval(function () {
                            if (sprawdzanie) {
                                checkOponent()
                            } else {
                                login = data.login
                                bdone++
                                if (bdone == 1) {
                                    black()
                                    userColor = data.color
                                }

                            }
                        }, 500)
                    }
                    if (data.color == "no color") {
                        noColor()
                    }
                    if (data.color == "login powtórzony") {
                        badLogin()
                    }
                } // dane odpowiedzi z serwera
            )
    }
}

function checkOponent() {

    const body = ""
    fetch("/checkOponent", { method: "post", body }) // fetch
        .then(response => response.json())
        .then(
            data => {
                //console.log(data)
                if (data.players == "1") {
                    waitingRoom()
                    sprawdzanie = true
                }
                else {
                    sprawdzanie = false
                    oponentLogin = data.opLogin
                }
            } // dane odpowiedzi z serwera
        )

}


async function checkMoves(pionki) {
    //console.log("TEST FETCH")
    const body = JSON.stringify(pionki)
    await fetch("/checkMovesSend", { method: "post", body }) // fetch
       
}

async function checkMovesGet() {
    // console.log("TEST FETCH")
    const body = ""
    
    const response = await fetch("/checkMovesGet", { method: "post", body }) // fetch
        return await response.text()

}



async function sendName(name){
    //console.log("TEST FETCH")
    const body = name
    await fetch("/sendName", { method: "post", body }) // fetch
       
}

async function checkName(){
    const body = ""

    const response = fetch("/getPonName", { method: "post", body }) // fetch
       return await (await response).text()
}



async function changeWhos(color){
    const body = color
    await fetch("/changewhosmove", { method: "post", body }) // fetch
    

}

async function getWhos(){
    const body = ""

    const response = fetch("/whosmove", { method: "post", body }) // fetch
        return await (await response).text()
}



