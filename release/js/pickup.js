/**
 Item pickup
 */

var PICKUP_UPVOTE = 0;
var PICKUP_SIZE = 8;
var PICKUP_HALF = 4;
 
var pickup = new Object();
pickup.list = new Array();
pickup.img_id = 0;

function pickup_init() {
  pickup.img_id = imageset_load("images/upvote.png");
}

function pickup_add(type, x, y) {
  var new_pickup = new Object();
  new_pickup.type = type;
  new_pickup.x = x;
  new_pickup.y = y;
  new_pickup.frame = 0;
  pickup.list.push(new_pickup);
}

function pickup_remove(pickup_id) {
  pickup.list[pickup_id] = pickup.list[pickup.list.length-1];
  pickup.list.pop();
}

function pickup_logic() {

  for (var i=pickup.list.length-1; i>=0; i--) {
    pickup.list[i].frame++;
	pickup.list[i].y += 1;
	
	if (pickup.list[i].frame == 8) {
	  pickup.list[i].frame = 0;
	}
	
	// pickups disappear when leaving screen
	if (pickup.list[i].y > VIEW_HEIGHT) {
	  pickup_remove(i);
	}
  }

}

function pickup_render() {
  for (var i=0; i<pickup.list.length; i++) {
    pickup_render_single(i);
  }
}

function pickup_render_single(pickup_id) {

  imageset_render(
    pickup.img_id,
    Math.floor(pickup.list[pickup_id].frame/2) * PICKUP_SIZE,
	0,
	PICKUP_SIZE,
	PICKUP_SIZE,
	pickup.list[pickup_id].x - PICKUP_HALF,
	pickup.list[pickup_id].y - PICKUP_HALF
  );
	
}
