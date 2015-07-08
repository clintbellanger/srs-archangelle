/*
 Videocom chatter
 A possible random event that happens within waves.
 */
 
var videocom = new Object();

videocom.init = function() {

  // pop-up gui border image, with translucent text backghround area
  videocom.border = imageset_load("images/interface/videocom.png");
  videocom.border_width = 216;
  videocom.border_height = 73;
  videocom.border_screen_x = 12;
  videocom.border_screen_y = 20;
  
  // a set of enemy portraits in a row
  videocom.enemies = imageset_load("images/interface/2bit_faces_by_Buch.png");
  videocom.portrait_width = 48;
  videocom.portrait_height = 64;
  videocom.portrait_options = 12;  
  videocom.portrait_screen_x = 16;
  videocom.portrait_screen_y = 24;
  videocom.current_portrait = 0;
  
  // message settings
  videocom.message_id = 0;
  videocom.message_screen_x = 80;
  videocom.message_screen_y = 32;
  videocom.message_lineheight = 12;
  videocom.show_message = false;
  
  // used to animate the portrait intro and outro
  // some static that is 3x the size of a portrait
  // draw from a random location each frame
  videocom.static_field = imageset_load("images/interface/static.png");
  videocom.currently_static = true;
  
  // keep an internal timer for animations 
  videocom.timer = 0;
  videocom.maxtimer = 360; // 6 seconds at 60 fps
  
  // 
  videocom.active = false;
}

videocom.activate = function() {
  videocom.active = true;
  videocom.timer = 0;
  
  // choose random portrait
  videocom.current_portrait = Math.floor(Math.random() * videocom.portrait_options)
  
  // choose random quote  
  videocom.message_id = Math.floor(Math.random() * quotes.length); 
}

videocom.deactivate = function() {
  videocom.active = false;
}

videocom.logic = function() {
 
  if (!videocom.active) return;
  videocom.timer++;
  if (videocom.timer >= videocom.maxtimer) videocom.deactivate();

  half_second = 30;
  
  // portrait logic
  // whow static at the beginning
  if (videocom.timer < half_second)
    videocom.currently_static = true;    
  // show static at the ending
  else if (videocom.timer > videocom.maxtimer - half_second)
    videocom.currently_static = true;    
  // show the portrait in the middle
  else
    videocom.currently_static = false;
  
  if (videocom.timer < half_second)
    videocom.show_message = false;
  else videocom.show_message = true;
  
}

videocom.render = function() {
  if (!videocom.active) return;
  
  if (videocom.currently_static) videocom.render_static();
  else videocom.render_portrait(videocom.current_portrait);
    
  videocom.render_border();
  if (videocom.show_message) videocom.render_message(videocom.message_id);
}

videocom.render_portrait = function(portrait_id) {

  // portraits are in a horizontal strip
  src_x = portrait_id * videocom.portrait_width;
  
  imageset_render(
    videocom.enemies,
    src_x,
    0,
    videocom.portrait_width,
    videocom.portrait_height,
    videocom.portrait_screen_x,
    videocom.portrait_screen_y
  );
}

videocom.render_border = function() {
   imageset_render(
     videocom.border,
     0,
     0,
     videocom.border_width,
     videocom.border_height,
     videocom.border_screen_x,
     videocom.border_screen_y
   );
}

videocom.render_static = function() {
  imageset_render(
    videocom.static_field,
    Math.floor(Math.random() * videocom.portrait_width * 2),
    Math.floor(Math.random() * videocom.portrait_height * 2),
    videocom.portrait_width,
    videocom.portrait_height,
    videocom.portrait_screen_x,
    videocom.portrait_screen_y    
  );
}

videocom.render_message = function(message_id) {
  screen_y = videocom.message_screen_y;
  bitfont_render(quotes[message_id][0], videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
  screen_y += videocom.message_lineheight;
  bitfont_render(quotes[message_id][1], videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
  screen_y += videocom.message_lineheight;
  bitfont_render(quotes[message_id][2], videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
}

