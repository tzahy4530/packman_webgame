var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user_dic;

$(document).ready(function() {
	// context = canvas.getContext("2d");
	wellcome();
});

function register(){

	var username_label = document.createElement("LABEL");
	username_label.for = "username"
	username_label.textContent = "Username:"

	var password_label = document.createElement("LABEL");
	password_label.for = "password"
	password_label.textContent = "Password:"

	var name_label = document.createElement("LABEL");
	name_label.for = "fullname"
	name_label.textContent = "FullName:"

	var email_label = document.createElement("LABEL");
	email_label.for = "email"
	email_label.textContent = "Email:"

	var username_input = document.createElement("INPUT");
	username_input.id = "username";
	username_input.name = "username";
	username_input.placeholder = "Your username.."
	username_input.type = "text";

	var password_input = document.createElement("INPUT");
	password_input.id = "password";
	password_input.name = "password";
	password_input.placeholder = "Your password.."
	password_input.type = "password";

	var name_input = document.createElement("INPUT");
	name_input.id = "fullname";
	name_input.name = "fullname";
	name_input.placeholder = "Your full name.."
	name_input.type = "text";

	var email_input = document.createElement("INPUT");
	email_input.id = "email";
	email_input.name = "email";
	email_input.placeholder = "Your email.."
	email_input.type = "text";

	var confirm = document.createElement("INPUT");
	confirm.type = "submit";
	confirm.value = "Confirm"

	var username_li = document.createElement("LI");
	username_li.appendChild(username_label);
	username_li.appendChild(username_input);

	var password_li = document.createElement("LI");
	password_li.appendChild(password_label);
	password_li.appendChild(password_input);

	var name_li = document.createElement("LI");
	name_li.appendChild(name_label);
	name_li.appendChild(name_input);

	var email_li = document.createElement("LI");
	email_li.appendChild(email_label);
	email_li.appendChild(email_input);

	var confirm_li = document.createElement("LI");
	confirm_li.appendChild(confirm)

	document.getElementById("register_form_ul").appendChild(username_li);
	document.getElementById("register_form_ul").appendChild(password_li);
	document.getElementById("register_form_ul").appendChild(name_li);
	document.getElementById("register_form_ul").appendChild(email_li);
	document.getElementById("register_form_ul").appendChild(confirm_li);

	var Validator = {
		rules: {
			password_rule1: /[a-zA-Z]/,
			password_rule2: /\d/,
			password_length: 6,
			fullname: /\d/
		},
		validate: function(username,password,fullname,email) {
			var username = $(username).val();
			var password = $(password).val();
			var fullname = $(fullname).val();
			var email = $(email).val();
			
			if (username == '' || password == '' || fullname == '' || email == ''){
				alert("All field are required.")
			} 

			if (!(this.rules.password_rule1.test(password) && this.rules.password_rule2.test(password))) {
				alert("Password should include at least 1 char and 1 digit.")
			}
			if(password.length < this.rules.password_length) {
				alert("Password should include at least 6 chars.")
			}
			if(this.rules.fullname.test(fullname)){
				alert("Fullname shouldn't include numbers.")
			}

			if(!(email.includes("@") || email.includes("."))) {
				alert('Invalid email');
			}
		},
		init: function() {
			$('#register_form').submit(function(e) {
				Validator.validate('#username','#password','#fullname','#email');
				e.preventDefault();
			});
		}
	};
	
	Validator.init();

}

function wellcome(){
	var body = document.getElementById("welcome_ul");
	
	
	var register_button = document.createElement("button");
	register_button.innerHTML = "Register";
	body.appendChild(register_button)
	register_button.addEventListener ("click", function() {
		body.remove();
		register();
	});
	var register_li = document.createElement("LI");
	register_li.appendChild(register_button);
	body.appendChild(register_li);

	var login_button = document.createElement("button");
	login_button.innerHTML = "Login";
	body.appendChild(login_button);
	login_button.addEventListener ("click", function() {
		body.remove();
		Start();;
	});
	var login_li = document.createElement("LI");
	login_li.appendChild(login_button);
	body.appendChild(login_li);
		
}

function Start() {
	var canvas_instance = document.createElement("CANVAS");
	context = canvas_instance.getContext("2d");
	context.canvas.id = "canvas";
	context.canvas.height = 600;
	context.canvas.width = 1500;
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
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
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
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
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
