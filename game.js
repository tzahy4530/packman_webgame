var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var login_user;
var active_divs = []
var last_position = 4;

function moveGameMenu(){
    clearPage();
    GameMenu(login_user);   
}

function moveWellcomeFromGame(){
    BarHomeUpdate();
    moveWellcome();
}

function BarGameUpdate(){
    document.getElementById("menu_bar").remove();
    var menu_bar_ul = document.createElement('UL');
    menu_bar_ul.id = "menu_bar";
    document.getElementById("menu").appendChild(menu_bar_ul);

    var welcome_li = document.createElement("LI");
    menu_bar_ul.appendChild(welcome_li);

    var gamemenu_li = document.createElement("LI");
    menu_bar_ul.appendChild(gamemenu_li);

    var welcome_a = document.createElement("A");
    welcome_a.setAttribute('onclick',"return moveWellcomeFromGame()");
    welcome_a.innerText = "Logout";
    welcome_li.appendChild(welcome_a);

    var gamemenu_a = document.createElement("A");
    gamemenu_a.setAttribute('onclick',"return moveGameMenu()");
    gamemenu_a.innerText = "GameMenu";
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
    welcome_a.innerText = "Welcome";
    welcome_li.appendChild(welcome_a);

    var register_a = document.createElement("A");
    register_a.setAttribute('onclick',"return moveRegister()");
    register_a.innerText = "Register";
    register_li.appendChild(register_a);

    var login_a = document.createElement("A");
    login_a.setAttribute('onclick',"return moveLogin()");
    login_a.innerText = "Login";
    login_li.appendChild(login_a);
}

function GameMenu(login_user) {
    BarGameUpdate();
    this.login_user = login_user;
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
		login(); //change to setting.
	});
	var setting_li = document.createElement("LI");
	setting_li.appendChild(setting_button);
	gamemenu_ul.appendChild(setting_li);

}


function GameStart() {

	var indication_div = document.createElement("DIV");
	indication_div.id = "indication";

	document.getElementById('content').appendChild(indication_div)

	var indication_bar_ul = document.createElement("UL");
	indication_bar_ul.id = "indication_bar";

	indication_div.appendChild(indication_bar_ul);

	var game_div = document.createElement("DIV");
	game_div.id = "game";

	document.getElementById('content').appendChild(game_div);

	active_divs.push(indication_div);
	active_divs.push(game_div);

	var canvas_instance = document.createElement("CANVAS");
	context = canvas_instance.getContext("2d");
	context.canvas.id = "canvas";
	context.canvas.height = 600;
	context.canvas.width = 1200;
	document.getElementById("game").appendChild(canvas_instance);

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

	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
        last_position = 1;
		return 1;
	}
	if (keysDown[40]) {
        last_position = 2;
		return 2;
	}
	if (keysDown[37]) {
        last_position = 3;
		return 3;
	}
	if (keysDown[39]) {
        last_position = 4;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
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
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
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
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
