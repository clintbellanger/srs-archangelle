/**
Fighter class ships have simple AI
- Tipping Trillbies
- Beard Mads
 */

var fighter = new Object();

fighter.init = function() {

  // list of active fighters on the screen  
  fighter.list = new Array();
  
  // stats keeping  
  fighter.total_spawned = 0;
  fighter.total_destroyed = 0;
  fighter.total_missed = 0;
  
  // the fighter class enemies are all a commonish size
  fighter.area = {
    width: 32, height: 32, width_half: 16, height_half: 16
  };

  fighter.tilts = {
    HARD_LEFT: 0,
    LEFT: 1,
    STRAIGHT: 2,
    RIGHT: 3,
    HARD_RIGHT: 4
  };
  
  // each base enemy type
  fighter.types = {
    TIPPING_TRILLBY:0,
    BEARD_MAD:1
  };

  // info common to base enemies
  fighter.stats = new Object();
  fighter.stats[fighter.types.TIPPING_TRILLBY] = {max_hp:2, img_id:imageset_load("images/enemies/fedora.png")};
  fighter.stats[fighter.types.BEARD_MAD]       = {max_hp:8, img_id:imageset_load("images/enemies/beard.png")};
  
  // various combat patterns used by base enemies
  // each of these will have its own logic() function
  fighter.patterns = {
    TRILLBY_STRAIGHT:0,
    TRILLBY_LEFT:1,
    TRILLBY_RIGHT:2,
    BEARD_LEFT:3,
    BEARD_RIGHT:4,
  };
  
  fighter.pattern_info = new Object();
  fighter.pattern_info[fighter.patterns.TRILLBY_STRAIGHT  ] = {fighter_type: fighter.types.TIPPING_TRILLBY};
  fighter.pattern_info[fighter.patterns.TRILLBY_LEFT ] = {fighter_type: fighter.types.TIPPING_TRILLBY};
  fighter.pattern_info[fighter.patterns.TRILLBY_RIGHT] = {fighter_type: fighter.types.TIPPING_TRILLBY};
  fighter.pattern_info[fighter.patterns.BEARD_LEFT ] = {fighter_type: fighter.types.BEARD_MAD};
  fighter.pattern_info[fighter.patterns.BEARD_RIGHT] = {fighter_type: fighter.types.BEARD_MAD};
}

fighter.add = function(x, y, pattern) {
  var new_fighter = new Object();
  new_fighter.x = x;
  new_fighter.y = y;
  new_fighter.pattern = pattern;
  var fighter_type = fighter.pattern_info[pattern].fighter_type;
  new_fighter.hp = fighter.stats[fighter_type].max_hp;
  new_fighter.ticker = 0;
  fighter.list.push(new_fighter);
  fighter.total++;
}

fighter.remove = function(fighter_id) {

  // efficiency if we remove the last element
  // instead of splicing the array?
  // but I didn't test.
  fighter.list[fighter_id] = fighter.list[fighter.list.length-1];
  fighter.list.pop();
}

fighter.logic = function() {
  for (var i=fighter.list.length-1; i>=0; i--) {
    fighter.move(i);
    if (fighter.offscreen(fighter.list[i].x, fighter.list[i].y)) {
      fighter.remove(i);
      fighter.total_missed++;
    }
  }
}

fighter.offscreen = function(x, y) {
  if (y > VIEW_HEIGHT + fighter.area.height_half) return true;
  if (x < -fighter.area.width_half) return true;
  if (x > VIEW_WIDTH + fighter.area.width_half) return true;
  return false;
}

fighter.move = function(fighter_id) {

  switch (fighter.list[fighter_id].pattern) {
  
    case fighter.patterns.TRILLBY_STRAIGHT:
      fighter.behavior_trillby_straight(fighter.list[fighter_id]);      
      break;
    case fighter.patterns.TRILLBY_LEFT:
      fighter.behavior_trillby_left(fighter.list[fighter_id]);
      break;
    case fighter.patterns.TRILLBY_RIGHT:
      fighter.behavior_trillby_right(fighter.list[fighter_id]);
      break;
    case fighter.patterns.BEARD_LEFT:
      fighter.behavior_beard_left(fighter.list[fighter_id]);
      break;      
    case fighter.patterns.BEARD_RIGHT:
      fighter.behavior_beard_right(fighter.list[fighter_id]);
      break;      
    }

}

