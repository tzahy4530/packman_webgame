var user_dic = {'k':['k','tester','test@bgu.ac.il','1990-01-01']};
var active_divs = []

$(document).ready(function() {
	wellcome();
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
	document.getElementById("myModal").addEventListener('keydown',function(e){
		if (e.key == "Escape"){
			document.getElementById("myModal").style.display = 'none';
		}
	})
	document.getElementById("about_us").addEventListener("click", function (){
		document.getElementById("myModal").style.display = 'block';
		document.getElementById("myModal").focus()
	})
	var modal = document.getElementById("myModal");


	var btn = document.getElementById("closeModal");

	btn.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

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

