
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
