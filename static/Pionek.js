class Pionek extends THREE.Mesh {

    constructor(mat, matClicked, clicked, posx, posz, enable, color,name) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.geometry = new THREE.CylinderGeometry(20, 20, 10, 64);
        if (clicked == false) {
            this.material = mat
        } else {
            this.material = matClicked
        }
        this.clicked = clicked
        this.matClicked = matClicked
        this.mat = mat
        this.enable = enable
        this.x = posx
        this.z = posz
        this.color = color
        this.name = name
    }

    

    changeMaterial() {
        console.log(this.enable)
        console.log(this.clicked)
        if (this.clicked == false && this.enable==true) {
            this.material = this.matClicked
            this.clicked = true
            
        } else if(this.clicked == true && this.enable==true) {
            this.material = this.mat
            this.clicked = false
            
        }
    }
}



export default Pionek