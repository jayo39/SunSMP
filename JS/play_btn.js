var canAnimatePlayBtn = true;
$(document).ready(function() {
    $("#playBtnContainer").click(function(event) {
        event.preventDefault();
        if(canAnimatePlayBtn) {
            canAnimatePlayBtn = false;
            
            // We target the inner span so the green button background stays visible
            var $playBtn = $("#playBtn");
            var originalPlay = $playBtn.html(); 
            
            navigator.clipboard.writeText("play.sunsmp.com").then(function() {
                $playBtn.fadeOut(200, function() {
                    // Swaps to "COPIED IP!" with a checkmark icon
                    $playBtn.html("<i class='fa-solid fa-check'></i>COPIED IP!").fadeIn(200);
                    
                    setTimeout(function() {
                        $playBtn.fadeOut(200, function() {
                            // Swaps back to normal
                            $playBtn.html(originalPlay).fadeIn(200);
                        });
                    }, 1000);
                });
            });
            
            setTimeout(function() {
                canAnimatePlayBtn = true;
            }, 1500);
        }
    });
});