var elusive_pacman_alive=true;
var context;
var shape = new Object();
var elusive_pacman_object=new Object()
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var enemy_interval;
var login_user;
var active_divs = []
var last_position = 4;
var last_elusive_pacman_position = 4;
var total_balls = 75;
var ball_5_point_color = "#000000"
var ball_15_point_color = "#FF0000"
var ball_25_point_color = "#FFFF00"
var total_time = 90;
var num_monsters = 2;
var monster_array=new Array();
var up_key_code = "ArrowUp";
var down_key_code = "ArrowDown";
var left_key_code = "ArrowLeft";
var right_key_code = "ArrowRight";
var music_mode = true;
var sound_mode = true;
var lives;
var ball_5_text_color;
var ball_15_text_color;
var ball_25_text_color;



function GameMenu(login_user) {
    this.login_user = login_user;
    BarGameUpdate();
	var gamemenu_div = document.createElement("DIV");
	gamemenu_div.id = "welcome";

	active_divs.push(gamemenu_div);

	document.getElementById("content").appendChild(gamemenu_div);

	var gamemenu_ul = document.createElement("UL");
	gamemenu_ul.id = "welcome_ul";

	gamemenu_div.appendChild(gamemenu_ul);

	var gamestart_button = document.createElement("button");
	gamestart_button.innerHTML = "Start Game";
	gamestart_button.addEventListener ("click", function() {
		gamemenu_div.remove();
		active_divs = [];
		GameStart();
	});
	var gamestart_li = document.createElement("LI");
	gamestart_li.appendChild(gamestart_button);
	gamemenu_ul.appendChild(gamestart_li);

	var setting_button = document.createElement("button");
	setting_button.innerHTML = "Setting";
	gamemenu_ul.appendChild(setting_button);
	setting_button.addEventListener ("click", function() {
		gamemenu_div.remove();
		active_divs = [];
		GameSetting(); //change to setting.
	});
	var setting_li = document.createElement("LI");
	setting_li.appendChild(setting_button);
	gamemenu_ul.appendChild(setting_li);
}

function moveGameMenu(){
    clearPage();
    window.clearInterval(interval);
    window.clearInterval(enemy_interval);
    document.getElementById('content').style.height = "680px";
    GameMenu(login_user);   
}

function moveWellcomeFromGame(){
    window.clearInterval(interval);
    window.clearInterval(enemy_interval);
    document.getElementById('content').style.height = "680px";
    BarHomeUpdate();
    moveWellcome();
}

function BarGameUpdate(){
    document.getElementById("menu_bar").remove();
    var menu_bar_ul = document.createElement('UL');
    menu_bar_ul.id = "menu_bar";
    document.getElementById("menu").appendChild(menu_bar_ul);

    var username_li = document.createElement("LI");
    menu_bar_ul.appendChild(username_li);

    var welcome_li = document.createElement("LI");
    menu_bar_ul.appendChild(welcome_li);

    var gamemenu_li = document.createElement("LI");
    menu_bar_ul.appendChild(gamemenu_li);

    var username_a = document.createElement("A");
    username_a.id = 'hello_user';
    username_a.innerText = "Hello " + login_user + ".";
    username_li.appendChild(username_a);

    var welcome_a = document.createElement("A");
    welcome_a.setAttribute('onclick',"return moveWellcomeFromGame()");
    welcome_a.className = "menu_button";
    welcome_a.innerText = "Logout";
    welcome_li.appendChild(welcome_a);

    var gamemenu_a = document.createElement("A");
    gamemenu_a.setAttribute('onclick',"return moveGameMenu()");
    gamemenu_a.innerText = "GameMenu";
    gamemenu_a.className = "menu_button";
    gamemenu_li.appendChild(gamemenu_a);
}

function BarHomeUpdate(){
    document.getElementById("menu_bar").remove();
    var menu_bar_ul = document.createElement('UL');
    menu_bar_ul.id = "menu_bar";
    document.getElementById("menu").appendChild(menu_bar_ul);

    var welcome_li = document.createElement("LI");
    menu_bar_ul.appendChild(welcome_li);

    var register_li = document.createElement("LI");
    menu_bar_ul.appendChild(register_li);

    var login_li = document.createElement("LI");
    menu_bar_ul.appendChild(login_li);

    var welcome_a = document.createElement("A");
    welcome_a.setAttribute('onclick',"return moveWellcome()");
    welcome_a.className = "menu_button";
    welcome_a.innerText = "Welcome";
    welcome_li.appendChild(welcome_a);

    var register_a = document.createElement("A");
    register_a.setAttribute('onclick',"return moveRegister()");
    register_a.className = "menu_button";
    register_a.innerText = "Register";
    register_li.appendChild(register_a);

    var login_a = document.createElement("A");
    login_a.setAttribute('onclick',"return moveLogin()");
    login_a.className = "menu_button";
    login_a.innerText = "Login";
    login_li.appendChild(login_a);
}


