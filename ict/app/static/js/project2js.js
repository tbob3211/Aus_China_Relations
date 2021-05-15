// This is for the image rotation effect on the Theme page

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

// This is for the assessment page performance and switch performance
(function($) {
    $.fn.jquizzy = function(settings) {
        var defaults = {
            questions: null,
            endText: 'Finish!',
            sendResultsURL: null,
            resultComments: {
                perfect: 'Italian Genius!!!',
                excellent: 'Excellent!',
                good: 'You have a basic understanding of Italian food!',
                average: 'On average~ You can learn more.',
                bad: 'Not good!You can do better！',
                worst: 'Sorrowful!'
            }
        };
        var config = $.extend(defaults, settings);
        var superContainer = $(this);
        var answers = [];
        var intro = '	<div class="intro-container slide-container"><a class="nav-start" href="#">Are you ready?</br>Start</a></div>	';
        var exit = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="result-keeper"></div></div><div class="notice">Please select one option！</div>';        
        var content = '';
        var questionsIteratorIndex = 0;
        var answersIteratorIndex = 0;
        superContainer.addClass('main-quiz-holder');
        // Set the question subpages
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            content += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                content += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }
            content += '</ul><div class="nav-container">';
            if (questionsIteratorIndex !== 0) {
                content += '<div class="prev"><a class="nav-previous" href="#">&lt; Last</a></div>';
            }
            if (questionsIteratorIndex < config.questions.length - 1) {
                content += '<div class="next"><a class="nav-next" href="#">Next &gt;</a></div>';
            } 
            else {
                content += '<div class="next final"><a class="nav-show-result" href="#">Finish &gt;</a></div>';
            }
            content += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }
        // Combine the intro, content and exit part as one part
        superContainer.html(intro + content + exit);
        notice = superContainer.find('.notice'),
        userAnswers = [],
        questionLength = config.questions.length,
        slidesList = superContainer.find('.slide-container');
        // Check the Users answer which can be used to give feedback
        function checkAnswers() {
            var resultArr = [],
            flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }
        // Give users their score and evaluation
        function judgeSkills(score) {
            if (score === 100) return config.resultComments.perfect;
            else if (score > 80) return config.resultComments.excellent;
            else if (score > 60) return config.resultComments.good;
            else if (score > 40) return config.resultComments.average;
            else if (score > 20) return config.resultComments.bad;
            else return config.resultComments.worst;
        }
        notice.hide();
        slidesList.hide().first().fadeIn(500);
        // The CSS of option change when click this option and record if user have chosen the choice
        superContainer.find('li').click(function() {
            var thisLi = $(this);
            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } 
            else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');
            }
        });
        // Click and start the test
        superContainer.find('.nav-start').click(function() {
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
            });
            return false;
        });
        // Click the next button
        superContainer.find('.next').click(function() {
            // return error if no option been selected
            if ($(this).parents('.slide-container').find('li.selected').length == 0) {
                notice.fadeIn(300);
                return false;
            }
            notice.hide();
            // Switch to the next question
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
            });
            return false;
        });
        // Go back to the last question, similar with ".next"
        superContainer.find('.prev').click(function() {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).prev().fadeIn(500);
            });
            return false;
        });
        // Find the last question
        superContainer.find('.final').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length == 0) {
                notice.fadeIn(300);
                return false;
            }
            //Push the answers of user into the array
            superContainer.find('li.selected').each(function(index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            //Send result to the feeedback page
            if (config.sendResultsURL !== null) {
                var collate = [];
                for (r = 0; r < userAnswers.length; r++) {
                    collate.push('{"questionNumber":"' + parseInt(r + 1, 10) + '", "userAnswer":"' + userAnswers[r] + '"}');
                }
                $.ajax({
                    type: 'POST',
                    url: config.sendResultsURL,
                    data: '{"answers": [' + collate.join(",") + ']}',
                    // complete: function() {
                    //     console.log("OH HAI");
                    // }
                });
            }
            var results = checkAnswers();
            var resultSet = '';
            var trueCount = 0;
            var feedbackButton = 'Feedback page';
            var score;
            // var url;
            // if (config.shortURL === null) {
            //     config.shortURL = window.location
            // };
            for (var i = 0; i < results.length; i++) {
                if (results[i] === true) {
                    trueCount++;
                    isCorrect = true;
                }
                resultSet += '<div class="result-row">' + (results[i] === true ? "<div class='correct'>#"+(i + 1)+"</div>": "<div class='wrong'>#"+(i + 1)+"</div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul></div></div>';
            }
            score = Math.round(trueCount / questionLength * 100);

            // Give the result page
            resultSet = '<h2>' + judgeSkills(score) + '<br/> Your score is:  ' + score + '</h2><a href="index.html">' + feedbackButton + '</a></br>' + resultSet;
            superContainer.find('.result-keeper').html(resultSet).show(500);
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function() {
                $(this).find('.resultsview-qhover').show();
            },
            function() {
                $(this).find('.resultsview-qhover').hide();
            });
            $(this).parents('.slide-container').fadeOut(500,
            function() {
                $(this).next().fadeIn(500);
            });
            return false;
        });
    };
})(jQuery);



