//copy ip to clipboard (footer)
var canAnimateFooterIp = true;
$(document).ready(function() {
    $("#footer_ip").click(function(event) {
        event.preventDefault();
        if(canAnimateFooterIp) {
            canAnimateFooterIp = false;
            var $footer_ip = $("#footer_ip");
            var originalFooter = $footer_ip.html();
            
            navigator.clipboard.writeText("play.sunsmp.com").then(function() {
                $footer_ip.fadeOut(200, function() {
                    // We keep the <a> tag here so it stays bold and yellow!
                    $footer_ip.html("<a href=''>COPIED IP!<i class='fa-solid fa-check'></i></a>").fadeIn(200);
                    setTimeout(function() {
                        $footer_ip.fadeOut(200, function() {
                            $footer_ip.html(originalFooter).fadeIn(200);
                        });
                    }, 1000);
                });
            });
            
            setTimeout(function() {
                canAnimateFooterIp = true;
            }, 1500);
        }
    });
});