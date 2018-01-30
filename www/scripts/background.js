var backgroundImgChoose = 1;
var background = null;

function backgroundImgChange(num) {
    backgroundImgChoose += num;
    
    var mybackground = document.getElementsByClassName("myBackground");

    if (backgroundImgChoose >= mybackground.length) {
        backgroundImgChoose = 0;
    }

    if (backgroundImgChoose < 0) {
        backgroundImgChoose = mybackground.length -1;
    }

    console.log(backgroundImgChoose);

    for (var i = 0; i < mybackground.length; i++) {
        if (backgroundImgChoose === i) {
            mybackground[i].style.display = "block";
        } else {
            mybackground[i].style.display = "none";
        }
    }
}