fighter.player_accuracy = function() {

  var accuracy = 100;
  var total_enemies = fighter.total_destroyed + fighter.total_missed;
  if (total_enemies != 0) {
    accuracy = Math.floor((fighter.total_destroyed / total_enemies) * 100);
  }
  return accuracy;
}

fighter.render = function() {

  var img_id;
  for (var i=0; i<fighter.list.length; i++) {
    
    img_id = fighter.stats[fighter.pattern_info[fighter.list[i].pattern].fighter_type].img_id;
    
    fighter.render_single (
      img_id,
      fighter.list[i].x,
      fighter.list[i].y,
      fighter.list[i].tilt
    );
    
  }
}

fighter.render_single = function(img_id, x, y, tilt) {
    
  imageset_render(
    img_id,
    tilt * fighter.area.width,
    0,
    fighter.area.width,
    fighter.area.height,
    x - fighter.area.width_half,
    y - fighter.area.height_half
  );
}

/*** Custom Behaviors ***/
fighter.behavior_trillby_straight = function(trillby) {

  trillby.y +=2;
  
  // back and forth tilting pattern
  if (trillby.y < 80) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 85) trillby.tilt = fighter.tilts.LEFT;
  else if (trillby.y < 140) trillby.tilt = fighter.tilts.HARD_LEFT;  
  else if (trillby.y < 145) trillby.tilt = fighter.tilts.LEFT;
  else if (trillby.y < 150) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 155) trillby.tilt = fighter.tilts.RIGHT;
  else if (trillby.y < 200) trillby.tilt = fighter.tilts.HARD_RIGHT;
  else if (trillby.y < 205) trillby.tilt = fighter.tilts.RIGHT;
  else trillby.tilt = fighter.tilts.STRAIGHT;
  
}

fighter.behavior_trillby_left = function(trillby) {

  trillby.y += 2;

  if (trillby.y < 80) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 85) trillby.tilt = fighter.tilts.RIGHT;
  else if (trillby.y < 140) trillby.tilt = fighter.tilts.HARD_RIGHT;  
  else if (trillby.y < 145) trillby.tilt = fighter.tilts.RIGHT;
  else if (trillby.y < 150) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 155) {
    trillby.tilt = fighter.tilts.LEFT;
    trillby.x -= 1;
  }
  else if (trillby.y < 260) {
    trillby.tilt = fighter.tilts.HARD_LEFT;
    trillby.x -= 1;
  }
  else if (trillby.y < 265) {
    trillby.tilt = fighter.tilts.LEFT;
    trillby.x -= 1;
  }
  else trillby.tilt = fighter.tilts.STRAIGHT;

}

fighter.behavior_trillby_right = function(trillby) {

  trillby.y += 2;

  if (trillby.y < 80) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 85) trillby.tilt = fighter.tilts.LEFT;
  else if (trillby.y < 140) trillby.tilt = fighter.tilts.HARD_LEFT;  
  else if (trillby.y < 145) trillby.tilt = fighter.tilts.LEFT;
  else if (trillby.y < 150) trillby.tilt = fighter.tilts.STRAIGHT;
  else if (trillby.y < 155) {
    trillby.tilt = fighter.tilts.RIGHT;
    trillby.x += 1;
  }
  else if (trillby.y < 260) {
    trillby.tilt = fighter.tilts.HARD_RIGHT;
    trillby.x += 1;
  }
  else if (trillby.y < 265) {
    trillby.tilt = fighter.tilts.RIGHT;
    trillby.x += 1;
  }
  else trillby.tilt = fighter.tilts.STRAIGHT;
}


fighter.behavior_beard_left = function(beard) {

  if (beard.y < 150) {
    beard.y ++;
    beard.tilt = fighter.tilts.STRAIGHT;
  }
  else if (beard.ticker < 40) {
    beard.ticker++;
  }
  else if (beard.ticker < 50) {
    beard.ticker++;
    beard.x--;
    beard.tilt = fighter.tilts.LEFT;    
  }
  else {
    beard.x--;;
    beard.tilt = fighter.tilts.HARD_LEFT;
  }
  
}

fighter.behavior_beard_right = function(beard) {

  if (beard.y < 150) {
    beard.y ++;
    beard.tilt = fighter.tilts.STRAIGHT;
  }
  else if (beard.ticker < 40) {
    beard.ticker++;
  }
  else if (beard.ticker < 50) {
    beard.ticker++;
    beard.x++;
    beard.tilt = fighter.tilts.RIGHT;    
  }
  else {
    beard.x++;
    beard.tilt = fighter.tilts.HARD_RIGHT;
  }
  
}