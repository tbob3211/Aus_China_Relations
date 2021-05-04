// var it = 0;
window.onload = function () {
    var mydiv = document.getElementById("topnav");
    var it = document.getElementById("main");
    window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 500) {
            mydiv.style.position = "fixed";                    
            mydiv.style.top = "90px";
            mydiv.style.width = "100%";
            it.style.marginTop = "80px";
        }
        else {
            mydiv.style.position = "static";
            it.style.marginTop = "0px";
        }
    }
}






$(document).ready(function () {
 
    var i = 0;

    var clone = $(".imgdiv .imageul li").first().clone();//Clone the first picture
    $(".imgdiv .imageul").append(clone);//Clone to the end of the list
    var size = $(".imgdiv .imageul li").size();

    /*move event*/
    function move() {
        if (i == size) {
            $(".imgdiv .imageul").css({ left: 0 });
            i = 1;
        }
        if (i == -1) {
            $(".imgdiv .imageul").css({ left: -(size - 1) * 800 });
            i = size - 2;
        }
        $(".imgdiv .imageul").stop().animate({ left: -i * 800 }, 800);

    }


    var t = setInterval(function () { i++; move();},2000);

    /*Automatic rotation*/
    /*Mouseover event*/
    $(".imgdiv").hover(function () {
        clearInterval(t);//Clear the clock when mouse hover
    }, function () {
        t = setInterval(function () { i++; move(); }, 2000); //reset the clock
    });

    /*left button*/
    $(".imgdiv .btn_l").click(function () {
        i++;
        move();
    })


    /*right button*/
    $(".imgdiv .btn_r").click(function () {
        i--;
        move();
    })


});