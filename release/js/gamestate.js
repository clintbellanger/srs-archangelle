/**
 Primary game state switcher
 
 */
 
var STATE_PLAY = 0;
 
var gamestate = STATE_PLAY;

function gamestate_logic() {

  switch(gamestate) {
    case STATE_PLAY:
      waves_logic();
	  starfield_logic();
	  chopper_logic();
      missile_logic();
      fedora_logic();
      collide_dildo_fedora();
      collide_fedora_archangelle();
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
      fedora_render();
      chopper_render();

      // HUD stuff, move to new location
      bitfont_render("Dilds fired: " + missile.total, 2, 2, JUSTIFY_LEFT);
      bitfont_render("Bens: " + fedora.destroyed, 318, 2, JUSTIFY_RIGHT);

	  break;
  }
}

