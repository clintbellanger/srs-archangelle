/**
 Primary game state switcher
 
 */
 
var STATE_PLAY = 0;
 
var gamestate = STATE_PLAY;

function gamestate_logic() {

  switch(gamestate) {
    case STATE_PLAY:
	  starfield_logic();
	  chopper_logic();
      missile_logic();
	  break;
  } 
}

function gamestate_render() {

  // clear canvas
  ctx.fillRect(0,0,320*SCALE,240*SCALE);

  switch(gamestate) {
    case STATE_PLAY:	
      starfield_render();	
      missile_render();
      chopper_render();
	  break;
  }
}

