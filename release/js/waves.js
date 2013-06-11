/**
 Controls the flow of action by sending new waves of enemies
 */

var COUNTER_WRAP = 360;

var waves = new Object();

waves.counter = 0;
waves.type = 0;
waves.complete = false;

waves.mob_count = 0;

function waves_logic() {

  waves.counter++;
  if (waves.counter == COUNTER_WRAP) {
     waves.counter = 0;

     // choose wave type
     waves.type = Math.floor(Math.random() * 4);
	 waves.complete = false;
	 waves.mob_count = 0;
  }

  switch (waves.type) {
    case 0: waves_logic_a(); break;
    case 1: waves_logic_b(); break;
    case 2: waves_logic_c(); break;
    case 3: waves_logic_d(); break;
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
      fedora_add(288, -32, FEDORA_STRAIGHT);
	  if (waves.counter == 275) waves.complete = true;
    }
  }
}

function waves_logic_b() {
  if (waves.counter < 150) {
    if (waves.counter % 25 == 0) {
	  waves.mob_count++;
      fedora_add(288, -32, FEDORA_STRAIGHT);
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
      fedora_add(320 - waves.counter, -32, FEDORA_STRAIGHT);
	  if (waves.counter == 220) waves.complete = true;
    }
  }
}





