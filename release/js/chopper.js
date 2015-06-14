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
var CHOPPER_STARTING_X = VIEW_WIDTH / 2;
var CHOPPER_STARTING_Y = VIEW_HEIGHT - CHOPPER_SIZE * 1.5;
var CHOPPER_FRAMECOUNT = 3;
var CHOPPER_FRAMES_PER_SHOT = 12;
var CHOPPER_COLLISION_WIDTH = 12;
var CHOPPER_COLLISION_HEIGHT = 24;

var chopper = new Object();

chopper.img_id = 0;
chopper.power = 0;

// position, speed, acceleration
chopper.x = CHOPPER_STARTING_X;
chopper.y = CHOPPER_STARTING_Y;
chopper.dx = 0.0;
chopper.frame = 0;
chopper.tilt = 0.0;
chopper.shooting = 0;

function chopper_init() {
  chopper.img_id = imageset_load("images/archangelle.png");
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
	
      case 0: // one missile forward
        missile.add(start_x, start_y, 0, -4);
        break;
		
	  case 1: // two missiles forward
        missile.add(start_x-3, start_y, 0, -4);
		missile.add(start_x+3, start_y, 0, -4);
        break;
	  
	  case 2: // four missiles forward
        missile.add(start_x-3, start_y-2, 0, -4);
		missile.add(start_x+3, start_y-2, 0, -4);
        missile.add(start_x-9, start_y+2, 0, -4);
		missile.add(start_x+9, start_y+2, 0, -4);
        break;
		
	  case 3: // eight missiles. 4 forward, 4 diagonal
        missile.add(start_x-3, start_y-2, 0, -4);
		missile.add(start_x+3, start_y-2, 0, -4);
        missile.add(start_x-9, start_y+2, 0, -4);
		missile.add(start_x+9, start_y+2, 0, -4);
		
        missile.add(start_x, start_y, -1, -3);
        missile.add(start_x, start_y, -3, -2);        
        missile.add(start_x, start_y, 1, -3);
		missile.add(start_x, start_y, 3, -2);        
        break;
        
       case 4: // sixteen missiles, max power
       
        // 6 forward in wide formation
        missile.add(start_x-3, start_y-2, 0, -4);
		missile.add(start_x+3, start_y-2, 0, -4);
        missile.add(start_x-9, start_y-2, 0, -4);
		missile.add(start_x+9, start_y-2, 0, -4);
        missile.add(start_x-15, start_y+2, 0, -4);
        missile.add(start_x+15, start_y+2, 0, -4);

        // double the diagonals
        missile.add(start_x, start_y, -1, -3);
        missile.add(start_x-6, start_y, -1, -3);

        missile.add(start_x, start_y, -3, -2);
        missile.add(start_x-6, start_y, -3, -2);
        
        missile.add(start_x, start_y, 1, -3);
        missile.add(start_x+6, start_y, 1, -3);
        
		missile.add(start_x, start_y, 3, -2);        
		missile.add(start_x+6, start_y, 3, -2);
        
        // protect the sides
        missile.add(start_x, start_y, -4, 0);
        missile.add(start_x, start_y, 4, 0);
        break;
    }
  }

}

function chopper_powerup() {
  if (chopper.power < 4) chopper.power++;	
}

function chopper_powerdown() {
  if (chopper.power > 0) chopper.power--;
}

function chopper_dilds_per_shot() {
  return Math.pow(2, chopper.power);
}

function chopper_render() {
  
  imageset_render(
    chopper.img_id,
	chopper.frame * CHOPPER_SIZE,
    Math.round(chopper.tilt + CHOPPER_CENTER_TILT) * CHOPPER_SIZE,
    CHOPPER_SIZE,
    CHOPPER_SIZE,
    chopper.x - CHOPPER_HALF,
    chopper.y - CHOPPER_HALF
  );
  
}
