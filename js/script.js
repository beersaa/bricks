    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var paddlex;
    var paddleh;
    var paddlew;
    var x;
    var y;
    var dx;
    var dy;
    var r;
    var f;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var rightDown = false;
    var leftDown = false;
    var start = true;
    var sekunde;
    var sekundeI;
    var minuteI;
    var intTimer;
    var izpisTimer;
    var tocke;
    
    function init() {
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 75;
        x = 150;
        y = 150;
        dx = 2;
        dy = 4;
        r = 10;
        f = 15;
        NROWS = 5;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 15;
        PADDING = 1;
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
        tocke = 0;
        sekunde = 0;
        izpisTimer = "00:00";
        intTimer = setInterval(timer, 1000);
        return setInterval(draw, 10);
    }

    function timer() {
        if (start == true) {
            sekunde++;
            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;
            $("#cas").html(izpisTimer);
        } else {
            sekunde = 0;
            $("#cas").html(izpisTimer);
        }
    }

    function draw() {
        clear();
        circle(x, y, 10);
        if (rightDown) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 5;
            } else {
                paddlex = WIDTH - paddlew;
            }
        } else if (leftDown) {
            if (paddlex > 0) {
                paddlex -= 5;
            } else {
                paddlex = 0;
            }
        }
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        if (y < NROWS * BRICKHEIGHT && y > 0) {
            row = Math.floor(y / (BRICKHEIGHT + PADDING));
            col = Math.floor(x / (BRICKWIDTH + PADDING));
            if (row >= 0 && col >= 0 && bricks[row][col] == 1) {
                dy = -dy;
                bricks[row][col] = 0;
                tocke += 1;
                $("#tocke").html(tocke);
            }
        }

        if (x + dx > WIDTH - 10 || x + dx < 10) {
            dx = -dx;
        }
        if (y + dy < 10) {
            dy = -dy;
        } else if (y + dy > HEIGHT - (10 + f)) {
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
                dy = -dy;
            } else if (y + dy > HEIGHT - 10) {
                clearInterval(intervalId);
            }
        }

        x += dx;
        y += dy;
    }
    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39)
            rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 39)
            rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    $(document).mousemove(function(evt) {
        paddlex = evt.pageX - canvas.offsetLeft - paddlew / 2;
    });

    var intervalId = init();

    