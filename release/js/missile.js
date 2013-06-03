/*
 Handles all projectiles that aren't ships
 */
 
var missile = new Object();

missile.img = new Image();
missile.img_loaded = false;


function missile_init() {
  missile.img.src = "images/dild_missile.png";
  missile.img.onload = function() {missile_onload();};
}

function missile_onload() {
  missile.img_loaded = true;
}

function missile_render() {


}

