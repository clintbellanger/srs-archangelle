/**
 Handle images
 */
 
var imageset = new Object();
imageset.list = new Array();
imageset.loaded = 0;

imageset.offset_x = 0;
imageset.offset_y = 0;
imageset.shaking = 0;

/**
 * Load filename
 * Return unique ID
 */
function imageset_load(filename) {
  var new_img = new Image();
  new_img.src = filename;
  new_img.onload = function() {imageset_onload();};
  imageset.list.push(new_img);
  
  // the last image in the list is the new one
  return (imageset.list.length -1);
}

function imageset_onload() {
  imageset.loaded++;
}

function imageset_logic() {
  if (imageset.shaking > 0) {
    imageset.shaking--;	
	imageset.offset_x = Math.floor(Math.random() * 8) - 4;
	imageset.offset_y = Math.floor(Math.random() * 8) - 4;
  }
  else {
    imageset.offset_x = 0;
	imageset.offset_y = 0;
  }
}

function imageset_render(img_id, src_x, src_y, src_w, src_h, dest_x, dest_y) {

  if (imageset.loaded < imageset.list.length) return;
  
  ctx.drawImage(
    imageset.list[img_id],
    src_x,
    src_y,
	src_w,
	src_h,
	(imageset.offset_x + dest_x) * SCALE,
	(imageset.offset_y + dest_y) * SCALE,
	src_w * SCALE,
	src_h * SCALE
  );
  
}
