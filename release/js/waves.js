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
     waves.type = Math.floor(Math.random() * 5);
     
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
    
  }

}

function waves_logic_a() {
  if (waves.counter < 150) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fedora_add(32, -32, FEDORA_STRAIGHT);
    }
  }
  else if (waves.counter >= 150 && waves.counter < 300) {
    if (waves.counter % 25== 0) {
      waves.mob_count++;
      fedora_add(VIEW_WIDTH-32, -32, FEDORA_STRAIGHT);
      if (waves.counter == 275) waves.complete = true;
    }
  }
}

function waves_logic_b() {
  if (waves.counter < 150) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fedora_add(VIEW_WIDTH-32, -32, FEDORA_STRAIGHT);
    }
  }
  else if (waves.counter >= 150 && waves.counter < 300) {
    if (waves.counter % 25 == 0) {
      waves.mob_count++;
      fedora_add(32, -32, FEDORA_STRAIGHT);
      if (waves.counter == 275) waves.complete = true;
    }
  }
}

function waves_logic_c() {
  if (waves.counter > 60 && waves.counter < 240) {
    if (waves.counter % 20 == 0) {
      waves.mob_count++;
      fedora_add(waves.counter, -32, FEDORA_STRAIGHT);
      if (waves.counter == 220) waves.complete = true;
    }
  }
}

function waves_logic_d() {
  if (waves.counter > 60 && waves.counter < 240) {
    if (waves.counter % 20 == 0) {
      waves.mob_count++;
      fedora_add(VIEW_WIDTH - waves.counter, -32, FEDORA_STRAIGHT);
      if (waves.counter == 220) waves.complete = true;
    }
  }
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




