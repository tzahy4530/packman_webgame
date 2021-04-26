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
var music = new Audio('resources/game-music.mp3');
var eat_sound = new Audio("resources/eating-sound.mp3");
var monster_kill_sound = new Audio("resources/monster-kill.mp3");
var win_game_sound = new Audio("resources/win-game.mp3");
var heart_image = new Image();
var music_mode = true;
var sound_mode = true;
var lives;
var addition_lives;
var ball_5_text_color;
var ball_15_text_color;
var ball_25_text_color;

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

function showWinWindow(){
    var win_window_div = document.createElement("DIV");
    win_window_div.id = "win_window";
    document.getElementById("game_container").appendChild(win_window_div);

    let win_window_ul = document.createElement("UL");
    win_window_div.appendChild(win_window_ul);

    let win_text_li = document.createElement("LI");
    win_text_li.className = "win_li"
    win_window_ul.appendChild(win_text_li);

    let win_text = document.createElement("A");
    win_text.innerHTML = "Winner!!!"
    win_text_li.appendChild(win_text);
    win_text_li.appendChild(document.createElement("BR"));

    let win_score_text = document.createElement("A");
    win_score_text.innerHTML = "Score: " + score;
    win_text_li.appendChild(win_score_text);

    let win_buttons_li = document.createElement("LI");
    win_buttons_li.className = "win_li"
    win_window_ul.appendChild(win_buttons_li);

    let win_back_button = document.createElement("button");
    win_back_button.innerHTML = "Back"
    win_back_button.className = "win_button"
    win_back_button.addEventListener("click", function(){
        clearPage();
        moveGameMenu(login_user);
    })
    win_buttons_li.appendChild(win_back_button);

    let play_again_button = document.createElement("button");
    play_again_button.innerHTML = "Play Again";
    play_again_button.className = "win_button";
    play_again_button.addEventListener("click",function(){
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
        clearPage();
        GameStart();
    })
    win_buttons_li.appendChild(play_again_button);
}


function showTiredPackmanWindow(){
    var tired_window_div = document.createElement("DIV");
    tired_window_div.id = "win_window";
    tired_window_div.style = "background: url('resources/tired-packman.jpg'); background-repeat: no-repeat; background-size: 400px 300px;"
    document.getElementById("game_container").appendChild(tired_window_div);
  
    let tired_window_ul = document.createElement("UL");
    tired_window_div.appendChild(tired_window_ul);
  
    let tired_text_li = document.createElement("LI");
    tired_text_li.className = "win_li"
    tired_window_ul.appendChild(tired_text_li);
  
    let tired_text = document.createElement("A");
    tired_text.innerHTML = "You are better than " + score + " points!"
    tired_text.style = "color: black; font-size: 20px; margin-left: 15%;"
    tired_text_li.appendChild(tired_text);
  
    let tired_buttons_li = document.createElement("LI");
    tired_buttons_li.className = "win_li"
    tired_window_ul.appendChild(tired_buttons_li);
  
    let tired_back_button = document.createElement("button");
    tired_back_button.innerHTML = "Back"
    tired_back_button.className = "win_button"
    tired_back_button.addEventListener("click", function(){
        clearPage();
        moveGameMenu(login_user);
    })
    tired_buttons_li.appendChild(tired_back_button);
  
    let play_again_button = document.createElement("button");
    play_again_button.innerHTML = "Play Again";
    play_again_button.className = "win_button";
    play_again_button.addEventListener("click",function(){
        clearPage();
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
        GameStart();
    })
    tired_buttons_li.appendChild(play_again_button);
}
  

function showLoseWindow(){
    var lose_window_div = document.createElement("DIV");
    lose_window_div.id = "lose_window";
    document.getElementById("game_container").appendChild(lose_window_div);

    let lose_window_ul = document.createElement("UL");
    lose_window_div.appendChild(lose_window_ul);

    let lose_text_li = document.createElement("LI");
    lose_text_li.className = "win_li"
    lose_window_ul.appendChild(lose_text_li);

    let lose_text = document.createElement("A");
    lose_text.innerHTML = "Loser!!!"
    lose_text_li.appendChild(lose_text);
    lose_text_li.appendChild(document.createElement("BR"));

    let lose_score_text = document.createElement("A");
    lose_score_text.innerHTML = "Score: " + score;
    lose_text_li.appendChild(lose_score_text);

    let lose_buttons_li = document.createElement("LI");
    lose_buttons_li.className = "win_li"
    lose_window_ul.appendChild(lose_buttons_li);

    let lose_back_button = document.createElement("button");
    lose_back_button.innerHTML = "Back"
    lose_back_button.className = "lose_button"
    lose_back_button.addEventListener("click", function(){
        clearPage();
        moveGameMenu(login_user);
    })
    lose_buttons_li.appendChild(lose_back_button);

    let play_again_button = document.createElement("button");
    play_again_button.innerHTML = "Play Again";
    play_again_button.className = "lose_button";
    play_again_button.addEventListener("click",function(){
        clearPage();
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
        GameStart();
    })
    lose_buttons_li.appendChild(play_again_button);
}

function newGame(){
    window.clearInterval(interval);
    window.clearInterval(enemy_interval);
    clearPage()
    GameStart()
}

