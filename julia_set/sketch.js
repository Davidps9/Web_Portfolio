//Code extracted from the coding train github

let angle = 0;
var inpt, btn, btn2;
// Maximum number of iterations for each point on the complex plane
const maxiterations = 100;
var pressed = false;
// Colors to be used for each possible iteration count
const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

function setup() {
  pixelDensity(1);
  createCanvas(800, 450);
  colorMode(HSB, 1);
  btn2 = createButton('ANIMATE AGAIN');
  //btn2.position(710, 800);
  btn2.size(520, 50);
  btn2.addClass("btn2");
  btn = createButton('ENTER');
  inpt = createInput('Introduce an angle');
  // Create the colors to be used for each possible iteration count
  for (let n = 0; n < maxiterations; n++) {
    // Gosh, we could make fancy colors here if we wanted
    let hu = sqrt(n / maxiterations);
    let col = color(hu, 255, 150);
    colorsRed[n] = red(col);
    colorsGreen[n] = green(col);
    colorsBlue[n] = blue(col);
  }
}

function draw() {
  // let ca = map(mouseX, 0, width, -1, 1); //-0.70176;
  // let cb = map(mouseY, 0, height, -1, 1); //-0.3842;
  if (pressed == false){

    angle += 0.01;
  }
  else if (pressed == true){
    angle+=0;
  }
  btn2.mousePressed(reanimate);
  btn.mousePressed(setAngle);
  let ca = cos(angle * 3.213); //sin(angle);
  let cb = sin(angle);

  
  
  background(0);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //let w = abs(sin(angle)) * 5;
  let w = 5;
  let h = (w * height) / width;

  // Start at negative half the width and height
  let xmin = -w / 2;
  let ymin = -h / 2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // x goes from xmin to xmax
  let xmax = xmin + w;
  // y goes from ymin to ymax
  let ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  let dx = (xmax - xmin) / width;
  let dy = (ymax - ymin) / height;

  // Start y
  let y = ymin;
  for (let j = 0; j < height; j++) {
    // Start x
    let x = xmin;
    for (let i = 0; i < width; i++) {
      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      let a = x;
      let b = y;
      let n = 0;
      while (n < maxiterations) {
        let aa = a * a;
        let bb = b * b;
        // Infinity in our finite world is simple, let's just consider it 16
        if (aa + bb > 4.0) {
          break; // Bail
        }
        let twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      let pix = (i + j * width) * 4;
      

        pixels[pix + 0] =(n*4), sin(angle), 1;
        pixels[pix + 1] = n/3;
        pixels[pix + 2] =0;
        
      x += dx;
    }
    y += dy;
  }
  updatePixels();
  console.log(frameRate());
}
function setAngle(){
  if (isNaN(inpt.value())){
    angle=0;
    alert("Please introduce a valid number");
    
  }
  else{
   pressed= true;
   angle = floor(inpt.value())*0.01;
   angle+= 0;
  }

   
  
}
function reanimate(){
  pressed = false;
}