(function (){
 
    window.onload = function(){

        // This is for the navigation bar which is always at the beginning as it scrolls to a certain position
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


        // Draw a bar chart
        var data = [1000,1300,2000,3000,2000,2000,1000,1500,2000,5000,1000,1000];
        var xinforma = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        // Get the content
        var a_canvas = document.getElementById('a_canvas');
        var context = a_canvas.getContext("2d");


        // Draw the Background
        var gradient = context.createLinearGradient(0,0,0,300);


        gradient.addColorStop(0,"#e0e0e0");
        gradient.addColorStop(1,"#ffffff");


        context.fillStyle = gradient;

        context.fillRect(0,0,a_canvas.width,a_canvas.height);

        var realheight = a_canvas.height-15;
        var realwidth = a_canvas.width-40;
        
        // Get the board
         
        var grid_cols = data.length + 1;
        var grid_rows = 4;
        var cell_height = realheight / grid_rows;
        var cell_width = realwidth / grid_cols;
        context.lineWidth = 2;
        context.strokeStyle = "#a0a0a0";

        context.beginPath();

        // Draw the row lines

        for(var row = 1; row <= grid_rows; row++){
            var y = row * cell_height;
            context.moveTo(0,y);
            context.lineTo(a_canvas.width, y);
        }
     
        context.moveTo(0,realheight);
        context.lineTo(realwidth,realheight);
           
        
        // Draw the column lines

        context.moveTo(0,20);
        context.lineTo(0,realheight);
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.stroke();
         

        var max_v =0;
     
        for(var i = 0; i< data.length ; i++){
            if (data[i] > max_v) { max_v =data[i]};
        }
        max_v = max_v * 1.1;
        
        // Convert the data into point
        
        var points = [];
        for( var i=0; i <  data.length ; i++){
            var v= data[i];
            var px = cell_width *　(i +1);
            var py = realheight - realheight*(v / max_v);
            points.push({"x":px,"y":py});
        }

        // Draw the bar chart of data
        for(var i in points){
            var p = points[i];
            context.beginPath();
            context.fillStyle="green";
            context.fillRect(p.x,p.y,15,realheight-p.y);
            
            context.fill();
        }
        // Add the text to illustrate the bar chart
        for(var i in points)
        {  var p = points[i];
            context.beginPath();
            context.fillStyle="black";
            context.fillText(data[i], p.x + 1, p.y - 15);
            context.fillText(xinforma[i],p.x + 1,realheight+12);
            context.fillText('Month',realwidth,realheight+12);
            context.fillText('Money',0,10);
        }
    
    };
})();