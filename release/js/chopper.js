/**
 Basic avatar handling
 */
 
var CHOPPER_SIZE = 32;
var CHOPPER_HALF = 16;
var CHOPPER_TILT_ACCEL = 0.2;
var CHOPPER_TILT_MAX = 2.0;
var CHOPPER_DX_ACCEL = 0.2;
var CHOPPER_DX_MAX = 4.0;
var CHOPPER_CENTER_TILT = 2;
var CHOPPER_STARTING_X = 160.0;
var CHOPPER_STARTING_Y = 216.0;
var CHOPPER_FRAMECOUNT = 3;
var CHOPPER_FRAMES_PER_SHOT = 12;

var chopper = new Object();

chopper.img = new Image();
chopper.img_loaded = false;

chopper.power = 4;

// position, speed, acceleration
chopper.x = CHOPPER_STARTING_X;
chopper.y = CHOPPER_STARTING_Y;
chopper.dx = 0.0;
chopper.frame = 0;
chopper.tilt = 0.0;
chopper.shooting = 0;

function chopper_init() {
  chopper.img.src = "images/archangelle.png";
  chopper.img.onload = function() {chopper_onload();};
}

function chopper_onload() {
  chopper.img_loaded = true;
}

function chopper_logic() {

  // animate blades
  chopper.frame ++;
  if (chopper.frame == CHOPPER_FRAMECOUNT) chopper.frame = 0;

  var touching_left = false;
  var touching_right = false;
  
  // chopper overload mouse/touch as movement
  if (pressing.mouse) {
    if (mouse_pos.x < chopper.x) touching_left = true;
    else touching_right = true;
  }  
  
  // move left
  if (pressing.left || touching_left) {

    // accelerate left  
    chopper.dx -= CHOPPER_DX_ACCEL;
    if (chopper.dx < -CHOPPER_DX_MAX) chopper.dx = -CHOPPER_DX_MAX;
  
    // tilt left
    chopper.tilt -= CHOPPER_TILT_ACCEL;
    if (chopper.tilt < -CHOPPER_TILT_MAX) chopper.tilt = -CHOPPER_TILT_MAX;
  }
  else if (pressing.right || touching_right) {
  
    // accelerate right
    chopper.dx += CHOPPER_DX_ACCEL;
    if (chopper.dx > CHOPPER_DX_MAX) chopper.dx = CHOPPER_DX_MAX;    
  
    // tilt right
    chopper.tilt += CHOPPER_TILT_ACCEL;
    if (chopper.tilt > CHOPPER_TILT_MAX) chopper.tilt = CHOPPER_TILT_MAX;
  }
  else {
  
    // decelerate
    if (chopper.dx < -CHOPPER_DX_ACCEL) chopper.dx += CHOPPER_DX_ACCEL;
    else if (chopper.dx > CHOPPER_DX_ACCEL) chopper.dx -= CHOPPER_DX_ACCEL;
    else chopper.dx = 0.0;
  
    // tilt center
    if (chopper.tilt < -CHOPPER_TILT_ACCEL) chopper.tilt += CHOPPER_TILT_ACCEL;
    else if (chopper.tilt > CHOPPER_TILT_ACCEL) chopper.tilt -= CHOPPER_TILT_ACCEL;
    else chopper.tilt = 0.0;
    
  }
  
  // change position
  chopper.x += chopper.dx;
  
  // enforce borders
  if (chopper.x < CHOPPER_HALF) chopper.x = CHOPPER_HALF;
  if (chopper.x > VIEW_WIDTH - CHOPPER_HALF) chopper.x = VIEW_WIDTH - CHOPPER_HALF;
  
  // additional logic
  chopper_logic_shoot();
  chopper_logic_power();
}

/*
 Test functions for changing ship power
 */
function chopper_logic_power() {
  if (pressing.up && !input_lock.up) {
    input_lock.up = true;
	if (chopper.power < 4) chopper.power++;
  }

  if (pressing.down && !input_lock.down) {
    input_lock.down = true;
	if (chopper.power > 1) chopper.power--;
  }
}

function chopper_logic_shoot() {
  chopper.shooting++;
  var start_x = Math.round(chopper.x);
  var start_y = Math.round(chopper.y);
  
  if (chopper.shooting == CHOPPER_FRAMES_PER_SHOT) {
    chopper.shooting = 0;
	
	switch (chopper.power) {
	
      case 1: // one missile forward
        missile_add(start_x, start_y, 0, -4);
        break;
		
	  case 2: // two missiles forward
        missile_add(start_x-3, start_y, 0, -4);
		missile_add(start_x+3, start_y, 0, -4);
        break;
	  
	  case 3: // four missiles forward
        missile_add(start_x-3, start_y-2, 0, -4);
		missile_add(start_x+3, start_y-2, 0, -4);
        missile_add(start_x-9, start_y+2, 0, -4);
		missile_add(start_x+9, start_y+2, 0, -4);
        break;
		
	  case 4: // four missiles forward, two diagonal
        missile_add(start_x-3, start_y-2, 0, -4);
		missile_add(start_x+3, start_y-2, 0, -4);
        missile_add(start_x-9, start_y+2, 0, -4);
		missile_add(start_x+9, start_y+2, 0, -4);
		
        missile_add(start_x, start_y, -3, -3);
		missile_add(start_x, start_y, 3, -3);
        break;
	  
	  
    }
  }

}

function chopper_render() {
  if (!chopper.img_loaded) return;
  
  ctx.drawImage(
    chopper.img,
    chopper.frame * CHOPPER_SIZE,
    Math.round(chopper.tilt + CHOPPER_CENTER_TILT) * CHOPPER_SIZE,
    CHOPPER_SIZE,
    CHOPPER_SIZE,
    (chopper.x - CHOPPER_HALF) * SCALE,
    (chopper.y - CHOPPER_HALF) * SCALE,
    CHOPPER_SIZE * SCALE,
    CHOPPER_SIZE * SCALE
  );
  
}
