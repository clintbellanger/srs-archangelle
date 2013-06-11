/**
 Particles and explosions etc.
 */

// explosion types and properties
var PARTICLE_EXLPOSION_SMALL = 0;
var PARTICLE_EXPLOSION_SMALL_SIZE = 8;
var PARTICLE_EXPLOSION_SMALL_HALF = 4;

var particles = new Object();

particles.list = new Array();

particles.img_id = 0;

function particles_init() {
  particles.img_id = imageset_load("images/particles.png");
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

	if (particles.list[i].frame == 10) {
	  particles_remove(i);
	}
	
  }
}

function particles_render() {
  for (var i=0; i<particles.list.length; i++) {
    particles_render_single(i);
  }
}

function particles_render_single(particle_id) {
  imageset_render(
    particles.img_id,
	Math.floor(particles.list[particle_id].frame /2) * PARTICLE_EXPLOSION_SMALL_SIZE,
	0,
	PARTICLE_EXPLOSION_SMALL_SIZE,
	PARTICLE_EXPLOSION_SMALL_SIZE,
	particles.list[particle_id].x - PARTICLE_EXPLOSION_SMALL_HALF,
	particles.list[particle_id].y - PARTICLE_EXPLOSION_SMALL_HALF
  );	
}
