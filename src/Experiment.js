//  warn : depend on a global logger

function Experiment() {
    /*
    var logger;

    getLogger = function(){

        if( typeof Log4js != 'undefined' ){
            var logger = Log4js.getLogger("Experiment"); 
            //set the level of logging 
            logger.setLevel(Log4js.Level.ALL); 
            //set the Appender to write the log to 
            logger.addAppender(new ConsoleAppender());

            return logger;
        }

        if( typeof log4javascript != 'undefined' ){
            var logger = log4javascript.getLogger()
            var browserConsoleAppender = new log4javascript.BrowserConsoleAppender();
            var layout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
            browserConsoleAppender.setLayout(layout);
            logger.addAppender(browserConsoleAppender);

            return logger;
        }
        
        return console;
    }; 

    this.init = function(){
        logger = getLogger();
    };*/

    this.start = function(FRAME,WIDTH,HEIGHT,over_func) {
        if(typeof over_func == 'undefined' && typeof WIDTH == 'function') {
            over_func = WIDTH;
            WIDTH =null;
        }
        over_func = over_func || function(){}
        WIDTH  = WIDTH  || 840;
        HEIGHT = HEIGHT || 540;
        Crafty('*').each( function() {
            this.destroy();
        });
        Crafty.init(WIDTH, HEIGHT,FRAME);
        Crafty.background('rgb(127,127,127)');

        //add beep sound
        Crafty.audio.add("warn", "workspace/2HAND/assets/sounds/beep-1.mp3");
       
        //Paddles
        var track = Crafty.e("Track");

        var jigsaws = config_jigsaw.jigsaws;
        for (var i = 0; i < jigsaws.length; i++) {
            var item = jigsaws[i];

            switch( item.type ){
                case "Arc":
                    arc_piece = Crafty.e("Arc");
                    track.push( arc_piece.attr(item.attr).arc.apply(arc_piece, item.arc) );
                    break;
                case "Line":
                    line_piece = Crafty.e("Line");
                    track.push( line_piece.line.apply(line_piece, item.line) );
                    break;
                default:
                    logger.error('no such type');
                    break;
            }
        }

        ball_attr = config_jigsaw.ball;
        ball_round = config_jigsaw.times[FRAME] * 2;

        Crafty.e("Ball, Fourway")
            .setHistoryNum(5)
            .setOnTrack(track)
            .setRunTimes(ball_round)
            .appear(ball_attr.x, ball_attr.y, ball_attr.r)
            .fourway(1)
            .moveOnTrack(function(ball){
                    //logger.debug('over');
                    ball.fourway(0);
                    //score_board.text('over');
                    score_board.text('time : ' + ball.record_time.join(',') + ' wrong :  ' +  ball.wrong_times);
                    over_func( ball.record_time, ball.wrong_times );            
                });

        //Score boards
        var score_board = Crafty.e("LeftPoints, DOM, 2D, Text")
            .attr({ x: 100, y: 20, w: 100, h: 20, points: 0 });
        //Crafty.e("RightPoints, DOM, 2D, Text")
        //    .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
        //    .text("0 Points");
    };

    //this.init();
}
