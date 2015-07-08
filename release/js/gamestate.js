/**
 Primary game state switcher
 
 */
 
var STATE_PLAY = 0;
var STATE_TITLE = 1;
 
var gamestate = STATE_TITLE;

function gamestate_logic() {

  switch(gamestate) {
    case STATE_PLAY:
      waves_logic();
	  starfield_logic();
	  chopper_logic();
      chopper_logic_shoot();
      missile.logic();
      fedora_logic();
	  particles_logic();
	  pickup.logic();
      collide_dildo_fedora();
      collide_fedora_archangelle();
	  collide_pickup_archangelle();
      videocom.logic();
	  imageset_logic();
	  break;
      
    case STATE_TITLE: 
      title.logic();
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
	  pickup.render();
      
      videocom.render();
	  
      // HUD stuff, move to new location
      bitfont_render("Dilds " + chopper_dilds_per_shot() + "x", UI_MARGIN, UI_MARGIN, JUSTIFY_LEFT);
      // bitfont_render("Dilds Fired: " + missile.total, UI_MARGIN, UI_MARGIN, JUSTIFY_LEFT);
      bitfont_render(fedora.destroyed + " Bens", VIEW_WIDTH - UI_MARGIN, UI_MARGIN, JUSTIFY_RIGHT);

	  break;
      
    case STATE_TITLE:
      title.render();
      break;
  }
  
}

