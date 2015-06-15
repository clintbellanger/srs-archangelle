/*
 Handles all projectiles that aren't ships
 */
var MISSILE_WIDTH = 8;
var MISSILE_HEIGHT = 12;
var MISSILE_WIDTH_HALF = 4;
var MISSILE_HEIGHT_HALF = 6;
var MISSILE_FRAMECOUNT = 4;
var MISSILE_FRAMELENGTH = 3;

var missile = new Object();

missile.init = function() {
  missile.img_id = imageset_load("images/dild_missile.png");
  missile.list = new Array();
  missile.total = 0;  
}

missile.logic = function() {

  for (var i=missile.list.length-1; i>=0; i--) {

    // move  
	missile.list[i].x += missile.list[i].dx;
    missile.list[i].y += missile.list[i].dy;
	
	// animate
    missile.list[i].frame++;
    if (missile.list[i].frame == MISSILE_FRAMECOUNT * MISSILE_FRAMELENGTH) missile.list[i].frame = 0;
    
    // leave screen
    if (missile.list[i].y < -MISSILE_HEIGHT) {
      missile.remove(i);
    }
  }
}

missile.render = function() {

  for (var i=missile.list.length-1; i>=0; i--) {
    missile.render_single(i);
  }
}

missile.add = function(start_x, start_y, speed_x, speed_y) {
  var new_missile = {x:start_x, y:start_y, frame:0, dx:speed_x, dy:speed_y};
  
  // random starting framecount
  new_missile.frame = Math.floor(Math.random() * (MISSILE_FRAMECOUNT * MISSILE_FRAMELENGTH));
  
  missile.list.push(new_missile);
  missile.total++;
}

missile.remove = function(missile_id) {
  missile.list[missile_id] = missile.list[missile.list.length-1];
  missile.list.pop();
}

missile.render_single = function(missile_id) {
  
  imageset_render(
    missile.img_id,
    Math.floor(missile.list[missile_id].frame / MISSILE_FRAMELENGTH) * MISSILE_WIDTH,
    0,
    MISSILE_WIDTH,
    MISSILE_HEIGHT,
    missile.list[missile_id].x - MISSILE_WIDTH_HALF,
    missile.list[missile_id].y - MISSILE_HEIGHT_HALF
  );
}

