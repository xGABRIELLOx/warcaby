class Pole extends THREE.Mesh {

    constructor(mat,posx, posz,color, matPicked) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.geometry = new THREE.BoxGeometry(50, 15, 50);
        this.material = mat

        this.mat = mat
        this.x = posx
        this.z = posz
        this.color = color
        this.matPicked = matPicked
        this.isPicked = false
    }

    fieldPos(){
        console.log(this.x)
        console.log(this.z)
    }

    changeMaterial(con) {
        if (con == "c") {
            this.material = this.matPicked
            this.isPicked = true
            this.color = "blue"
        } else if(con == "bc") {
            this.material = this.mat
            this.isPicked = false
            this.color = "blue"
        }
    }

    

   
}


export default Pole