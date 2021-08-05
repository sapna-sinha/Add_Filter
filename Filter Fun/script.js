var image = null;
var grayImage = null;
var redImage = null;
var darkImage = null;
var rainbowImage = null;
var blurImage = null;
var canvas = document.getElementById("c1");
window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;

function upload() {
  var t1 = document.getElementById("f1");
  image = new SimpleImage(t1);
  grayImage = new SimpleImage(t1);
  redImage = new SimpleImage(t1);
  darkImage = new SimpleImage(t1);
  rainbowImage = new SimpleImage(t1);
  blurImage = new SimpleImage(t1);

  image.drawTo(canvas);
}

function filterGray() {
  for (var pixel of grayImage.values()) {
    var avg = rgbAverage(pixel);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
    pixel.setRed(avg);
  }
}

function filterRed() {
  for (var pixel of redImage.values()) {
    filterColor(255, 0, 0, pixel);
  }
}

function filterDark() {
  for (var pixel of darkImage.values()) {
    pixel.setRed(pixel.getRed() * 0.9);
    pixel.setGreen(pixel.getGreen() * 0.9);
    pixel.setBlue(pixel.getBlue() * 0.9);
  }
}

function resetImage() {
  if (imageIsLoaded(image)) {
    copyImage(grayImage);
    copyImage(redImage);
    copyImage(darkImage);
    copyImage(rainbowImage);
    copyImage(blurImage);
    image.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function makeGray() {
  if (imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function makeRed() {
  if (imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function makeDark() {
  if (imageIsLoaded(darkImage)) {
    filterDark();
    darkImage.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function imageIsLoaded(im) {
  if (im == null) {
    return false;
  } else {
    return true;
  }
}

function copyImage(im) {
  for (var pixel of image.values()) {
    im.setPixel(pixel.getX(), pixel.getY(), pixel);
  }
}

function rgbAverage(pixel) {
  return (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3;
}

function filterColor(r, g, b, pixel) {
  var avg = rgbAverage(pixel);
  if (avg < 128) {
    pixel.setRed(r / 127.5 * avg);
    pixel.setGreen(g / 127.5 * avg);
    pixel.setBlue(b / 127.5 * avg);
  } else {
    pixel.setRed((2 - r / 127.5) * avg + 2 * r - 255);
    pixel.setGreen((2 - g / 127.5) * avg + 2 * g - 255);
    pixel.setBlue((2 - b / 127.5) * avg + 2 * b - 255);
  }
}

function filterRainbow() {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) {
    if (pixel.getY() < height / 7) {
      filterColor(255, 0, 0, pixel); // red
    } else if (pixel.getY() < 2 * height / 7) {
      filterColor(255, 165, 0, pixel); // orange
    } else if (pixel.getY() < 3 * height / 7) {
      filterColor(255, 255, 0, pixel); // yellow
    } else if (pixel.getY() < 4 * height / 7) {
      filterColor(0, 255, 0, pixel); // green
    } else if (pixel.getY() < 5 * height / 7) {
      filterColor(0, 0, 255, pixel); // blue
    } else if (pixel.getY() < 6 * height / 7) {
      filterColor(165, 0, 255, pixel); // indigo
    } else {
      filterColor(204, 0, 204, pixel); // violet
    }
  }
}

function makeRainbow() {
  if (imageIsLoaded(rainbowImage)) {
    filterRainbow();
    rainbowImage.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function makeBlur() {
  if (imageIsLoaded(blurImage)) {
    filterBlur();
    blurImage.drawTo(canvas);
  } else {
    alert("Please upload an image first!");
  }
}

function filterBlur() {
  var width = blurImage.width;
  var height = blurImage.height;
  for (var pixel of blurImage.values()) {
    var rng = Math.random();
    if (rng < 0.5) {
      var randX = Math.random() * width/20 - width/40 + pixel.getX();
      var randY = Math.random() * height/20 - height/40 + pixel.getY();
      if (randX >= width) {
        randX = width - 1;
      } else if (randX < 0) {
        randX = 0;
      }
      if (randY >= height) {
        randY = height - 1;
      } else if (randY < 0) {
        randY = 0;
      }
      pixel.setAllFrom(image.getPixel(randX, randY));
    }
  }
}
