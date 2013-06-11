/**
 Particles and explosions etc.
 */

// explosion types and properties
var PARTICLE_PIP = 0;
var PARTICLE_PIP_SIZE = 8;
var PARTICLE_PIP_HALF = 4;
var PARTICLE_PIP_FRAMES = 10;

var PARTICLE_BEN = 1;
var PARTICLE_BEN_SIZE = 32;
var PARTICLE_BEN_HALF = 16;
var PARTICLE_BEN_FRAMES = 12;

var PARTICLE_FRAME_DURATION = 2;

var particles = new Object();
particles.list = new Array();


particles.img_pip = 0;
particles.img_ben = 0;

function particles_init() {
  particles.img_pip = imageset_load("images/particles.png");
  particles.img_ben = imageset_load("images/ben.png");
}

function particles_add(type, x, y) {
  var new_particle = new Object();
  new_particle.type = type;
  new_particle.x = x;
  new_particle.y = y;
  new_particle.frame = 0;
  particles.list.push(new_particle);
}

function particles_remove(particle_id) {
  particles.list[particle_id] = particles.list[particles.list.length-1];
  particles.list.pop();
}

function particles_logic() {

  for (var i=particles.list.length-1; i>=0; i--) {
    particles.list[i].frame++;

	if (particles.list[i].type == PARTICLE_PIP) {
	  if (particles.list[i].frame == 10) {
	    particles_remove(i);
		continue;
	  }
    }

	if (particles.list[i].type == PARTICLE_BEN) {
	  if (particles.list[i].frame == PARTICLE_BEN_FRAMES) {
	    particles_remove(i);
		continue;
	  }
    }
	
  }
}

function particles_render() {
  for (var i=0; i<particles.list.length; i++) {
    particles_render_single(i);
  }
}

function particles_render_single(particle_id) {

  if (particles.list[particle_id].type == PARTICLE_PIP) {

    imageset_render(
      particles.img_pip,
      Math.floor(particles.list[particle_id].frame /2) * PARTICLE_PIP_SIZE,
	  0,
	  PARTICLE_PIP_SIZE,
	  PARTICLE_PIP_SIZE,
	  particles.list[particle_id].x - PARTICLE_PIP_HALF,
	  particles.list[particle_id].y - PARTICLE_PIP_HALF
    );
  
  }
  else if (particles.list[particle_id].type == PARTICLE_BEN) {

    imageset_render(
      particles.img_ben,
      Math.floor(particles.list[particle_id].frame / PARTICLE_FRAME_DURATION) * PARTICLE_BEN_SIZE,
	  0,
	  PARTICLE_BEN_SIZE,
	  PARTICLE_BEN_SIZE,
	  particles.list[particle_id].x - PARTICLE_BEN_HALF,
	  particles.list[particle_id].y - PARTICLE_BEN_HALF
    );  
	
  }  
    
}
