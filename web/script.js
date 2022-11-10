class GameBoard {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');
        this.addListeners();
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    isDrawing = false;



    fetchImage = async (context) => {
        let request = await fetch("http://localhost:8000/predict", context);
        let resp = await request.json();
        console.log(resp);
    }

    predictImage() {
        let canvasData = this.canvas.toBlob((blob) => {
            let file = new File([blob], "myimage.jpg", { type: "image/jpeg" });


            let formData = new FormData();
            formData.append("file", file);


            this.fetchImage({ method: "POST", body: formData });
    
            // fetch("http://localhost:8000/predict", { method: "POST", body: formData })
            //     .then((res) => {
            //         console.log(res.body);
            //         // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //     }).catch((err) => {
            //         console.log(err)
            //     })
        }, "image/jpeg");
        // let image = new Image();
        // image.src = canvasData;
        // console.log(image);


   
    }


    mouseEvents = {
        mouseup: (e) => {
            this.isDrawing = false;
            this.predictImage();
        },
        mousedown: (e) => {
            this.isDrawing = true;
            this.ctx.beginPath();
            this.ctx.moveTo(e.clientX, e.clientY);

        },
        mousemove: (e) => {
            if (!this.isDrawing) {
                return
            }

            this.ctx.lineTo(e.clientX, e.clientY);
            this.ctx.stroke();
        },
    }

    addListeners() {


        this.canvas.addEventListener("mouseup", this.mouseEvents.mouseup);
        this.canvas.addEventListener("mousemove", this.mouseEvents.mousemove);
        this.canvas.addEventListener("mousedown", this.mouseEvents.mousedown);

    }



}


window.onload = () => {
    window.game = new GameBoard();
}