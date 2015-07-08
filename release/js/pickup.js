/**
 Item pickup
 */

var pickup = new Object();

pickup.init = function() {

  // enumerate the types
  pickup.TYPE_UPVOTE = 0;
  pickup.TYPE_DOWNVOTE = 1;

  pickup.upvote_img = imageset_load("images/upvote.png");
  pickup.downvote_img = imageset_load("images/downvote.png");
  pickup.WIDTH = 8;
  pickup.HALFWIDTH = 4;

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
  if (Math.random() < 0.67) return pickup.TYPE_UPVOTE;
  return pickup.TYPE_DOWNVOTE;
}

pickup.reward = function(pickup_id) {
  var new_item = pickup.available_list[pickup_id].type;
  
  if (new_item == pickup.TYPE_UPVOTE) {
    chopper_powerup();
  }
  else if (new_item == pickup.TYPE_DOWNVOTE) {
    chopper_powerdown();
  }
  
  pickup.remove(pickup_id);
}

pickup.logic = function() {

  for (var i=pickup.available_list.length-1; i>=0; i--) {
    pickup.available_list[i].frame++;
    pickup.available_list[i].y += 1;
    
    if (pickup.available_list[i].frame == 8) {
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
  
  // use type to look up image id
  // TODO: make a pickup_type struct to contain the info about each pickup type
  if (pickup_type === pickup.TYPE_UPVOTE) {
    img_id = pickup.upvote_img;
  }
  else if (pickup_type === pickup.TYPE_DOWNVOTE) {
    img_id = pickup.downvote_img;
  }

  imageset_render(
    img_id,
    Math.floor(pickup.available_list[pickup_id].frame/2) * pickup.WIDTH,
    0,
    pickup.WIDTH,
    pickup.WIDTH,
    pickup.available_list[pickup_id].x - pickup.HALFWIDTH,
    pickup.available_list[pickup_id].y - pickup.HALFWIDTH
  );
    
}
