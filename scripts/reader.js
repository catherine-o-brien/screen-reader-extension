$(document).ready(function () {

    //Prevents page from jumping
    $(this).on('keydown', function(e){
        if(e.keyCode == 32) {
            e.preventDefault();
        }
    });

    $("*:not(body, html.no-js)").hover(

        //Executed when mouse enters an element
        function (e) {
            $(".highlight").removeClass('highlight');
            $(this).addClass("highlight");
            e.stopPropagation();
        },

        //Executed when mouse exits an element
        function (e) {
            $(this).removeClass("highlight");
        }
    )

    $(document).on('keyup', function(e) {

        //If currently reading, keypress triggers speech synthesizer to stop reading
        if (window.speechSynthesis.speaking) {
            speechSynthesis.cancel();

        //Pressing spacebar triggers reading
        } else {
            if (e.originalEvent['key'] == ' ') {
                read(e);
            }
        }
    });
});

function read(e){
    //If the highlighted area is an image, read alt text
    if ($( '.highlight' ).attr('alt')) {
        let text = $( '.highlight' ).attr('alt');
        console.log(text);
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));

    //If the highlighted area is an image with no alt text, read the src
    } else if ($( '.highlight' ).attr('src')) {
        let text = $( '.highlight' ).attr('src');
        console.log(text);
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));

    //If the highlighted area is text, read the text
    } else {
        let text = $(".highlight").text();
        console.log(text);
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
}