var user_dic = {'k':['k','tester','test@bgu.ac.il','1990-01-01']};
var active_divs = []

$(document).ready(function() {
	wellcome();
	document.getElementById("myModal").addEventListener('keydown',function(e){
		if (e.key == "escape"){
			$("myModal").style.display='none';
		}
	})
});

function clearPage(){
	for(let div of active_divs){
		div.remove()
	}
	active_divs = [];
}

function moveWellcome(){
	clearPage();
	wellcome();
}

function moveRegister(){
	clearPage();
	register();
}

function moveLogin(){
	clearPage();
	login();
}


function wellcome(){
	var welcome_div = document.createElement("DIV");
	welcome_div.id = "welcome";

	active_divs.push(welcome_div);

	document.getElementById("content").appendChild(welcome_div);

	var welcome_ul = document.createElement("UL");
	welcome_ul.id = "welcome_ul";

	welcome_div.appendChild(welcome_ul);

	var register_button = document.createElement("button");
	register_button.innerHTML = "Register";
	register_button.addEventListener ("click", function() {
		welcome_div.remove();
		active_divs = [];
		register();
	});
	var register_li = document.createElement("LI");
	register_li.appendChild(register_button);
	welcome_ul.appendChild(register_li);

	var login_button = document.createElement("button");
	login_button.innerHTML = "Login";
	login_button.addEventListener ("click", function() {
		welcome_div.remove();
		active_divs = [];
		login();
	});
	var login_li = document.createElement("LI");
	login_li.appendChild(login_button);
	welcome_ul.appendChild(login_li);
		
}

