window.onload = function () {
    main();
};
const ball_color = 'rgb(20,20,20,0.2)';
var canvas, context;
var particleArray = [];

function main(){
    
    canvas = document.getElementById("canvas1");
    context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth ;
    canvas.height= window.innerHeight /1.4;
    console.log(canvas);
    
    
    intiCircles();
    animate();

}

function intiCircles(){
    class Particle{
        constructor(x,y,directionX,directionY,size,color){
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
    
        draw(){
            context.beginPath() //start the particle 
            context.arc(this.x,this.y,this.size,0,Math.PI*2,false);
            context.fillStyle =ball_color ;
            context.fill();
            // console.log("noo");
        }
        update(){
            //inside the screen
            if(this.x > canvas.width || this.x < 0){
                this.directionX = - this.directionX;
            }
            if(this.y > canvas.width || this.y < 0){
                this.directionY = - this.directionY;
            }
            
            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }
    
    let numParticles = (canvas.height*canvas.width)/5000+400;

    for (let i = 0;i<numParticles;i++){
        let size = (Math.random()*5);
        let x = (Math.random()*((innerWidth - size * 2) - (size*2)) + size*2);
        let y = (Math.random()*((innerWidth - size * 2) - (size*2)) + size*2);
        let directionX = (Math.random()*5)-2.5;
        let directionY = (Math.random()*5)-2.5;
        let color = ball_color;

        particleArray.push(new Particle(x,y,directionX,directionY,size,color));

    }
}

function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0,0,innerWidth,innerHeight);

    for (let i = 0; i < particleArray.length;i++){
        particleArray[i].update();
    }
    
}

function connect(){
    for (var i = 0; i< particleArray.length;i++){
        for (var j = 0;j< particleArray.length;j++){

            var opacity = 1;

            var distanceInX = particleArray[i].x  - particleArray[j].x;
            var distanceInY = particleArray[i].y  - particleArray[j].y;
            
            var totalDistance = (distanceInX*distanceInX )- (distanceInY*distanceInY) ;
            if(totalDistance<0){
                totalDistance = -1 * totalDistance;
            }
            // console.log(totalDistance);
            if (totalDistance >0 && totalDistance < (canvas.height/70*canvas.width/70)){
                if(
                    !(particleArray[i].x < canvas.width && particleArray[i].x > 0 &&
                    particleArray[i].y < canvas.height && particleArray[i].y > 0 && 
                    particleArray[j].x < canvas.width && particleArray[j].x > 0 &&
                    particleArray[j].y < canvas.height && particleArray[j].y > 0 
                )){
                    continue;
                }
                opacity = 1 - totalDistance/20000;
                context.strokeStyle = 'rgb(22, 0, '+ opacity+ ')';
                context.lineWidth = 0.2;
                
                context.beginPath();
                context.moveTo(particleArray[i].x,particleArray[i].y);
                context.lineTo(particleArray[j].x,particleArray[j].y);
                context.stroke();


            }

        }
    }
}
