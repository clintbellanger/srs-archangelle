/**
 Background parallax pixel starfield
 */
 
var STAR_COUNT = 255;
var starfield = new Object();

starfield.list = new Array();

starfield.img = new Image();
starfield.img_loaded = false;

function starfield_init() {
  starfield.img.src = "images/starfield.png";
  starfield.img.onload = function() {starfield_onload();};
  
  var start_x;
  var start_y;
  var speed_y;
  
  for (var i=0; i<STAR_COUNT; i++) {
    starfield.list[i] = new Object();
    starfield.list[i].x = Math.floor(Math.random() * VIEW_WIDTH);
    starfield.list[i].y = Math.floor(Math.random() * VIEW_HEIGHT);
    starfield.list[i].color = Math.floor(Math.random() * 8);
	starfield.list[i].dy = Math.random() * 2.5 + 0.25;
  }
}

function starfield_onload() {
  starfield.img_loaded = true;
}

function starfield_logic() {

  for (var i=starfield.list.length-1; i>=0; i--) {

    // move  
    starfield.list[i].y += starfield.list[i].dy;
	
    // leave screen
    if (starfield.list[i].y >= VIEW_HEIGHT) {
      starfield_reset(i);
    }	
  }
  
}

function starfield_reset(star_id) {
  starfield.list[star_id].x = Math.floor(Math.random() * VIEW_WIDTH);
  starfield.list[star_id].y = 0;
  starfield.list[star_id].color = Math.floor(Math.random() * 8);
  starfield.list[star_id].dy = Math.random() * 2.5 + 0.25;
}

function starfield_render() {
  for (var i=starfield.list.length-1; i>=0; i--) {
    starfield_render_single(i);
  }
}

function starfield_render_single(star_id) {
  if (!starfield.img_loaded) return;
  
  ctx.drawImage(
    starfield.img,
    starfield.list[star_id].color,
    0,
    1,
    1,
    starfield.list[star_id].x * SCALE,
    starfield.list[star_id].y * SCALE,
    SCALE,
    SCALE
  );    
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

