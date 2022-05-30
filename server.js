// install express with `npm install express` 
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;


app.use(express.static('static'))
app.use(express.text())

let players = []
let obecnaPlansza = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]

]
let ponName = ""
let whosMove = "white"

// export 'app'
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.post("/play", function (req, res) {
    userLogin = req.body
   // console.log(userLogin)
    //console.log(players + " " + players.length)
    if (players.length == 0) {
       // console.log("FIRST")
        players.push(userLogin)
        let color = "white"
        const jsonBack = { color: color, login: userLogin }
        res.end(JSON.stringify(jsonBack))
    }
    else if (players.length == 1 && players[0] != userLogin) {
        //console.log("SECOND")
        players.push(userLogin)
        let color = "black"
        const jsonBack = { color: color, login: userLogin }
        res.end(JSON.stringify(jsonBack))
    }
    else if (players.length >= 2) {
        const color = "no color"
        const jsonBack = { color: color, login: userLogin }
        res.end(JSON.stringify(jsonBack))
    }
    else {
        const jsonBack = { color: "login powtórzony", login: "login powtórzony" }
        res.end(JSON.stringify(jsonBack))
    }

})

app.post("/checkOponent", function (req, res) {
    if (players.length == 1) {
        const jsonBack = { players: "1" }
        res.end(JSON.stringify(jsonBack))
    }
    else if (players.length == 2) {
        const jsonBack = { players: "2", opLogin: players }
        res.end(JSON.stringify(jsonBack))
    }
})

app.post("/checkMovesSend", function (req, res) {
    let pionki = req.body
    obecnaPlansza = JSON.parse(pionki)
    console.log(JSON.stringify(obecnaPlansza))
    res.end("SERWER GET MOVE")
})

app.post("/sendName", function (req, res) {
    let name = req.body
    
    ponName = name
    //console.log(ponName)
    res.end("SERWER GET NAME")
})

app.post("/changewhosmove", function(req,res){
    whos = req.body
    if(whosMove == ""){
        whosMove = whos
    }else{    

        if(whos == "white"){
            whosMove = "black"
        }
        else if(whos == "black"){
            whosMove = "white"
        }
        console.log(whosMove)
    }
    res.end("OK");
})




app.post("/checkMovesGet", function (req, res) {

    res.end(JSON.stringify(obecnaPlansza))
})

app.post("/getPonName", function(req,res){
    res.end(ponName)
})

app.post("/whosmove", function(req,res){
    res.end(whosMove)
})

app.post("/reset", function(req,res){
    players = []
    obecnaPlansza = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    
    ]
    ponName = ""
    whosMove = "white"

    console.log(players, obecnaPlansza, ponName, whosMove)
})