function onlyNumberKey(evt) {
          
    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function getRandomIntegar(low_limit, high_limit){
    return (Math.floor(Math.random() * (high_limit - low_limit + 1)) + low_limit);
}

function key_chooce(id){
    document.getElementById(id).value = null;
    return true;
}

function GameSetting(){
    document.getElementById('content').style.height = "860px";

    var setting_div = document.createElement("DIV");
    setting_div.id = "setting_div";
    document.getElementById("content").appendChild(setting_div);
    active_divs.push(setting_div);

    var gameplay_div = document.createElement("DIV");
    gameplay_div.className = "setting_header";
    gameplay_div.innerHTML = "GAMEPLAY";
    setting_div.appendChild(gameplay_div);

    var controller_div = document.createElement("DIV");
    controller_div.className = "setting_header";
    controller_div.innerHTML = "CONTROLLER";
    setting_div.appendChild(controller_div);

    var audio_div = document.createElement("DIV");
    audio_div.className = "setting_header";
    audio_div.innerHTML = "AUDIO";
    setting_div.appendChild(audio_div);

    var setting_gameplay_table = document.createElement("TABLE");
    setting_gameplay_table.id = "setting_gameplay_table";
    setting_gameplay_table.className = "setting_table"
    gameplay_div.appendChild(setting_gameplay_table);

    var setting_controller_table = document.createElement("TABLE");
    setting_controller_table.id = "setting_controller_table";
    setting_controller_table.className = "setting_table"
    controller_div.appendChild(setting_controller_table);

    var setting_audio_table = document.createElement("TABLE");
    setting_audio_table.id = "setting_audio_table";
    setting_audio_table.className = "setting_table"
    audio_div.appendChild(setting_audio_table);

    var setting_buttons_ul = document.createElement("UL");
    setting_buttons_ul.id = "setting_buttons_table";
    setting_buttons_ul.className = "setting_table"
    setting_div.appendChild(setting_buttons_ul);

    //adding the function of gameplay setting

    //num_of_balls
    var gameplay_num_of_balls_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_num_of_balls_tr);

    var num_of_balls_name_td = document.createElement("TD");
    num_of_balls_name_td.textContent = "Balls Number:";
    gameplay_num_of_balls_tr.appendChild(num_of_balls_name_td);

    var num_of_balls_value_td = document.createElement("TD");
    gameplay_num_of_balls_tr.appendChild(num_of_balls_value_td);

    var num_of_balls_value_input = document.createElement("INPUT");
    num_of_balls_value_input.id = "num_of_balls";
	num_of_balls_value_input.name = "num_of_balls";
	num_of_balls_value_input.value = total_balls;
	num_of_balls_value_input.type = "text";
    num_of_balls_value_input.setAttribute("onkeypress","return onlyNumberKey(event)");
    num_of_balls_value_td.appendChild(num_of_balls_value_input);

    var num_of_ball_value_limit = document.createElement("A");
    num_of_ball_value_limit.innerHTML = "(50-90)"
    num_of_balls_value_td.appendChild(num_of_ball_value_limit);

    // 5 points balls color
    var gameplay_balls_colors_5_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_balls_colors_5_tr);
    
    var balls_colors_5_name_td = document.createElement("TD");
    balls_colors_5_name_td.textContent = "5 Points Balls Color:";
    gameplay_balls_colors_5_tr.appendChild(balls_colors_5_name_td);

    var balls_colors_5_value_td = document.createElement("TD");
    gameplay_balls_colors_5_tr.appendChild(balls_colors_5_value_td);

    var balls_colors_5_value_input = document.createElement("INPUT");
    balls_colors_5_value_input.id = "ball_5_point";
	balls_colors_5_value_input.name = "ball_5_point";
	balls_colors_5_value_input.value = ball_5_point_color;
	balls_colors_5_value_input.type = "color";
    balls_colors_5_value_td.appendChild(balls_colors_5_value_input);


    // 15 points balls color
    var gameplay_balls_colors_15_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_balls_colors_15_tr);
    
    var balls_colors_15_name_td = document.createElement("TD");
    balls_colors_15_name_td.textContent = "15 Points Balls Color:";
    gameplay_balls_colors_15_tr.appendChild(balls_colors_15_name_td);

    var balls_colors_15_value_td = document.createElement("TD");
    gameplay_balls_colors_15_tr.appendChild(balls_colors_15_value_td);

    var balls_colors_15_value_input = document.createElement("INPUT");
    balls_colors_15_value_input.id = "ball_15_point";
	balls_colors_15_value_input.name = "ball_15_point";
	balls_colors_15_value_input.value = ball_15_point_color;
	balls_colors_15_value_input.type = "color";
    balls_colors_15_value_td.appendChild(balls_colors_15_value_input);

    // 25 points balls color
    var gameplay_balls_colors_25_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_balls_colors_25_tr);
    
    var balls_colors_25_name_td = document.createElement("TD");
    balls_colors_25_name_td.textContent = "25 Points Balls Color:";
    gameplay_balls_colors_25_tr.appendChild(balls_colors_25_name_td);

    var balls_colors_25_value_td = document.createElement("TD");
    gameplay_balls_colors_25_tr.appendChild(balls_colors_25_value_td);

    var balls_colors_25_value_input = document.createElement("INPUT");
    balls_colors_25_value_input.id = "ball_25_point";
	balls_colors_25_value_input.name = "ball_25_point";
	balls_colors_25_value_input.value = ball_25_point_color;
	balls_colors_25_value_input.type = "color";
    balls_colors_25_value_td.appendChild(balls_colors_25_value_input);

    //time_remains
    var gameplay_time_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_time_tr);

    var time_name_td = document.createElement("TD");
    time_name_td.textContent = "Time Remains:";
    gameplay_time_tr.appendChild(time_name_td);

    var time_value_td = document.createElement("TD");
    gameplay_time_tr.appendChild(time_value_td);

    var time_value_input = document.createElement("INPUT");
    time_value_input.id = "time_remains";
	time_value_input.name = "time_remains";
	time_value_input.value = total_time;
	time_value_input.type = "text";
    time_value_input.setAttribute("onkeypress","return onlyNumberKey(event)");
    time_value_td.appendChild(time_value_input);

    var time_value_limit = document.createElement("A");
    time_value_limit.innerHTML = "(60-inf, in seconds)";
    time_value_td.appendChild(time_value_limit);

    //num of monsters
    var gameplay_num_of_monsters_tr = document.createElement("TR");
    setting_gameplay_table.appendChild(gameplay_num_of_monsters_tr);

    var num_of_monsters_name_td = document.createElement("TD");
    num_of_monsters_name_td.textContent = "Num of Monsters:";
    gameplay_num_of_monsters_tr.appendChild(num_of_monsters_name_td);

    var num_of_monsters_value_td = document.createElement("TD");
    gameplay_num_of_monsters_tr.appendChild(num_of_monsters_value_td);

    var num_of_monsters_value_input = document.createElement("INPUT");
    num_of_monsters_value_input.id = "num_of_monsters";
	num_of_monsters_value_input.name = "num_of_monsters";
	num_of_monsters_value_input.value = num_monsters;
	num_of_monsters_value_input.type = "text";
    num_of_monsters_value_input.setAttribute("onkeypress","return onlyNumberKey(event)");
    num_of_monsters_value_td.appendChild(num_of_monsters_value_input)

    var num_of_monsters_limit = document.createElement("A");
    num_of_monsters_limit.innerHTML = "(1-4)";
    num_of_monsters_value_td.appendChild(num_of_monsters_limit);

    //adding the function of controller setting

    //up-key
    var setting_controller_up_tr = document.createElement("TR");
    setting_controller_table.appendChild(setting_controller_up_tr);

    var controller_up_name_td = document.createElement("TD");
    controller_up_name_td.textContent = "Up Key:";
    setting_controller_up_tr.appendChild(controller_up_name_td);

    var controller_up_value_td = document.createElement("TD");
    setting_controller_up_tr.appendChild(controller_up_value_td);

    var controller_up_value_input = document.createElement("INPUT");
    controller_up_value_input.id = "up_key";
	controller_up_value_input.name = "up_key";
	controller_up_value_input.value = up_key_code;
	controller_up_value_input.type = "text";
    controller_up_value_input.setAttribute("onkeypress","return key_chooce('up_key')");
    controller_up_value_input.addEventListener("keydown",function(e){
        document.getElementById("up_key").value = e.key;
    })
    controller_up_value_input.addEventListener("keyup",function(e){
        document.getElementById("up_key").value = e.key;
    })
    controller_up_value_td.appendChild(controller_up_value_input);

    //down-key
    var setting_controller_down_tr = document.createElement("TR");
    setting_controller_table.appendChild(setting_controller_down_tr);

    var controller_down_name_td = document.createElement("TD");
    controller_down_name_td.textContent = "Down Key:";
    setting_controller_down_tr.appendChild(controller_down_name_td);

    var controller_down_value_td = document.createElement("TD");
    setting_controller_down_tr.appendChild(controller_down_value_td);

    var controller_down_value_input = document.createElement("INPUT");
    controller_down_value_input.id = "down_key";
    controller_down_value_input.name = "down_key";
    controller_down_value_input.value = down_key_code;
    controller_down_value_input.type = "text";
    controller_down_value_input.setAttribute("onkeypress","return key_chooce('down_key')");
    controller_down_value_input.addEventListener("keydown",function(e){
        document.getElementById("down_key").value = e.key;
    })
    controller_down_value_input.addEventListener("keyup",function(e){
        document.getElementById("down_key").value = e.key;
    })
    controller_down_value_td.appendChild(controller_down_value_input);

    //left-key
    var setting_controller_left_tr = document.createElement("TR");
    setting_controller_table.appendChild(setting_controller_left_tr);

    var controller_left_name_td = document.createElement("TD");
    controller_left_name_td.textContent = "Left Key:";
    setting_controller_left_tr.appendChild(controller_left_name_td);

    var controller_left_value_td = document.createElement("TD");
    setting_controller_left_tr.appendChild(controller_left_value_td);

    var controller_left_value_input = document.createElement("INPUT");
    controller_left_value_input.id = "left_key";
    controller_left_value_input.name = "left_key";
    controller_left_value_input.value = left_key_code;
    controller_left_value_input.type = "text";
    controller_left_value_input.setAttribute("onkeypress","return key_chooce('left_key')");
    controller_left_value_input.addEventListener("keydown",function(e){
        document.getElementById("left_key").value = e.key;
    })
    controller_left_value_input.addEventListener("keyup",function(e){
        document.getElementById("left_key").value = e.key;
    })
    controller_left_value_td.appendChild(controller_left_value_input);

    //right-key
    var setting_controller_right_tr = document.createElement("TR");
    setting_controller_table.appendChild(setting_controller_right_tr);

    var controller_right_name_td = document.createElement("TD");
    controller_right_name_td.textContent = "Right Key:";
    setting_controller_right_tr.appendChild(controller_right_name_td);

    var controller_right_value_td = document.createElement("TD");
    setting_controller_right_tr.appendChild(controller_right_value_td);

    var controller_right_value_input = document.createElement("INPUT");
    controller_right_value_input.id = "right_key";
    controller_right_value_input.name = "right_key";
    controller_right_value_input.value = right_key_code;
    controller_right_value_input.type = "text";
    controller_right_value_input.setAttribute("onkeypress","return key_chooce('right_key')");
    controller_right_value_input.addEventListener("keydown",function(e){
        document.getElementById("right_key").value = e.key;
    })
    controller_right_value_input.addEventListener("keyup",function(e){
        document.getElementById("right_key").value = e.key;
    })
    controller_right_value_td.appendChild(controller_right_value_input);

    //adding the function of audio setting

    //music
    var setting_audio_music_tr = document.createElement("TR");
    setting_audio_table.appendChild(setting_audio_music_tr);

    var audio_music_name_td = document.createElement("TD");
    audio_music_name_td.textContent = "Music:";
    setting_audio_music_tr.appendChild(audio_music_name_td);

    var audio_music_value_td = document.createElement("TD");
    setting_audio_music_tr.appendChild(audio_music_value_td);

    var music_value_select = document.createElement("SELECT");
    music_value_select.id = "music_select";
    audio_music_value_td.appendChild(music_value_select);

    var music_value_on_option = document.createElement("OPTION");
    music_value_on_option.value = "on";
    music_value_on_option.textContent = "ON";
    music_value_select.appendChild(music_value_on_option);

    var music_value_off_option = document.createElement("OPTION");
    music_value_off_option.value = "off";
    music_value_off_option.textContent = "OFF";
    music_value_select.appendChild(music_value_off_option);

    if(!music_mode){
        music_value_select.value = "off";
    }

    //sound
    var setting_audio_sound_tr = document.createElement("TR");
    setting_audio_table.appendChild(setting_audio_sound_tr);

    var audio_sound_name_td = document.createElement("TD");
    audio_sound_name_td.textContent = "Sound:";
    setting_audio_sound_tr.appendChild(audio_sound_name_td);

    var audio_sound_value_td = document.createElement("TD");
    setting_audio_sound_tr.appendChild(audio_sound_value_td);

    var sound_value_select = document.createElement("SELECT");
    sound_value_select.id = "sound_select";
    audio_sound_value_td.appendChild(sound_value_select);

    var sound_value_on_option = document.createElement("OPTION");
    sound_value_on_option.value = "on";
    sound_value_on_option.textContent = "ON";
    sound_value_select.appendChild(sound_value_on_option);

    var sound_value_off_option = document.createElement("OPTION");
    sound_value_off_option.value = "off";
    sound_value_off_option.textContent = "OFF";
    sound_value_select.appendChild(sound_value_off_option);
    
    if(!sound_mode){
        sound_value_select.value = "off";
    }

    //adding the function of buttons

    //random button
    var random_button_li = document.createElement("LI");
    setting_buttons_ul.appendChild(random_button_li);

    var random_button = document.createElement("button");
    random_button.innerHTML = "Random";
    random_button_li.appendChild(random_button);
    random_button.addEventListener("click",function(){
        document.getElementById("ball_5_point").value = getRandomColor();
        document.getElementById("ball_15_point").value = getRandomColor();
        document.getElementById("ball_25_point").value = getRandomColor();
        document.getElementById("num_of_balls").value = getRandomIntegar(50,90);
        document.getElementById("time_remains").value = getRandomIntegar(60,1000); 
        document.getElementById("num_of_monsters").value = getRandomIntegar(1,4);
        document.getElementById("up_key").value = "ArrowUp";
        document.getElementById("down_key").value = "ArrowDown";
        document.getElementById("left_key").value = "ArrowLeft";
        document.getElementById("right_key").value = "ArrowRight";
    })

    //apply button
    var apply_button_li = document.createElement("LI");
    setting_buttons_ul.appendChild(apply_button_li);

    var apply_button = document.createElement("button");
    apply_button.innerHTML = "Apply";
    apply_button_li.appendChild(apply_button);
    apply_button.addEventListener("click",function(){
        balls_input_value = document.getElementById("num_of_balls").value;
        time_input_value = document.getElementById("time_remains").value;
        monsters_input_value = document.getElementById("num_of_monsters").value;

        //validation
        if(balls_input_value < 50 || balls_input_value > 90){
            alert("Invaild input: BALLS NUMBER out of range.")
            return;
        }

        if(time_input_value < 60){
            alert("Invaild input: TIME REMAINS out of range.")
            return;
        }

        if(monsters_input_value < 1 || monsters_input_value > 4){
            alert("Invaild input: NUM OF MONSTERS out of range.")
            return;
        }

        music_input_value = document.getElementById("music_select").value;
        sound_input_value = document.getElementById("sound_select").value;

        if (music_input_value == "on"){
            music_mode = true;
        }
        else{
            music_mode = false;
        }

        if (sound_input_value == "on"){
            sound_mode = true;
        }
        else{
            sound_mode = false;
        }
        
        //implement
        total_balls = balls_input_value;
        total_time = time_input_value;
        num_monsters = monsters_input_value;
        ball_5_point_color = document.getElementById("ball_5_point").value;
        ball_15_point_color = document.getElementById("ball_15_point").value;
        ball_25_point_color = document.getElementById("ball_25_point").value;
        up_key_code = document.getElementById("up_key").value;
        down_key_code = document.getElementById("down_key").value;
        left_key_code = document.getElementById("left_key").value;
        right_key_code = document.getElementById("right_key").value;

        alert("Setting changed successfully.")
    })

    //back button
    var back_button_li = document.createElement("LI");
    setting_buttons_ul.appendChild(back_button_li);

    var back_button = document.createElement("button");
    back_button.innerHTML = "Back";
    back_button.addEventListener ("click", function() {
		clearPage();
		moveGameMenu();
	});

    back_button_li.appendChild(back_button);
}

