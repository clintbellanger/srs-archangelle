/*
 Title screen system
 */
var title = new Object();

title.init = function() {
  title.button_rect  = imageset_load("images/interface/button_rect.png");
  title.button_left  = imageset_load("images/interface/button_left.png");
  title.button_right = imageset_load("images/interface/button_right.png");
  title.game_title = imageset_load("images/title.png");
  
  title.button_pos = new Object();
  title.button_pos.x = VIEW_WIDTH/2 - 32;
  title.button_pos.y = VIEW_HEIGHT - 116;
  title.button_pos.w = 64;
  title.button_pos.h = 32;
}

title.logic = function() {
  starfield_logic();
  chopper_logic();
  
  // enter play mode
  if (pressing.action) gamestate = STATE_PLAY;
  
  if (pressing.mouse) {
    if (isWithin(mouse_pos, title.button_pos)) {
      gamestate = STATE_PLAY;
    }  
  }
}

title.render = function() {
  
  margin = 8;
  starfield_render();
  
  // attract mode tutorial controls
  imageset_render(title.button_left, 0, 0, 48, 48, UI_MARGIN, VIEW_HEIGHT - UI_MARGIN - 48);
  imageset_render(title.button_right, 0, 0, 48, 48, VIEW_WIDTH - UI_MARGIN - 48, VIEW_HEIGHT - UI_MARGIN - 48);
  
  // "get in" start button
  imageset_render(
    title.button_rect, 0, 0,
    title.button_pos.w,
    title.button_pos.h,
    title.button_pos.x,
    title.button_pos.y
  );
    
  chopper_render();
  
  // temp title
  imageset_render(title.game_title, 0, 0, 178, 16, VIEW_WIDTH/2-89, VIEW_HEIGHT * 0.3);
  // bitfont_render("SRS Archangelle", VIEW_WIDTH/2, VIEW_HEIGHT * 0.3, JUSTIFY_CENTER);
  
  // temp story
  story_y = VIEW_HEIGHT * 0.55;  
  bitfont_render("Reddit sector SRS Prime", VIEW_WIDTH/2, story_y, JUSTIFY_CENTER);
  story_y += 12;
  bitfont_render("is being brigaded by Shitlords.", VIEW_WIDTH/2, story_y, JUSTIFY_CENTER);
  story_y += 12;
  bitfont_render("The Archangelles need You!", VIEW_WIDTH/2, story_y, JUSTIFY_CENTER);
  
  bitfont_render("- GET IN -", VIEW_WIDTH/2, VIEW_HEIGHT - 104, JUSTIFY_CENTER);
}
