;(function($) {

  $('#play-jam').click(function() {

    var audio = new Audio('/austin.wav');
    audio.play();
    var death = new Audio('/death.wav');
    death.play()

  });

})(jQuery);