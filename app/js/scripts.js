var score = 0;

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function startTimer(duration, display) {
    $('.start-game').remove();
    $('body').removeClass('not-ready');
    
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            clearInterval(interval);
            $('body').html('<div class="score">'+score+'</div><button type="button" class="btn btn-success">Relancer le jeu</button>');
        }
    }, 1000);
}

$(document).ready(function(){
    require('electron').ipcRenderer.on('images', function(event, message) {
        var threeMinutes = 60 * 3,
            display = $('.countdown');
        var images = message;
        shuffle(images);
        var img = $('.image img');
        var sc = $('.score');
        img.attr('src', 'photos/' + images[0]);
        $('body').on('click', '.btn', function() {
            if($(this).hasClass('btn-success'))
                location.reload();
            else if($(this).hasClass('btn-warning'))
                startTimer(threeMinutes, display);
            else{
                var idx = img.data('img');
                score = parseInt(sc.html());
                idx++;
                img.data('img', idx);
                img.attr('src', 'photos/' + images[idx]);
                if ($(this).hasClass('btn-primary'))
                    score++;
                if ($(this).hasClass('btn-danger'))
                    score--;
                sc.html(score);
            }
        });
    });
});