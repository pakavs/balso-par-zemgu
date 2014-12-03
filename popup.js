var zigis = {

    init: function() {
        $("#ranks tbody").html("");
        $.get("https://allstarvote.nhl.com/en-us/LeaderBoard", function(data) {
            if ($(data).find("#btn-signIn").length > 0) {
                $('#login-container').fadeIn();
            } else {
                $('#vote-button').fadeIn();
            }

            var pos = 1;
            $(data).find("table tbody tr").each(function(a) {

                var el = $(this);

                if (el.find(".position").text() == 'Forward') {
                    el.find('.rank').html(pos);
                    el.find('.trending').remove();
                    el.find('.player img').remove();
                    el.find('.position').remove();
                    $("#ranks tbody").append('<tr>' + el.html() + '</tr>');
                    pos++;
                }
            });

            $('#ranks').slideDown();
        });
    },
};


document.addEventListener('DOMContentLoaded', function() {
    zigis.init();

    $("#login-button").click(function() {        
        $("#logs").hide();
        $("#logs").text("");
        $.post(
            "https://allstarvote.nhl.com/en-us/LoginWithEmailAndPassword", {
                Identifier: $("#Identifier").val(),
                Proof: $("#Proof").val()
            },
            function(data) {
                if (data.StatusCode == "1") {
                    $('#login-container').hide();
                    $('#vote-button').fadeIn();

                } else {
                    $("#logs").text(data.Message);
                    $("#logs").fadeIn();
                }
            },
            "json"
        );
    });

    $("#vote-button").click(function() {
    
    $("#logs").text("");
    $("#logs").show();
    
        for (var i = 0; i < 10; i++) {
            $.post(
                "https://allstarvote.nhl.com/en-us/SmallBallot?lastSubmitted=Fals", {
                    ForwardId1: "84"
                },
                function(data) {
                    $("#logs").append($(data).find(".modal-body h2").text() + $(data).find(".modal-body p").text()+"<br>");
                });
        }
        
        setTimeout(function(){ $("#logs").fadeOut(2000,"swing");}, 5000);
    });
});
