$(document).ready(function () {
    // preloader appearance disappearance
    $('#preloader').delay(1000).fadeOut(500, function () {
        $('#content').fadeIn(500);
    });

    // ajax call to numbers
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            $('#api-content').html(data.text).addClass('fade-in');
        },
        error: function (error) {
            console.log('Error fetching API data:', error);
        }
    });
});