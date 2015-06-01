/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
 
var VIEW_WIDTH = 240;
var VIEW_HEIGHT = 400;
 
function isWithin(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}

function resizeCanvas() {
  var aspect_ratio = VIEW_WIDTH / VIEW_HEIGHT;
    
  // the screen is wider than 4:3
  if (window.innerWidth * (1/aspect_ratio) > window.innerHeight) {  
    can.height = window.innerHeight;
    can.width = can.height * aspect_ratio;
    SCALE = can.height / VIEW_HEIGHT;
  }
  // the screen is taller than 4:3
  else {
    can.width = window.innerWidth;
	can.height = can.width / aspect_ratio;
	SCALE = can.width / VIEW_WIDTH;
  }
  redraw = true;
  setNearestNeighbor();
}

function setNearestNeighbor() {
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.oImageSmoothingEnabled = false;  
}
