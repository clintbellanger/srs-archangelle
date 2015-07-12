/**
 Controls the flow of action by sending new waves of enemies
 */

var COUNTER_WRAP = 360;

var waves = new Object();

waves.counter = 0;
waves.type = 0;
waves.complete = false;

waves.mob_count = 0;

// DEBUG MODE, quotes only
waves.TEST_QUOTES = false;

// TODO: tutorial should split into a separate gamestate?
waves.tutorial_complete = false;

function waves_logic() {

  waves.counter++;
  if (waves.counter == COUNTER_WRAP) {
     waves.counter = 0;

     // choose wave type
     waves.type = Math.floor(Math.random() * 7);
     
     // DEBUG MODE
     if (waves.TEST_QUOTES) waves.type = 0;
     
     waves.complete = false;
     waves.mob_count = 0;
  }

  switch (waves.type) {
    case 0: waves_logic_videocom(); break;
    case 1: waves_logic_a(); break;
    case 2: waves_logic_b(); break;
    case 3: waves_logic_c(); break;
    case 4: waves_logic_d(); break;
    case 5: waves_trillby_v(); break;
    case 6: waves_trillby_a(); break;
  }

}

function waves_logic_a() {
  if (waves.counter < 150) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fighter.add(32, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
    }
  }
  else if (waves.counter >= 150 && waves.counter < 300) {
    if (waves.counter % 25== 0) {
      waves.mob_count++;
      fighter.add(VIEW_WIDTH-32, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
      if (waves.counter == 275) waves.complete = true;
    }
  }
}

function waves_logic_b() {
  if (waves.counter < 150) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fighter.add(VIEW_WIDTH-32, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
    }
  }
  else if (waves.counter >= 150 && waves.counter < 300) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fighter.add(32, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
      if (waves.counter == 275) waves.complete = true;
    }
  }
}

function waves_logic_c() {
  if (waves.counter > 60 && waves.counter < 240) {
    if (waves.counter % 20 == 0) {
      waves.mob_count++;
      fighter.add(waves.counter, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
      if (waves.counter == 220) waves.complete = true;
    }
  }
}

function waves_logic_d() {
  if (waves.counter > 60 && waves.counter < 240) {
    if (waves.counter % 20 == 0) {
      waves.mob_count++;
      fighter.add(VIEW_WIDTH - waves.counter, -fighter.area.height_half, fighter.patterns.TRILLBY_STRAIGHT);
      if (waves.counter == 220) waves.complete = true;
    }
  }
}

function waves_trillby_v() {
  if (waves.counter >= 50 && waves.counter <= 125) {
     if (waves.counter % 25 === 0) {
       waves.mob_count += 2;
       fighter.add(VIEW_WIDTH/2 - fighter.area.width, -fighter.area.height_half, fighter.patterns.TRILLBY_LEFT);
       fighter.add(VIEW_WIDTH/2 + fighter.area.width, -fighter.area.height_half, fighter.patterns.TRILLBY_RIGHT);
       if (waves.counter == 180) waves.complete = true;
     }
  }
  if (waves.counter == 80) fighter.add(160, -fighter.area.height_half, fighter.patterns.BEARD_LEFT);
}

function waves_trillby_a() {
  if (waves.counter >= 50 && waves.counter <= 125) {
     if (waves.counter % 25 === 0) {
       waves.mob_count += 2;
       fighter.add(fighter.area.width, -fighter.area.height_half, fighter.patterns.TRILLBY_RIGHT);
       fighter.add(VIEW_WIDTH - fighter.area.width, -fighter.area.height_half, fighter.patterns.TRILLBY_LEFT);
       if (waves.counter == 180) waves.complete = true;
     }
  }
  if (waves.counter == 80) fighter.add(80, -fighter.area.height_half, fighter.patterns.BEARD_RIGHT);
}
   
// during this wave there are no new enemies
// instead there is a video communication break
function waves_logic_videocom() {
  if (waves.counter == 1) {
      
      if (!waves.tutorial_complete) {
      
        videocom.activate_brd();
        videocom.message_id = 0; // BRD intro
        waves.tutorial_complete = true;
        
      }
      else {
      
        // sometimes friendly
        var chance_brd = 0.2;
        var is_brd = Math.random() < chance_brd;
        if (is_brd) videocom.activate_brd();
        else videocom.activate_enemy();
      }
  }
  if (waves.counter == 60) waves.complete = true;
}




