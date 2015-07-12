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

function collide_dildo_fighter() {
  var contact = false;

  for (var i = fighter.list.length -1; i >= 0; i--) {
    for (var j = missile.list.length -1; j >= 0; j--) {
      contact = overlap (
        fighter.list[i].x - fighter.area.width_half,
        fighter.list[i].y - fighter.area.height_half,
        fighter.area.width,
        fighter.area.height,
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
                
        // harm fighter and check for ben
        fighter.list[i].hp--;
        if (fighter.list[i].hp <= 0) {
        
          // ben explosion animation
          particles_add(
            PARTICLE_BEN,
            fighter.list[i].x,
            fighter.list[i].y
          );
          
          waves.mob_count--;
          
          // is this the last one of this wave?
          if (waves.mob_count == 0 && waves.complete) {
            
            // do reward
            pickup.add_random(fighter.list[i].x, fighter.list[i].y);
          
          }
                  
          fighter.remove(i);
          fighter.total_destroyed++;

        }

        break;
      }

    }
  }

}

function collide_fighter_archangelle() {
  var contact = false;

  for (var i = fighter.list.length -1; i >= 0; i--) {
     contact = overlap (
        fighter.list[i].x - fighter.area.width_half,
        fighter.list[i].y - fighter.area.height_half,
        fighter.area.width,
        fighter.area.height,
        chopper.x - CHOPPER_COLLISION_WIDTH/2,
        chopper.y - CHOPPER_COLLISION_HEIGHT/2,
        CHOPPER_COLLISION_WIDTH,
        CHOPPER_COLLISION_HEIGHT
     );
  
     if (contact) {

         // ben explosion animation
        particles_add(
          PARTICLE_BEN,
          fighter.list[i].x,
          fighter.list[i].y
        );
          
        fighter.remove(i);
        fighter.total_destroyed++;

        chopper_powerdown();
        
        imageset.shaking = 10;

     }
  }

}

function collide_pickup_archangelle() {
  var contact = false;
  for (var i = pickup.available_list.length -1; i >= 0; i--) {
    contact = overlap (
      pickup.available_list[i].x - pickup.halfwidth,
      pickup.available_list[i].y - pickup.halfwidth,
      pickup.width,
      pickup.width,          
      chopper.x - CHOPPER_HALF,
      chopper.y - CHOPPER_HALF,
      CHOPPER_SIZE,
      CHOPPER_SIZE
   );
    
    if (contact) {
      pickup.reward(i);
    }
  }
}