function AddColoredBlock(content,value){
    var colored_block_ul = document.createElement("UL");
    colored_block_ul.className = "colored_block";

    var colored_content_li = document.createElement("LI");
    colored_block_ul.appendChild(colored_content_li);

    colored_content_li.appendChild(AddAGameSettingInformation(content,""));

    var colored_block_li = document.createElement("LI");
    colored_block_ul.appendChild(colored_block_li);

    var colored_block = document.createElement("CANVAS");
    colored_block.className = "colored_block_canvas"
    var ctx = colored_block.getContext("2d");
    ctx.fillStyle = value;
    ctx.fillRect(0,0,400,400);
    colored_block_li.appendChild(colored_block);
    return colored_block_ul; 
}
function AddAGameSettingInformation(content,value){
    var new_a = document.createElement("A");
    value = String(value);
    new_a.innerHTML = content + value;
    return new_a;
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function GameStart() {
    //1-5 points food
    //2-pacman place
    //3-
    //4-wall 
    //5-15 points food
    //6- 25 point food 
    monster_array=new Array();
    elusive_pacman_alive=true;
    for (i=0;i<num_monsters;i++){
        var new_monster=new Object()
        new_monster.image=new Image()
        if (i==0){
            new_monster.image.src="pacman-ghosts-cyan.png"
            new_monster.i=0;
            new_monster.j=0;
        }
         else if (i==1){
            new_monster.image.src="pacman-ghosts-orange.png"
            new_monster.i=0;
            new_monster.j=9;
        } else if (i==2){
            new_monster.image.src="pacman-ghosts-ping.png"
            new_monster.i=24;
            new_monster.j=0;
        } else if (i==3){
            new_monster.image.src="pacman-ghosts-red.png"
            new_monster.i=24;
            new_monster.j=9;
        }  
        monster_array.push(new_monster);       
    }
    lives=5;
    var game_container_div = document.createElement("DIV");
    game_container_div.id = "game_container";

    document.getElementById('content').appendChild(game_container_div)
    //indication_bar
	var indication_div = document.createElement("DIV");
	indication_div.id = "indication";

	game_container_div.appendChild(indication_div)

	var indication_bar_ul = document.createElement("UL");
	indication_bar_ul.id = "indication_bar";
	indication_div.appendChild(indication_bar_ul);

    var score_li = document.createElement("LI");
	
	var score_label_instance = document.createElement("LABEL");
	score_label_instance.for = "lblScore";
	score_label_instance.textContent = "SCORE:";

	var score_input_instance = document.createElement("INPUT");
	score_input_instance.id = "lblScore";
	score_input_instance.style = "width: 30px;";
	score_input_instance.type = "text";

	score_li.appendChild(score_label_instance);
	score_li.appendChild(score_input_instance);

	document.getElementById("indication_bar").appendChild(score_li)

	var time_label_instance = document.createElement("LABEL");
	time_label_instance.for = "lblTime";
	time_label_instance.textContent = "TIME:";

	var time_input_instance = document.createElement("INPUT");
	time_input_instance.id = "lblTime";
	time_input_instance.style = "width: 30px;";
	time_input_instance.type = "text";

    var time_li = document.createElement("LI");
	
	time_li.appendChild(time_label_instance);
	time_li.appendChild(time_input_instance);
	document.getElementById("indication_bar").appendChild(time_li)

    var lives_label_instance = document.createElement("LABEL");
	lives_label_instance.for = "lblLives";
	lives_label_instance.textContent = "LIVES:";

	var lives_input_instance = document.createElement("INPUT");
	lives_input_instance.id = "lblLives";
	lives_input_instance.style = "width: 30px;";
	lives_input_instance.type = "text";

    var lives_li=document.createElement("LI");
    lives_li.appendChild(lives_label_instance);
    lives_li.appendChild(lives_input_instance);
    document.getElementById("indication_bar").appendChild(lives_li);

	var game_div = document.createElement("DIV");
	game_div.id = "game";

	game_container_div.appendChild(game_div);

	active_divs.push(game_container_div);

    //game
    var game_ul = document.createElement("UL");
    game_ul.id = "game_ul"
    game_div.appendChild(game_ul);

    var game_li = document.createElement("LI");
    game_ul.appendChild(game_li);

	var canvas_instance = document.createElement("CANVAS");
	context = canvas_instance.getContext("2d");
	context.canvas.id = "canvas";
	context.canvas.height = 600;
	context.canvas.width = 1550;
	game_li.appendChild(canvas_instance);

    var game_setting_li = document.createElement("LI");
    game_setting_li.id = "ingame_setting";
    game_ul.appendChild(game_setting_li);

    var game_setting_div = document.createElement("DIV");
    game_setting_li.appendChild(game_setting_div);
    //adding game setting preview
    game_setting_div.appendChild(AddAGameSettingInformation("Setting:",""));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("BALLS NUMBER: ",total_balls));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddColoredBlock("5 POINTS BALLS COLOR: ",ball_5_point_color));
    game_setting_div.appendChild(AddColoredBlock("15 POINTS BALLS COLOR: ",ball_15_point_color));
    game_setting_div.appendChild(AddColoredBlock("25 POINTS BALLS COLOR: ",ball_25_point_color));
    game_setting_div.appendChild(AddAGameSettingInformation("TIME REMAINS: ",total_time));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("NUM OF MONSTERS: ",num_monsters));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("UP-KEY: ",up_key_code));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("DOWN-KEY: ",down_key_code));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("LEFT-KEY: ",left_key_code));
    game_setting_div.appendChild(document.createElement("BR"));
    game_setting_div.appendChild(AddAGameSettingInformation("RIGHT-KEY: ",right_key_code));

	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain_15 = Math.floor(total_balls*0.3);
	var food_remain_25 = Math.floor(total_balls*0.1);
    var food_remain_5 = total_balls-food_remain_15-food_remain_25;
    var ball_5_rgb_color = hexToRgb(ball_5_point_color);
    var brightness = Math.round(parseInt(ball_5_rgb_color['r']) +
          parseInt(ball_5_rgb_color['g']) +
          parseInt(ball_5_rgb_color['b']));
    ball_5_text_color = (brightness > 375) ? 'black' : 'white';

    var ball_15_rgb_color = hexToRgb(ball_15_point_color);
    var brightness = Math.round(parseInt(ball_15_rgb_color['r']) +
          parseInt(ball_15_rgb_color['g']) +
          parseInt(ball_15_rgb_color['b']));
    ball_15_text_color = (brightness > 375) ? 'black' : 'white';

    var ball_25_rgb_color = hexToRgb(ball_25_point_color);
    var brightness = Math.round(parseInt(ball_25_rgb_color['r']) +
          parseInt(ball_25_rgb_color['g']) +
          parseInt(ball_25_rgb_color['b']));
    ball_25_text_color = (brightness > 375) ? 'black' : 'white';
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 25; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 2 && j == 3) || (i==10 && j==2) || (i==12 && j==4) || (i==14 && j==1) || (i==16 && j==7) || (i==20 && j==7) ||
				(i == 3 && j == 4) || (i==11 && j==2) || (i==10 && j==7) || (i==14 && j==3) || (i==17 && j==6) || (i==20 && j==8) ||
				(i == 4 && j == 5) || (i==12 && j==2) || (i==11 && j==7) || (i==14 && j==4) || (i==18 && j==5) || (i==24 && j==4) ||
                (i == 5 && j == 6) || (i==0  && j==1) || (i==7  && j==8) || (i==14 && j==5) || (i==20 && j==0) || (i==23 && j==4) ||
				(i == 6 && j == 1) || (i==10 && j==4) || (i==12 && j==7) || (i==14 && j==9) || (i==20 && j==1) || (i==2  && j==9) ||
				(i == 6 && j == 2) || (i==11 && j==4) || (i==14 && j==0) || (i==15 && j==8) || (i==20 && j==2) || (i==2  && j==8)
			) {
				board[i][j] = 4;
			} 
            else {
					board[i][j] = 0;
				}
        }
    }
    elusive_pacman_object.i = Math.floor(board.length/2);
    elusive_pacman_object.j = Math.floor(board.length/2);
    board[elusive_pacman_object.i][elusive_pacman_object.j]=7;
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 2;
    food_remain_5--;
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    pacman_remain--;
	while (food_remain_5 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain_5--;
	}
	while (food_remain_15 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain_15--;
	}
	while (food_remain_25 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		food_remain_25--;
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.key] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.key] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
    enemy_interval=setInterval(move_enemies,300);

}
function isFreeSpace(board ,i ,j){
    if (board[i][j]!=0){
        return false;
    }
    for (i=0;i<monster_array.length;i++){
        if (i==monster_array[i].i && j==monster_array[i].j){
            return false;
        }
    }
    return true;
}
function findRandomEmptyCell(board) {
    let free_space=false;
	var i = Math.floor(Math.random() * 24 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (!isFreeSpace(board,i,j)) {
		i = Math.floor(Math.random() * 24 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_key_code]) {
        last_position = 1;
		return 1;
	}
	if (keysDown[down_key_code]) {
        last_position = 2;
		return 2;
	}
	if (keysDown[left_key_code]) {
        last_position = 3;
		return 3;
	}
	if (keysDown[right_key_code]) {
        last_position = 4;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
    lblLives.value=lives;
	lblTime.value = total_time - time_elapsed;
	for (var i = 0; i < 25; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
                //print the shape
                if(last_position == 1){ // up
				    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
                }
                else if(last_position == 2) {// down
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, -1.65 * Math.PI);
                }

                else if(last_position == 3){ // left
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, -1.15 * Math.PI);
                }
                else if (last_position == 4){ // right
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);
                }
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; // color
				context.fill();
				context.beginPath();
                //print the eye
                if(last_position == 1){ // up
				    context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // half circle
                }
                else if(last_position == 2) {// down
                    context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI);
                }

                else if(last_position == 3){ // left
                    context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
                }
                else if (last_position == 4){ // right
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
                }
				context.fillStyle = "black"; //color
				context.fill();
            // print Food
            } else if(i==elusive_pacman_object.i & j==elusive_pacman_object.j){
                context.beginPath();
                //print the shape
                if(last_elusive_pacman_position == 1){ // up
				    context.arc(center.x, center.y, 10, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
                }
                else if(last_elusive_pacman_position == 2) {// down
                    context.arc(center.x, center.y, 10, 0.65 * Math.PI, -1.65 * Math.PI);
                }

                else if(last_elusive_pacman_position == 3){ // left
                    context.arc(center.x, center.y, 10, 1.15 * Math.PI, -1.15 * Math.PI);
                }
                else if (last_elusive_pacman_position == 4){ // right
                    context.arc(center.x, center.y, 10, 0.15 * Math.PI, 1.85 * Math.PI);
                }
				context.lineTo(center.x, center.y);
				context.fillStyle = "red"; // color
				context.fill();
				context.beginPath();
                //print the eye
                if(last_elusive_pacman_position == 1){ // up
				    context.arc(center.x + 5, center.y - 3, 2, 0, 2 * Math.PI); 
                }
                else if(last_elusive_pacman_position == 2) {// down
                    context.arc(center.x + 5, center.y + 3, 2, 0, 2 * Math.PI);
                }

                else if(last_elusive_pacman_position == 3){ // left
                    context.arc(center.x - 3, center.y - 5, 2, 0, 2 * Math.PI);
                }
                else if (last_elusive_pacman_position == 4){ // right
                    context.arc(center.x + 3, center.y - 5, 2, 0, 2 * Math.PI);
                }
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == 1) { // 5 score food 
				context.beginPath();
				context.fillStyle = ball_5_point_color; //color
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fill();
                context.font = "9.5px Ariel";
                context.fillStyle = ball_5_text_color;
                context.fillText("5", center.x-3, center.y+3);
            
			} else if (board[i][j] == 5) { // 15 score food 
				context.beginPath();
				context.fillStyle = ball_15_point_color; //color
                context.arc(center.x, center.y, 12.5, 0, 2 * Math.PI); // circle
				context.fill();
                context.font = "12px Ariel";
                context.fillStyle = ball_15_text_color;
                context.fillText("15", center.x-7, center.y+4);
            
			} else if (board[i][j] == 6) { // 25 score food 
				context.beginPath();
				context.fillStyle = ball_25_point_color; //color
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fill();
                context.font = "14.5px Ariel";
                context.fillStyle = ball_25_text_color;
                context.fillText("25", center.x-7, center.y+4);
            
			} else if (board[i][j] == 4) { //print Obstacles
				context.beginPath();
				context.fillStyle = "grey"; //color
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fill();
			}
            // else if (i==0 & j==0){
                // context.drawImage(monster_array[0].image,0,0,60,50);
            // }
		}
	}
    for (i=0;i<monster_array.length;i++){
        var center = new Object();
        center.x = monster_array[i].i * 60 ;
        center.y = monster_array[i].j * 60 ;
        context.drawImage(monster_array[i].image,center.x-30,center.y,110,60);

    }
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 24 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
    //eat elusive pacman position
    if (shape.i==elusive_pacman_object.i & shape.j==elusive_pacman_object.j){
        score+=50;
        elusive_pacman_alive=false;
        elusive_pacman_object.j=null;
        elusive_pacman_object.i=null;

    }
	if (board[shape.i][shape.j] == 1) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 5) {
		score+=15;
	}
	if (board[shape.i][shape.j] == 6) {
		score+=25;
	}
	board[shape.i][shape.j] = 2;
    if (elusive_pacman_alive){
        //update elusive pacman position
        var x=get_next_elusive_pacman_move();
        if (x == 1) {
            if (elusive_pacman_object.j > 0 && board[elusive_pacman_object.i][elusive_pacman_object.j - 1] != 4) {
                elusive_pacman_object.j--;
            }
        }
        if (x == 2) {
            if (elusive_pacman_object.j < 9 && board[elusive_pacman_object.i][elusive_pacman_object.j + 1] != 4) {
                elusive_pacman_object.j++;
            }
        }
        if (x == 3) {
            if (elusive_pacman_object.i > 0 && board[elusive_pacman_object.i - 1][elusive_pacman_object.j] != 4) {
                elusive_pacman_object.i--;
            }
        }
        if (x == 4) {
            if (elusive_pacman_object.i < 9 && board[elusive_pacman_object.i + 1][elusive_pacman_object.j] != 4) {
                elusive_pacman_object.i++;
            }
        }
    }
    // move_enemies();
	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);

    for (i=0;i<monster_array.length;i++){
        if (shape.i==monster_array[i].i && shape.j == monster_array[i].j){
            lives--;
            score-=10;
            let freeSpace=findRandomEmptyCell(board);
            board[shape.i][shape.j]=0;
            shape.i=freeSpace[0];
            shape.j=freeSpace[1];
            board[freeSpace[0]][freeSpace[1]]=2;
            for (j=0;j<monster_array.length;j++){
                if (j==0){
                    monster_array[j].i=0;
                    monster_array[j].j=0;
                }
                else if (j==1){
                    monster_array[j].i=0;
                    monster_array[j].j=9;
                } else if (j==2){
                    monster_array[j].i=24;
                    monster_array[j].j=0;
                } else if (j==3){
                    monster_array[j].i=24;
                    monster_array[j].j=9;
                } 
            }
            break;

        }
    }
    
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 500) {
		window.clearInterval(interval);
		window.clearInterval(enemy_interval);
		window.alert("Game completed");
	} 
    else if(time_elapsed==total_time){
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
		window.alert("Time over");
    }else if (lives==0){
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
		window.alert("You lose!");
    }else {
		Draw();
	}
}

