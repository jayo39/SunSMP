// player count api
$(document).ready(() => {
    let ip = $(".sip").attr("data-ip");
    let port = $(".sip").attr("data-port");
    if (port == "" || port == null) port = "25565";
    if (ip == "" || ip == null) return console.error("Ip is not set");
    updatePlayercount(ip, port);
    setInterval(() => {
        updatePlayercount(ip, port);
    }, 60000);
});

const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('online')) {
            $(".sip").html(result.online);
            if (result.online > 0) {
                // Updated to SunSMP Bright Green
                $("#server_status").css({'color': '#4df14d'}); 
            } else {
                $(".sip").html(0);
                $("#server_status").css({'color': '#FFFFFF'});
            }
        } else {
            $(".status").html("Server isn't online!");
        }
    });
};

// discord member count api
$(document).ready(function() {
    // Updated to the SunSMP Discord Invite Code
    var invCode = "3SYXu47xrJ"; 
    var url = "https://discord.com/api/v9/invites/" + invCode + "?with_counts=true";
    $.ajax({
        url: url,
        type: "GET",
        success: function(data, status) {
            (status == "success") && parseJSON(data);
        }
    });
});

function parseJSON(data) {
    $(".sdisc").html(data.approximate_presence_count);
}


// copy ip to clipboard (header)
var canAnimateIp = true;
$(document).ready(function() {
    $("#minecraftserver").click(function(event) {
        event.preventDefault();
        if(canAnimateIp) {
            canAnimateIp = false;
            var $ip = $("#ip");
            var original = $ip.html();
            
            // Updated to the new SunSMP IP
            navigator.clipboard.writeText("play.sunsmp.com").then(function() {
                $ip.fadeOut(200, function() {
                    $ip.css({'margin-top': '25px'});
                    $ip.html("COPIED IP!").fadeIn(200);
                    setTimeout(function() {
                        $ip.fadeOut(200, function() {
                            $ip.css({'margin-top': '15px'});
                            $ip.html(original).fadeIn(200);
                        });  
                    }, 1000);
                });
            });
            setTimeout(function() {
                canAnimateIp = true;
            }, 1500);
        }

    });
});