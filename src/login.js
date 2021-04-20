function validLogin(username,password) {
    var username = $(username).val();
    var password = $(password).val();
    if(!(username in user_dic)){
        alert("username or password incorrect.");
        return false;
    }
    if(user_dic[username][0] != password){
        alert("username or password incorrect.");
        return false;
    }
    login_user = username;
    alert("Wellcome " + user_dic[username][1] + ".");
    return true
}


function login(){
    var login_div = document.createElement("DIV");
    login_div.id = "register";
    active_divs.push(login_div)

    var login_form_ul = document.createElement("UL");
    login_form_ul.id= "register_form_ul";

    login_div.appendChild(login_form_ul);

    document.getElementById("content").appendChild(login_div);

    var username_label = document.createElement("LABEL");
    username_label.for = "username"
    username_label.textContent = "Username:"

    var password_label = document.createElement("LABEL");
    password_label.for = "password"
    password_label.textContent = "Password:"

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

    var confirm = document.createElement("button");
    confirm.innerHTML = "Confirm";
    confirm.addEventListener("click",function(){
        var valid = validLogin('#username','#password');
        if(valid){
            clearPage();
            active_divs = [];
            GameMenu(login_user);
        }
        return false
    })

    var username_li = document.createElement("LI");
    username_li.appendChild(username_label);
    username_li.appendChild(username_input);

    var password_li = document.createElement("LI");
    password_li.appendChild(password_label);
    password_li.appendChild(password_input);

    var confirm_li = document.createElement("LI");
    confirm_li.appendChild(confirm)

    document.getElementById("register_form_ul").appendChild(username_li);
    document.getElementById("register_form_ul").appendChild(password_li);
    document.getElementById("register_form_ul").appendChild(confirm_li);


    var back_button_li = document.createElement('LI');
    var back_button = document.createElement("button");
    back_button.innerHTML = "Back";
    back_button.addEventListener ("click", function() {
        document.getElementById("register_form_ul").remove();
        active_divs = [];
        wellcome();
    });
    back_button_li.appendChild(back_button);
    document.getElementById("register_form_ul").appendChild(back_button_li);

    login_div.addEventListener("keydown",function(e){
        if(e.key == "Enter"){
            var valid = validLogin('#username','#password');
            if(valid){
                clearPage();
                active_divs = [];
                GameMenu(login_user);
            }
            return false
        }
    })
}
