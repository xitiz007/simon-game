var user_turn = false;
var game_started = false;
var is_computer_turn = false;

var level = 1;
var player_array = [];
var random_generated_array = [];

color_name_index = {
    green : 0, 
    red : 1,
    yellow : 2,
    blue : 3
}



function show_level()
{
    $('#level-title').text('Level ' + level);
}

function animate_pressed(element)
{
    $(element).addClass('pressed');
    setTimeout(function(){
        $(element).removeClass('pressed');
    }, 100);
}

function play_sound(filename)
{
    let audio = new Audio('sounds/' + filename + '.mp3');
    audio.play();
}

function generate_random_number()
{
    number = Math.floor(Math.random() * 4);
    return number;
}

function reset()
{
    user_turn = false;
    game_started = false;
    is_computer_turn = false;
    level = 1;
    player_array = [];
    random_generated_array = [];
}

function game_over()
{
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    play_sound('wrong');
    setTimeout(function(){
        $('body').removeClass('game-over');
    }, 800);

}

function level_up()
{
    level++;
}

function check()
{
    length_player_array = player_array.length;
    length_random_generated_array = random_generated_array.length;
    if(length_player_array === length_random_generated_array)
    {
        // computer_turn
        is_computer_turn = true;
    }
    else
    {
        // user_turn
        is_computer_turn = false;
    }

    return JSON.stringify(player_array) === JSON.stringify(random_generated_array.slice(0, length_player_array));
}

$('div.btn').click(function(){
    if (game_started && user_turn)
    {
        user_turn = false;
        animate_pressed(this);
        let pressed_button_color_name = $(this).attr('data-button_color');
        play_sound(pressed_button_color_name);
        button_number = color_name_index[pressed_button_color_name];
        player_array.push(button_number);

        if(check())
        {
            if(is_computer_turn)
            {
                level_up();
                show_level();
                setTimeout(computer_turn, 900);
                player_array = [];
            }
            else {
                user_turn = true;
            }
        }
        else
        {
            game_over();
            reset();
        }
    }

});

function computer_turn()
{
    color_index = generate_random_number();
    color_name = Object.keys(color_name_index).find(key => color_name_index[key] === color_index);
    random_generated_array.push(color_index);
    element = $('div[data-button_color=' + color_name + ']');
    animate_pressed(element);
    user_turn = true;
}

function start_game()
{
    show_level();
    computer_turn();
}



$(document).keypress(function(){
    if(!game_started)
    {
        game_started = true;
        start_game();

    }
});