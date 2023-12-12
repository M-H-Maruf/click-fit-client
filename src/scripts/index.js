$(document).ready(function () {
    // preloader appearance disappearance
    $('#preloader').delay(1000).fadeOut(500, function () {
        $('#content').fadeIn(500);
    });

});