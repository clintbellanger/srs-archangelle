/*
 Handles all projectiles that aren't ships
 */
var MISSILE_WIDTH = 8;
var MISSILE_HEIGHT = 12;
var MISSILE_WIDTH_HALF = 4;
var MISSILE_HEIGHT_HALF = 6;
// var MISSILE_SPEED = 4;
var MISSILE_FRAMECOUNT = 4;
var MISSILE_FRAMELENGTH = 3;

var missile = new Object();

missile.img = new Image();
missile.img_loaded = false;

missile.list = new Array();

missile.total = 0;

function missile_init() {
  missile.img.src = "images/dild_missile.png";
  missile.img.onload = function() {missile_onload();};
}

function missile_onload() {
  missile.img_loaded = true;
}

function missile_logic() {

  for (var i=missile.list.length-1; i>=0; i--) {

    // move  
	missile.list[i].x += missile.list[i].dx;
    missile.list[i].y += missile.list[i].dy;
	
	// animate
    missile.list[i].frame++;
    if (missile.list[i].frame == MISSILE_FRAMECOUNT * MISSILE_FRAMELENGTH) missile.list[i].frame = 0;
    
    // leave screen
    if (missile.list[i].y < -MISSILE_HEIGHT) {
      missile_remove(i);
    }
  }
}

function missile_render() {
  for (var i=missile.list.length-1; i>=0; i--) {
    missile_render_single(i);
  }
}

function missile_add(start_x, start_y, speed_x, speed_y) {
  var new_missile = {x:start_x, y:start_y, frame:0, dx:speed_x, dy:speed_y};
  missile.list.push(new_missile);
  missile.total++;
}

function missile_remove(missile_id) {

  // efficiency if we remove the last element
  // instead of splicing the array?
  // but I didn't test.
  missile.list[missile_id] = missile.list[missile.list.length-1];
  missile.list.pop();
}

function missile_render_single(missile_id) {

  if (!missile.img_loaded) return;
  
  ctx.drawImage(
    missile.img,
    Math.floor(missile.list[missile_id].frame / MISSILE_FRAMELENGTH) * MISSILE_WIDTH,
    0,
    MISSILE_WIDTH,
    MISSILE_HEIGHT,
    (missile.list[missile_id].x - MISSILE_WIDTH_HALF) * SCALE,
    (missile.list[missile_id].y - MISSILE_HEIGHT_HALF) * SCALE,
    MISSILE_WIDTH * SCALE,
    MISSILE_HEIGHT * SCALE
  );    

}
