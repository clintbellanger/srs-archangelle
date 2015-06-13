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
      missile.logic();
      fedora_logic();
	  particles_logic();
	  pickup_logic();
      collide_dildo_fedora();
      collide_fedora_archangelle();
	  collide_pickup_archangelle();
	  imageset_logic();
	  break;
  } 
}

function gamestate_render() {

  // clear canvas
  ctx.fillRect(0, 0, VIEW_WIDTH * SCALE, VIEW_HEIGHT * SCALE);

  switch(gamestate) {
    case STATE_PLAY:	
      starfield_render();
      missile.render();
      fedora_render();
      chopper_render();
      particles_render();
	  pickup_render();
	  
      // HUD stuff, move to new location
      var margin = 4;
      bitfont_render("Dilds: " + missile.total, margin, margin, JUSTIFY_LEFT);
      bitfont_render("Bens: " + fedora.destroyed, VIEW_WIDTH-margin, margin, JUSTIFY_RIGHT);

	  break;
  }
}

