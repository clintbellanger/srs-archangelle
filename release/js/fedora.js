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

fedora.img = new Image();
fedora.img_loaded = false;

function fedora_init() {
  fedora.img.src = "images/enemies/fedora.png";
  fedora.img.onload = function() {fedora_onload();};
}

function fedora_onload() {
  fedora.img_loaded = true;
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
    if (fedora.list[i].y >= 256) {
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
  if (y < 45) return 2;
  if (y < 50) return 1;


  if (y < 90) return 0;
  if (y < 95) return 1;
  if (y < 100) return 2;
  if (y < 105) return 3;

  if (y < 150) return 4;
  if (y < 155) return 3;

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
  if (!fedora.img_loaded) return;
  
  ctx.drawImage(
    fedora.img,
    tilt * FEDORA_SIZE,
    0,
    FEDORA_SIZE,
    FEDORA_SIZE,
    (x - FEDORA_HALF) * SCALE,
    (y - FEDORA_HALF) * SCALE,
    FEDORA_SIZE * SCALE,
    FEDORA_SIZE * SCALE
  );
}

