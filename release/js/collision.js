/* AABB collision
   Plus the loops to check collision */

function overlap(x1, y1, w1, h1, x2, y2, w2, h2) {

  // first rect is entirely left of second rect
  if (x1 + w1 < x2) return false;

  // first rect is entirely right of second rect
  if (x1 > x2 + w2) return false;

  // first rect is entire over second rect
  if (y1 + h1 < y2) return false;

  // first rect is entirely below second rect
  if (y1 > y2 + h2) return false;

  // must be an overlap
  return true;

}

function collide_dildo_fedora() {
  var contact = false;

  for (var i = fedora.list.length -1; i >= 0; i--) {
    for (var j = missile.list.length -1; j >= 0; j--) {
      contact = overlap (
        fedora.list[i].x - FEDORA_HALF,
        fedora.list[i].y - FEDORA_HALF,
        FEDORA_SIZE,
        FEDORA_SIZE,
        missile.list[j].x - MISSILE_WIDTH_HALF,
        missile.list[j].y - MISSILE_HEIGHT_HALF,
        MISSILE_WIDTH,
        MISSILE_HEIGHT
      );
      
      if (contact) {
        
		// todo: create missile explosion animation
		particles_add(
		  PARTICLE_PIP,
		  missile.list[j].x,
		  missile.list[j].y
		);
		
        missile.remove(j);
        		
        // harm fedora and check for ben
        fedora.list[i].hp--;
        if (fedora.list[i].hp <= 0) {
		
		  // ben explosion animation
		  particles_add(
		    PARTICLE_BEN,
		    fedora.list[i].x,
		    fedora.list[i].y
		  );
		  
		  waves.mob_count--;
		  
		  // is this the last one of this wave?
		  if (waves.mob_count == 0 && waves.complete) {
		    
			// do reward
			pickup_add(PICKUP_UPVOTE, fedora.list[i].x, fedora.list[i].y);
		  
		  }
				  
          fedora_remove(i);
          fedora.destroyed++;

        }

        break;
      }

    }
  }

}

function collide_fedora_archangelle() {
  var contact = false;

  for (var i = fedora.list.length -1; i >= 0; i--) {
     contact = overlap (
        fedora.list[i].x - FEDORA_HALF,
        fedora.list[i].y - FEDORA_HALF,
        FEDORA_SIZE,
        FEDORA_SIZE,
        chopper.x - CHOPPER_COLLISION_WIDTH/2,
        chopper.y - CHOPPER_COLLISION_HEIGHT/2,
        CHOPPER_COLLISION_WIDTH,
        CHOPPER_COLLISION_HEIGHT
     );
  
     if (contact) {

	 	// ben explosion animation
		particles_add(
		  PARTICLE_BEN,
		  fedora.list[i].x,
		  fedora.list[i].y
		);
		  
        fedora_remove(i);
        fedora.destroyed++;

        chopper_powerdown();
        
		imageset.shaking = 10;

     }
  }

}

function collide_pickup_archangelle() {
  var contact = false;
  for (var i = pickup.list.length -1; i >= 0; i--) {
    contact = overlap (
      pickup.list[i].x - PICKUP_HALF,
      pickup.list[i].y - PICKUP_HALF,
      PICKUP_SIZE,
      PICKUP_SIZE,	  	
	  chopper.x - CHOPPER_HALF,
      chopper.y - CHOPPER_HALF,
      CHOPPER_SIZE,
      CHOPPER_SIZE
	);
	
	if (contact) {
	  pickup_remove(i);
      chopper_powerup();

	}
  }
}
