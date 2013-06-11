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
        
		particles_add(
		  PARTICLE_EXLPOSION_SMALL,
		  missile.list[j].x,
		  missile.list[j].y
		);
		
        missile_remove(j);
        // todo: create missile explosion animation
		

        fedora.list[i].hp--;
        if (fedora.list[i].hp <= 0) {
          fedora_remove(i);
          fedora.destroyed++;

          // todo: create fedora explode animation
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
        chopper.x - CHOPPER_HALF,
        chopper.y - CHOPPER_HALF,
        CHOPPER_SIZE,
        CHOPPER_SIZE
     );
  
     if (contact) {

        fedora_remove(i);

        chopper.power--;
        if (chopper.power <= 0) {
          chopper.power = 1;
        }

     }
  }

}

