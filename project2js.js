// var it = 0;
window.onload = function () {
    var mydiv = document.getElementById("topnav");
    var it = document.getElementById("main");
    window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 1340) {
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