function UpdateInGameBar(){
    if (document.getElementById("new_game_button") != null){
        return
    }
    var new_game_li = document.createElement("LI");
    document.getElementById("menu_bar").appendChild(new_game_li);

    var new_game_a = document.createElement("A");
    new_game_a.id = "new_game_button"
    new_game_a.setAttribute('onclick', "return newGame()")
    new_game_a.className = "menu_button";
    new_game_a.innerText = "New Game";
    new_game_li.appendChild(new_game_a);
}

function GameStart() {
    //1-5 points food
    //2-pacman place
    //3-
    //4-wall 
    //5-15 points food
    //6- 25 point food
    UpdateInGameBar()
    music.volume = 0.5;
    heart_image.src = "resources/heart.png"
    if (music_mode){
        music.play();
    }
    monster_array=new Array();
    elusive_pacman_alive=true;
    for (i=0;i<num_monsters;i++){
        var new_monster=new Object();
        new_monster.image=new Image();
        new_monster.boss=false;
        if (i==0){
            new_monster.image.src="resources/pacman-ghosts-cyan.png"
            new_monster.i=0;
            new_monster.j=0;
        }
         else if (i==1){
            new_monster.image.src="resources/pacman-ghosts-orange.png"
            new_monster.i=0;
            new_monster.j=9;
            new_monster.boss = true;
        } else if (i==2){
            new_monster.image.src="resources/pacman-ghosts-ping.png"
            new_monster.i=24;
            new_monster.j=0;
        } else if (i==3){
            new_monster.image.src="resources/pacman-ghosts-red.png"
            new_monster.i=24;
            new_monster.j=9;
        }  
        monster_array.push(new_monster);       
    }
    if (num_monsters == 4){
        addition_lives = 2;
    }
    else if (num_monsters >= 2){
        addition_lives = 1;
    }
    else{
        addition_lives = 0;
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
				(i == 2 && j == 3) || (i==10 && j==2) || (i==12 && j==4) || (i==14 && j==1) || (i==20 && j==7) ||
				(i==11 && j==2)    || (i==10 && j==7) || (i==14 && j==3) || (i==17 && j==6) || (i==20 && j==8) ||
				(i == 4 && j == 5) || (i==12 && j==2) || (i==11 && j==7) || (i==14 && j==4) || (i==18 && j==5) || (i==24 && j==4) ||
                (i == 5 && j == 6) || (i==0  && j==1) || (i==7  && j==8) || (i==14 && j==5) || (i==20 && j==0) || (i==23 && j==4) ||
				(i == 6 && j == 1) || (i==10 && j==4) || (i==12 && j==7) || (i==20 && j==1) ||
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
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 2;
    food_remain_5--;
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    pacman_remain--;
    total_balls_remains = food_remain_5 + food_remain_15 + food_remain_25;
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

    while (addition_lives > 0){
        var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 7;
		addition_lives--;
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
	interval = setInterval(UpdatePosition, 185);
    enemy_interval=setInterval(move_enemies,235);

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
            else if (board[i][j] == 7){
                context.drawImage(heart_image,center.x-20,center.y-10,30,30);
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
        if (sound_mode){
            eat_sound.pause();
            eat_sound.currentTime = 0;
            eat_sound.play()
        }
        elusive_pacman_alive=false;
        elusive_pacman_object.j=null;
        elusive_pacman_object.i=null;

    }
	if (board[shape.i][shape.j] == 1) {
		score+=5;
        total_balls_remains--;
        if (sound_mode){
            eat_sound.pause();
            eat_sound.currentTime = 0;
            eat_sound.play()
        }
	}
	if (board[shape.i][shape.j] == 5) {
		score+=15;
        total_balls_remains--;
        if (sound_mode){
            eat_sound.pause();
            eat_sound.currentTime = 0;
            eat_sound.play()
        }
	}
	if (board[shape.i][shape.j] == 6) {
		score+=25;
        total_balls_remains--;
        if (sound_mode){
            eat_sound.pause();
            eat_sound.currentTime = 0;
            eat_sound.play()
        }
	}

    if (board[shape.i][shape.j] == 7) {
		lives++;
        if (sound_mode){
            eat_sound.pause();
            eat_sound.currentTime = 0;
            eat_sound.play()
        }
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
        if (shape.i == monster_array[i].i && shape.j == monster_array[i].j){
            if (sound_mode){
                monster_kill_sound.play();
            }
            if(monster_array[i].boss){
                score-=20;
                lives-=2;
            }
            else{
                score-=10;
                lives--;
            }
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
    
	if (score >= 200 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (total_balls_remains == 0) {
        if(sound_mode){
            win_game_sound.play();
        }

        if(music_mode){
            music.pause();
            music.currentTime = 0;
        }
		window.clearInterval(interval);
		window.clearInterval(enemy_interval);
		showWinWindow();
	} 
    else if(time_elapsed==total_time){
        if(music_mode){
            music.pause();
            music.currentTime = 0;
        }
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
        if (score < 100){
		    showTiredPackmanWindow();
        }
        else{
            showWinWindow();
        }
    }else if (lives<=0){
        if(music_mode){
            music.pause();
            music.currentTime = 0;
        }
        window.clearInterval(interval);
        window.clearInterval(enemy_interval);
		showLoseWindow();
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