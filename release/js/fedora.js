/**
 Fedoras are a basic enemy ship
 */

var FEDORA_SIZE = 32;
var FEDORA_HALF = 16;

var FEDORA_STRAIGHT = 1;

var fedora = new Object();
fedora.list = new Array();
fedora.total = 0;
fedora.destroyed = 0;
fedora.img_id = 0;

function fedora_init() {
  fedora.img_id = imageset_load("images/enemies/fedora.png");
}

function fedora_add(x, y, pattern) {
  var new_fedora = new Object();
  new_fedora.x = x;
  new_fedora.y = y;
  new_fedora.pattern = pattern;
  new_fedora.hp = 2;
  fedora.list.push(new_fedora);
  fedora.total++;
}

function fedora_remove(fedora_id) {

  // efficiency if we remove the last element
  // instead of splicing the array?
  // but I didn't test.
  fedora.list[fedora_id] = fedora.list[fedora.list.length-1];
  fedora.list.pop();
}

function fedora_logic() {
  for (var i=fedora.list.length-1; i>=0; i--) {
    fedora_move(i);
    if (fedora.list[i].y >= VIEW_HEIGHT + FEDORA_HALF) {
      fedora_remove(i);
    }
  }
}


function fedora_move(fedora_id) {

  switch (fedora.list[fedora_id].pattern) {
  
    case FEDORA_STRAIGHT:
      fedora.list[fedora_id].y += 2;
      fedora.list[fedora_id].tilt = fedora_tilt(fedora.list[fedora_id].y);

      
      break;
  
  }

}

function fedora_tilt(y) {
  if (y < 80) return 2;
  if (y < 85) return 1;


  if (y < 140) return 0;
  if (y < 145) return 1;
  if (y < 150) return 2;
  if (y < 155) return 3;

  if (y < 200) return 4;
  if (y < 205) return 3;

  return 2;
}


function fedora_render() {
  for (var i=0; i<fedora.list.length; i++) {
    
    fedora_render_single (
      fedora.list[i].x,
      fedora.list[i].y,
      fedora.list[i].tilt
    );
    
  }
}

function fedora_render_single(x, y, tilt) {
    
  imageset_render(
    fedora.img_id,
    tilt * FEDORA_SIZE,
    0,
    FEDORA_SIZE,
    FEDORA_SIZE,
    x - FEDORA_HALF,
    y - FEDORA_HALF
  );
}

