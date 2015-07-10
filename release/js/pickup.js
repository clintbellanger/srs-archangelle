/**
 Item pickup
 */

var pickup = new Object();

pickup.init = function() {

  pickup.type_missile_up = 0;

  pickup.missile_img = imageset_load("images/dild_powerup.png");
  pickup.width = 20;
  pickup.halfwidth = 10;
  pickup.frame_duration = 5;
  pickup.frame_count = 4;
  
  pickup.available_list = new Array();  
  
}

pickup.add = function(type, x, y) {
  var new_pickup = new Object();
  new_pickup.type = type;
  new_pickup.x = x;
  new_pickup.y = y;
  new_pickup.frame = 0;
  pickup.available_list.push(new_pickup);
}

pickup.add_random = function(x, y) {
  var rand_type = pickup.choose_random();
  pickup.add(rand_type, x, y);
}

pickup.remove = function(pickup_id) {

  pickup.available_list[pickup_id] = pickup.available_list[pickup.available_list.length-1];
  pickup.available_list.pop();
}

pickup.choose_random = function() {

  // currently only one drop type
  return pickup.type_missile_up;
}

pickup.reward = function(pickup_id) {
  var new_item = pickup.available_list[pickup_id].type;
  
  if (new_item === pickup.type_missile_up) {
    chopper_powerup();
  }
  
  pickup.remove(pickup_id);
}

pickup.logic = function() {

  for (var i=pickup.available_list.length-1; i>=0; i--) {
    pickup.available_list[i].frame++;
    pickup.available_list[i].y += 1;
    
    if (pickup.available_list[i].frame === (pickup.frame_count * pickup.frame_duration)) {
      pickup.available_list[i].frame = 0;
    }
    
    // pickups disappear when leaving screen
    if (pickup.available_list[i].y > VIEW_HEIGHT) {
      pickup.remove(i);
    }
  }
}

pickup.render = function() {
  for (var i=0; i<pickup.available_list.length; i++) {
    pickup.render_single(i);
  }
}

pickup.render_single = function(pickup_id) {

  var img_id;
  var pickup_type = pickup.available_list[pickup_id].type;
  
  // TODO: make a pickup_type struct to contain the info about each pickup type
  if (pickup_type === pickup.type_missile_up) {
    img_id = pickup.missile_img;
  }

  imageset_render(
    img_id,
    Math.floor(pickup.available_list[pickup_id].frame / pickup.frame_duration) * pickup.width,
    0,
    pickup.width,
    pickup.width,
    pickup.available_list[pickup_id].x - pickup.halfwidth,
    pickup.available_list[pickup_id].y - pickup.halfwidth
  );
    
}
