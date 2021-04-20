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
    if(music_mode){
        music.pause();
        music.currentTime = 0;
    }
    clearPage();
    window.clearInterval(interval);
    window.clearInterval(enemy_interval);
    document.getElementById('content').style.height = "680px";
    GameMenu(login_user);
}

function moveWellcomeFromGame(){
    if(music_mode){
        music.pause();
        music.currentTime = 0;
    }
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
