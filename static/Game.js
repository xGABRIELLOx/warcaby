
import Pionek from "./Pionek.js";
import Pole from "./Pole.js"


class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x383636);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2();
        this.color = ""
        this.ponName = ""
        this.timeToCast = 0
        this.name1 = ""
        this.name2 = ""
        this.oldName1 = ""
        this.oldName2 = ""
        this.canPlay = true
        this.whosMove = ""

        // this.doneW = false
        // this.doneB = false
        this.used = []
        this.fields = []
        this.clicked = false
        this.fieldPom = 1

        this.geometryPon = new THREE.CylinderGeometry(20, 20, 10, 64);
        this.ponWhite = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/wood.png'),
            transparent: true,
            opacity: 1
        });
        this.ponBlack = new THREE.MeshBasicMaterial({
            color: 0xfc0303,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/wood.png'),
            transparent: true,
            opacity: 1
        });
        this.materialYellow = new THREE.MeshBasicMaterial({
            color: 0xe7f702,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/wood.png'),
            transparent: true,
            opacity: 1,

        });
        this.materialBlack = new THREE.MeshBasicMaterial({
            color: 0x502900,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load('./gfx/woodField.png')
        });
        this.materialWhite = new THREE.MeshBasicMaterial({
            color: 0xB48D51,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/woodField.png'),
            transparent: true,
            opacity: 1,

        });
        this.materialBlue = new THREE.MeshBasicMaterial({
            color: 0x73c8d9,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/woodField.png'),
            transparent: true,
            opacity: 1,

        })
       
        this.szachownica = [

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]

        ];

        this.pionki = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]

        ];

        this.init()

        setInterval(this.sync.bind(this),1000);

        this.render() // wywołanie metody render



        
        

    }

    init() {
        this.camera.position.set(0, 200, 500)

        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)


        const geometryField = new THREE.BoxGeometry(50, 15, 50);
        const materialBlack = new THREE.MeshBasicMaterial({
            color: 0x502900,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,
            map: new THREE.TextureLoader().load('./gfx/woodField.png')
        });
        const materialWhite = new THREE.MeshBasicMaterial({
            color: 0xB48D51,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/woodField.png'),
            transparent: true,
            opacity: 1,

        });
        const materialBlue = new THREE.MeshBasicMaterial({
            color: 0x73c8d9,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('./gfx/woodField.png'),
            transparent: true,
            opacity: 1,

        });



        window.addEventListener("mousedown", async (e) => {
            if(!this.canPlay) return;

            this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0) {
                // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
                // intersects[0].object.rotation.y += 0.005;

                if (intersects[0].object.geometry.type == "CylinderGeometry") {
                    
                    if (this.used.length == 0) {
                        this.used.push(intersects[0])
                        intersects[0].object.changeMaterial()
                    } else {
                        //console.log(intersects[0].object.clicked)
                        if(this.used[this.used.length - 1].object != intersects[0].object && this.used[this.used.length - 1].object.clicked == true){
                            intersects[0].object.changeMaterial()
                            this.used[this.used.length - 1].object.changeMaterial()
                        }
                        else if(this.used[this.used.length - 1].object != intersects[0].object && this.used[this.used.length - 1].object.clicked == false){
                            intersects[0].object.changeMaterial()
                        }
                        else if(this.used[this.used.length - 1].object == intersects[0].object){
                            //console.log("TEST CZY KOLOR SIEDZI")
                            intersects[0].object.changeMaterial()
                        }
                        
                        //console.log(intersects[0].object.clicked)
                        
                        this.used.push(intersects[0])
                    }
                    this.ponName = this.used[this.used.length - 1].object.name
                    // console.log(this.ponName)
                    if(intersects[0].object.enable == true) {
                        if(this.color == "white"){
                            if(this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x - 1] == 0 || this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x - 1] == 1 || this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x - 1] == 2){
                                if(this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x - 1] == 0){
                                    this.name1 = String("field"+String(this.used[this.used.length - 1].object.z - 1) + (this.used[this.used.length - 1].object.x - 1))
                                }
                                else{
                                    this.name1 = ""
                                }
                            }
                            else{
                                this.name1 = ""
                            }
                            if(this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x + 1] == 0 || this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x + 1] == 1 || this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x + 1] == 2){
                                if(this.pionki[this.used[this.used.length - 1].object.z - 1][this.used[this.used.length - 1].object.x + 1] == 0){
                                    this.name2 = String("field"+String(this.used[this.used.length - 1].object.z - 1) + (this.used[this.used.length - 1].object.x + 1))
                                }else{
                                    this.name2 = ""
                                }
                            }
                            else{
                                this.name2 = ""
                            }
                            // console.log(this.name1,this.name2)
                        }
                        else if(this.color == "black"){
                            if(this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x - 1] == 0 || this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x - 1] == 1 || this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x - 1] == 2){
                                if(this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x - 1] == 0){
                                this.name1 = String("field"+String(this.used[this.used.length - 1].object.z + 1) + (this.used[this.used.length - 1].object.x - 1)) 
                                }else{
                                    this.name1= ""
                                }
                                
                            }
                            else{
                                this.name1 = ""
                            }
                            if(this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x + 1] == 0 || this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x + 1] == 1 || this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x + 1] == 2){
                                if(this.pionki[this.used[this.used.length - 1].object.z + 1][this.used[this.used.length - 1].object.x + 1] == 0){
                                    this.name2 = String("field"+String(this.used[this.used.length - 1].object.z + 1) + (this.used[this.used.length - 1].object.x + 1))
                                }
                                else{
                                    this.name2= ""
                                }
                            }
                            else{
                                this.name2 = ""
                            }
                            // console.log(this.name1,this.name2)
                        }
                    
                        if(intersects[0].object.clicked == false){
                            this.colorFields(this.name1,this.name2,"nocolor")
                        }else if(intersects[0].object.clicked == true){
                            this.colorFields(this.name1,this.name2,"color")
                        }
                        
                    }
                }
                if (intersects[0].object.geometry.type == "BoxGeometry") {
                    // console.log(intersects[0].object.color)
                    this.fields.push(intersects[0])


                    if (this.used.length != 0 && intersects[0].object.color == "blue" ) {

                        if (this.pionki[this.fields[this.fields.length - 1].object.x][this.fields[this.fields.length - 1].object.z] == 0) {
                            // console.log(this.used[this.used.length - 1].object.color)
                            // console.log(intersects[0].object.x, intersects[0].object.z)
                            // console.log(this.used[this.used.length - 1].object.z)
                            // console.log(this.used[this.used.length - 1].object.x)
                            

                            if (this.used[this.used.length - 1].object.color == "black" &&  (intersects[0].object.x == this.used[this.used.length - 1].object.z + 1) && (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1) && ( this.used[this.used.length - 1].object.x - 1 > -1 && this.used[this.used.length - 1].object.x + 1 < 8 ) ) 
                            {
                                // console.log(this.pionki[intersects[0].object.x][intersects[0].object.z])
                                if(this.pionki[intersects[0].object.x][intersects[0].object.z] == 0){
                                
                                    let x = -175 + 50 * this.fields[this.fields.length - 1].object.z
                                    let y = 25
                                    let z = -175 + 50 * this.fields[this.fields.length - 1].object.x

                                    new TWEEN.Tween(this.used[this.used.length - 1].object.position)
                                        .to({ x, y, z }, 500)
                                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                                        .start()

                                    this.pionki[intersects[0].object.x][intersects[0].object.z] = 2
                                    this.pionki[this.used[this.used.length - 1].object.z][this.used[this.used.length - 1].object.x] = 0

                                    this.used[this.used.length - 1].object.x = this.fields[this.fields.length - 1].object.z
                                    this.used[this.used.length - 1].object.z = this.fields[this.fields.length - 1].object.x

                                    
                                    this.colorFields(this.name1,this.name2,"nocolor")
                                    this.used[this.used.length - 1].object.changeMaterial()
                                    
                                    await changeWhos(this.color)
                                    waitForMove()
                                    await checkMoves(this.pionki)
                                    await sendName(this.ponName)
                                    this.canPlay = false
                                    
                                }
                            }
                            else if (this.used[this.used.length - 1].object.color == "white" && (intersects[0].object.x == this.used[this.used.length - 1].object.z - 1) && (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1) && ( this.used[this.used.length - 1].object.x - 1 > -1 && this.used[this.used.length - 1].object.x + 1 < 8 )) 
                            {
                                // console.log(this.pionki[intersects[0].object.x][intersects[0].object.z])
                                if(this.pionki[intersects[0].object.x][intersects[0].object.z] == 0){
                                    //this.used[this.used.length - 1].object.position.set(-175 + 50 * this.fields[this.fields.length - 1].object.z, 25, -175 + 50 * this.fields[this.fields.length - 1].object.x)
                                    let x = -175 + 50 * this.fields[this.fields.length - 1].object.z
                                    let y = 25
                                    let z = -175 + 50 * this.fields[this.fields.length - 1].object.x

                                    new TWEEN.Tween(this.used[this.used.length - 1].object.position)
                                        .to({ x, y, z }, 500)
                                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                                        .start()

                                    

                                    this.pionki[intersects[0].object.x][intersects[0].object.z] = 1
                                    this.pionki[this.used[this.used.length - 1].object.z][this.used[this.used.length - 1].object.x] = 0

                                    this.used[this.used.length - 1].object.x = this.fields[this.fields.length - 1].object.z
                                    this.used[this.used.length - 1].object.z = this.fields[this.fields.length - 1].object.x
                                    debugger;

                                    await changeWhos(this.color)
                                    this.colorFields(this.name1,this.name2,"nocolor")
                                    this.used[this.used.length - 1].object.changeMaterial()
                                    waitForMove()
                                    await checkMoves(this.pionki)
                                    await sendName(this.ponName)
                                    this.canPlay = false
                                    
                                }
                            }

                        }
                    }
                }

            }

        });


        // const helper = new THREE.Mesh(geometryField, materialWhite);
        // this.scene.add(helper)
        // helper.position.set(-175,50,-175)
    }



    makeField() {
        for (let i = 0; i < this.szachownica.length; i++) {
            for (let x = 0; x < this.szachownica[i].length; x++) {

                if (this.szachownica[i][x] == 1) {
                    window["field" + x+i] = new Pole(this.materialWhite, x, i, "white",this.materialBlue);
                    this.scene.add(window["field" + x+i])
                    let xpos = -175 + i * 50
                    let ypos = 15
                    let zpos = -175 + x * 50

                    window["field" + x+i].position.set(xpos, ypos, zpos)
                }
                else {
                    window["field" + x+i] = new Pole(this.materialBlack, x, i, "black", this.materialBlue);
                    this.scene.add(window["field" + x+i])
                    let xpos = -175 + i * 50
                    let ypos = 15
                    let zpos = -175 + x * 50

                    window["field" + x+i].position.set(xpos, ypos, zpos)
                }


            }
        }

        // window["field"] = new Pole(this.materialBlack, 0, 0, "black");
        // this.scene.add(window["field"])
        // let xpos = -175 + 100
        // let ypos = 100
        // let zpos = -175 

        // window["field"].position.set(xpos, ypos, zpos)

        // window["field2"] = new Pole(this.materialBlack, 0, 0, "black");
        // this.scene.add(window["field2"])
        // let xpos2 = -175 
        // let ypos2 = 100
        // let zpos2 = -175 + 100

        // window["field2"].position.set(xpos2, ypos2, zpos2)

    }

    makeWhitePons() {
        for (let i = 0; i < this.pionki.length; i++) {
            for (let x = 0; x < this.pionki[i].length; x++) {

                if (this.pionki[i][x] == 1) {
                    let name = String("whitePon"+i+x)
                    window["whitePon"+ i + x] = new Pionek(this.ponWhite, this.materialYellow, false, x, i, true, "white",name );

                    this.scene.add(window["whitePon"+ i + x])
                    let xposPon = -175 + x * 50
                    let yposPon = 25
                    let zposPon = -175 + i * 50
                    //console.log(this.pionki[i][x] + " " + xposPon + " "  + zposPon + " " + i + x)
                    window["whitePon"+i+x].position.set(xposPon, yposPon, zposPon)
                }
                else if (this.pionki[i][x] == 2) {
                    let name = String("blackPon"+i+x)
                    window["blackPon"+i+x] = new Pionek(this.ponBlack, this.materialYellow, false, x, i, false, "black", name);
                    this.scene.add(window["blackPon"+i+x])
                    let xposPon = -175 + x * 50
                    let yposPon = 25
                    let zposPon = -175 + i * 50
                    //console.log(this.pionki[i][x] + " " + xposPon + " "  + zposPon + " " + i + x)
                    window["blackPon"+i+x].position.set(xposPon, yposPon, zposPon)
                }

            }
        }
        this.camera.position.set(0, 200, 500)

       
    }

    makeBlackPons() {
        for (let i = 0; i < this.pionki.length; i++) {
            for (let x = 0; x < this.pionki[i].length; x++) {
                if (this.pionki[i][x] == 2) {

                    let name = String("blackPon"+i+x)
                    window["blackPon"+i+x] = new Pionek(this.ponBlack, this.materialYellow, false, x, i, true, "black", name);
                    this.scene.add(window["blackPon"+i+x])
                    let xposPon = -175 + x * 50
                    let yposPon = 25
                    let zposPon = -175 + i * 50
                    //console.log(this.pionki[i][x] + " " + xposPon + " "  + zposPon + " " + i + x)
                    window["blackPon"+i+x].position.set(xposPon, yposPon, zposPon)
                }
                else if (this.pionki[i][x] == 1) {
                    let name = String("whitePon"+i+x)
                    window["whitePon"+ i + x] = new Pionek(this.ponWhite, this.materialYellow, false, x, i, false, "white",name );

                    this.scene.add(window["whitePon"+ i + x])
                    let xposPon = -175 + x * 50
                    let yposPon = 25
                    let zposPon = -175 + i * 50
                    //console.log(this.pionki[i][x] + " " + xposPon + " "  + zposPon + " " + i + x)
                    window["whitePon"+i+x].position.set(xposPon, yposPon, zposPon)
                }

            }
        }
        this.camera.position.set(0, 200, -500)

    }

    async makePons(planszaS, planszaN, nameToUse){

        // console.log(planszaS)
        // console.log(planszaN)
        // console.log(nameToUse)

        let xone = 0
        let yone = 0
        let xtwo = 0
        let ytwo = 0

        if(JSON.stringify(planszaS) != JSON.stringify(planszaN)){

            for(let i=0; i<planszaS.length; i++){
                for(let j=0; j<planszaS[i].length; j++){
                    if(planszaS[i][j] != planszaN[i][j] && planszaS[i][j] == 0){
                        xtwo = i
                        ytwo = j
                    }
                    else if(planszaS[i][j] != planszaN[i][j] && (planszaS[i][j] == 1 || planszaS[i][j] == 2)){
                        xone = i
                        yone = j
                    }
                }
            }

            if ( true ){
                // console.log(xone,yone,xtwo,ytwo)
                // console.log(nameToUse)
                
                let xposPon = 0
                let yposPon = 50
                let zposPon = 0

                xposPon = -175 + ytwo * 50
                yposPon = 25
                zposPon = -175 + xtwo * 50
                // console.log(xposPon + " "  + zposPon)


                if( planszaS[xone][yone] == 1 && this.color == "black"){
                   // window[nameToUse].position.set(xposPon, yposPon, zposPon)

                    new TWEEN.Tween(window[nameToUse].position)
                    .to({ x:xposPon, y:yposPon, z:zposPon }, 500)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .start()
                }
                else if(planszaS[xone][yone] == 2 && this.color == "white"){
                    //window[nameToUse].position.set(xposPon, yposPon, zposPon)

                    new TWEEN.Tween(window[nameToUse].position)
                    .to({ x:xposPon, y:yposPon, z:zposPon }, 500)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .start()
                }   
                
                // window[nameToUse].object.x = ytwo
                // window[nameToUse].object.z = xtwo
                //console.log("JAK TO NIBY DZIAŁA")
                this.whosMove =  await getWhos()
                
                if(this.whosMove == this.color){
                    this.canPlay = true
                    urMove()
                }else{
                    this.canPlay = false
                    waitForMove()
                }
            }    
            

        }
        
        this.pionki = planszaN
        
       

    }

    colorFields(name1,name2,isColor){
        //console.log(name1,name2,this.oldName1,this.oldName2)
        if(this.oldName1 != "" ){
            window[this.oldName1].changeMaterial("bc")
           
        }
        if(this.oldName2 != ""){
            window[this.oldName2].changeMaterial("bc")
        }
        if(isColor == "color"){
            // console.log("TEST COLOR")
            if(name1 != ""){
                window[name1].changeMaterial("c") 
                
            }
            if(name2 != ""){
                window[name2].changeMaterial("c")
                
            }
        }else if(isColor == "nocolor"){
            // console.log("TEST NOCOLOR")
            
            if(name1 != ""){
                window[name1].changeMaterial("bc") 
                
            }
            if(name2 != ""){
                window[name2].changeMaterial("bc")
                
            }
        }
        
        this.oldName1 = name1
        this.oldName2 = name2
       
    }

    movePonAnimation(xEnd,yEnd,zEnd, ponName){
       
    }

    sync = async ()=>{
        if (this.fieldPom == 1) {
            this.makeField()
        }


        this.timeToCast++

        showGameField(this.pionki)

        this.fieldPom++

        if (this.doneW != true || this.doneB != true) {
            if (playerWhiteLoggedIn) {
                console.log("W")
                this.makeWhitePons()
                //console.log("WHITE DONE")
                this.doneW = true
                this.doneB = true
                this.color = "white"
                this.canPlay = true
            }
            if (playerBlackLoggedIn) {
                console.log("B")
                this.makeBlackPons()
                //console.log("BLACK DONE DONE") 
                this.doneB = true
                this.doneW = true
                this.color = "black"
                this.canPlay = false
                waitForMove()
            }
        }

        if(this.doneW == true && this.doneB == true){

                const rawResult = await checkMovesGet();
                let fieldResult = JSON.parse(rawResult);
                
                // console.log(fieldResult)
                // console.log(fieldResult[0])
                if(rawResult != JSON.stringify(this.pionki)){
                    // console.log(fieldResult)
                    
                    let namePons = await checkName()
                    await this.makePons(this.pionki, fieldResult, namePons)
                   
                }
        }
    }
    


    render = () => {
        this.camera.lookAt(this.scene.position)
        TWEEN.update();
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

    }


}

export default Game

// && 
// (intersects[0].object.x == this.used[this.used.length - 1].object.z + 1) &&
// (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1)

// && 
// (intersects[0].object.x == this.used[this.used.length - 1].object.z - 1) &&
// (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1)

//&&  (intersects[0].object.x == this.used[this.used.length - 1].object.z + 1) && (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1) && ( this.used[this.used.length - 1].object.x - 1 > -1 && this.used[this.used.length - 1].object.x + 1 < 8 ) 

//&& (intersects[0].object.x == this.used[this.used.length - 1].object.z - 1) && (intersects[0].object.z == this.used[this.used.length - 1].object.x - 1 || intersects[0].object.z == this.used[this.used.length - 1].object.x + 1) && ( this.used[this.used.length - 1].object.x - 1 > -1 && this.used[this.used.length - 1].object.x + 1 < 8 )