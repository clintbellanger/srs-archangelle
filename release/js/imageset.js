/**
 Handle images
 */
 
var imageset = new Object();
imageset.list = new Array();
imageset.loaded = 0;

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

function imageset_render(img_id, src_x, src_y, src_w, src_h, dest_x, dest_y) {

  if (imageset.loaded < imageset.list.length) return;
  
  ctx.drawImage(
    imageset.list[img_id],
    src_x,
    src_y,
	src_w,
	src_h,
	dest_x * SCALE,
	dest_y * SCALE,
	src_w * SCALE,
	src_h * SCALE
  );
  
}
