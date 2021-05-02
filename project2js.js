// var it = 0;
window.onload = function () {
    var mydiv = document.getElementById("topnav");
    var it = document.getElementById("main");
    window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 1430) {
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

    var clone = $(".imgdiv .imageul li").first().clone();//克隆第一张图片
    $(".imgdiv .imageul").append(clone);//复制到列表最后
    var size = $(".imgdiv .imageul li").size();
    console.log(size);//计算li的数量

    /*移动事件*/
    function move() {
        if (i == size) {
            $(".imgdiv .imageul").css({ left: 0 });
            i = 1;
        }
        if (i == -1) {
            $(".imgdiv .imageul").css({ left: -(size - 1) * 700 });
            i = size - 2;
        }
        $(".imgdiv .imageul").stop().animate({ left: -i * 700 }, 700);

    }


    var t = setInterval(function () { i++; move();},2000);

    /*自动轮播*/
    /*鼠标悬停事件*/
    $(".imgdiv").hover(function () {
        clearInterval(t);//鼠标悬停时清除定时器
    }, function () {
        t = setInterval(function () { i++; move(); }, 2000); //鼠标移出时重置定时器
    });

    /*向左按钮*/
    $(".imgdiv .btn_l").click(function () {
        i++;
        move();
    })


    /*向右按钮*/
    $(".imgdiv .btn_r").click(function () {
        i--;
        move();
    })


});