function getFoodType(food_remain_5,food_remain_15,food_remain_25){
    var remains_food=new Array();
    if (food_remain_5>0){
        remains_food.push(1);
    }
    if (food_remain_15>0){
        remains_food.push(2);
    }
    if (food_remain_25>0){
        remains_food.push(3);
    }
    var food_type_number=Math.floor(Math.random()*remains_food.length);

    return remains_food[food_type_number];
}
function get_next_elusive_pacman_move(){
    var next_move=Math.floor(Math.random()*4);
    if (next_move==0) {
        last_elusive_pacman_position = 1;
		return 1;
	}
	if (next_move==1) {
        last_elusive_pacman_position = 2;
		return 2;
	}
	if (next_move==2) {
        last_elusive_pacman_position = 3;
		return 3;
	}
    last_elusive_pacman_position = 4;
    return 4;
}
function move_enemies(){
    for (i=0;i<num_monsters;i++){
        const monsters_locations=monster_array.map(x=> [x.i,x.j]);
        var move_options=new Array();
        move_options.push([monster_array[i].i,monster_array[i].j]);
        if (monster_array[i].i>0 && board[monster_array[i].i-1][monster_array[i].j]!=4 && monsters_locations.filter(x=>monster_array[i].i-1==x[0] && monster_array[i].j==x[1]).length==0){
            move_options.push([monster_array[i].i-1,monster_array[i].j]) ;  
        }
        if (monster_array[i].j>0 && board[monster_array[i].i][monster_array[i].j-1]!=4 && monsters_locations.filter(x=>monster_array[i].i==x[0] && monster_array[i].j-1==x[1]).length==0){
            move_options.push([monster_array[i].i,monster_array[i].j-1])  ;
        }
        if (monster_array[i].i<24 && board[monster_array[i].i+1][monster_array[i].j]!=4 && monsters_locations.filter(x=>monster_array[i].i+1==x[0] && monster_array[i].j==x[1]).length==0){
            move_options.push([monster_array[i].i+1,monster_array[i].j])  ;
        }
        if (monster_array[i].j<9 && board[monster_array[i].i][monster_array[i].j+1]!=4 && monsters_locations.filter(x=>monster_array[i].i==x[0] && monster_array[i].j+1==x[1]).length==0){
            move_options.push([monster_array[i].i,monster_array[i].j+1])  ;
        }
        var best_option=null;
        var min_distance=Infinity;
        for (j=0;j<move_options.length;j++){
            let distance=Math.sqrt(Math.pow(move_options[j][0]-shape.i,2)+Math.pow(shape.j-move_options[j][1],2));
            if (distance<min_distance){
                min_distance=distance;
                best_option=j;
            }
        }
        monster_array[i].i=move_options[best_option][0];
        monster_array[i].j=move_options[best_option][1];
    }
    
}