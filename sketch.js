let streams = [];
const fadeInterval = 1.6;
const symbolSize = 14;

// Function that gets invoked when loading sketch
function setup() {
  createCanvas(
    window.innerWidth, //Loads to be the full window width
    window.innerHeight //Loads to be the full window height
  );
  background(0); //Setting the background to black

  let x = 0;
  //Fit as many streams as possible given the window width
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0)); //Function call to generate symbols w/ x and random y
    streams.push(stream); //Push each stream to the streams array
    x += symbolSize;
  }

  textSize(symbolSize); //Setting text size in p5.js
}

// Function that draws the canvas
function draw() {
  background(0, 150); //Setting the black background
  //For each in the Streams array render the stream
  streams.forEach((stream) => {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  //Setting variables equal to what was passed through
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 20));

  this.setToRandomSymbol = function() {
    let charType = round(random(0, 5));

    //Change the character when the interval divides evenly into frame count
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 25);

  this.generateSymbols = function(x, y) {
    let opacity = 255;
    let first = round(random(0, 4)) == 1;
    for (let i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
