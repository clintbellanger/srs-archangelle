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
  
  // brd can also chime in
  videocom.brd = imageset_load("images/interface/brd.png");
  
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
  
  videocom.active = false;
  videocom.is_friendly = false;
}

videocom.activate_enemy = function() {
  videocom.active = true;
  videocom.timer = 0;
  videocom.is_friendly = false;
  
  // choose random portrait
  videocom.current_portrait = Math.floor(Math.random() * videocom.portrait_options);
  
  // choose random quote  
  videocom.message_id = Math.floor(Math.random() * quotes.length); 
}

videocom.activate_brd = function() {
  videocom.active = true;
  videocom.timer = 0;  
  videocom.is_friendly = true;
  
  // 0 is reserved tutorial/intro
  videocom.message_id = Math.floor(Math.random() * 4) +1;
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
  else if (videocom.is_friendly) videocom.render_brd();
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

videocom.render_brd = function() {

  imageset_render(
    videocom.brd,
    0,
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
  if (videocom.is_friendly)
     videocom.render_friendly_message(message_id);
  else
     videocom.render_enemy_message(message_id);
}

// standard static message 
videocom.render_enemy_message = function(message_id) {
  
  var str1 = quotes[message_id][0];
  var str2 = quotes[message_id][1];
  var str3 = quotes[message_id][2];
  videocom.render_lines(str1, str2, str3);  
}

// sometimes dynamic messages
videocom.render_friendly_message = function(message_id) {

  var str1 = "";
  var str2 = "";
  var str3 = "";
  
  // scratch vars
  var total_enemies;
  var accuracy;
  
  switch (message_id) {
  
    case 0:
      str1 = "Welcome cadet! Pilot the"
      str2 = "Brd to victory and let";
      str3 = "loose the dilds of war!";
      break;
      
    case 1:
      str1 = "Cadet! You have launched";
      str2 = missile.total + " Dilds!";
      str3 = "Amazing!";  
      break;
      
    case 2:
      
      total_enemies = fedora.destroyed + fedora.missed;

      if (total_enemies === 0) accuracy = 100;
      else accuracy = Math.floor((fedora.destroyed / total_enemies) * 100);
      
      str1 = "Cadet! Your accuracy is";
      str2 = accuracy + "%!";
      str3 = "Keep it up!";
      break;
      
    case 3:
    
      str1 = "Collect orange upvotes";
      str2 = "to power up your dilds!";
      break;
      
    case 4:
    
      str1 = "Avoid blue downvotes!";
      str2 = "They will disrupt your";
      str3 = "dilds multiplier.";
      break;
      
  }

  videocom.render_lines(str1, str2, str3);  
}

videocom.render_lines = function(str1, str2, str3) {
  screen_y = videocom.message_screen_y;
  bitfont_render(str1, videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
  screen_y += videocom.message_lineheight;
  bitfont_render(str2, videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
  screen_y += videocom.message_lineheight;
  bitfont_render(str3, videocom.message_screen_x, screen_y, JUSTIFY_LEFT);
}
