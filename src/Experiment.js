Experiment = {
    start : function(FRAME,WIDTH,HEIGHT){
        WIDTH  = WIDTH  || 840;
        HEIGHT = HEIGHT || 540;
        console.log(FRAME);
        Crafty.init(WIDTH, HEIGHT,FRAME);
        Crafty.background('rgb(127,127,127)');

        //add beep sound
        Crafty.audio.add("warn", "workspace/2HAND/assets/sounds/beep-1.mp3");
       
        //Paddles
        var track = Crafty.e("Track");

        jigsaws = config_jigsaw.jigsaws;
        for (var i = 0; i < jigsaws.length; i++) {
            item = jigsaws[i];

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
                    console.log('no such type');
                    break;
            }
        }

        ball_attr = config_jigsaw.ball;
        Crafty.e("Ball, Fourway")
            .setHistoryNum(5)
            .setOnTrack(track)
            .setRunTimes(1)
            .appear(ball_attr.x, ball_attr.y, ball_attr.r)
            .fourway(1)
            .moveOnTrack(function(ball){
                    console.log('over');
                    ball.fourway(0);
                    //score_board.text('over');
                    score_board.text('time : ' + ball.record_time.join(',') + ' wrong :  ' +  ball.wrong_times);
                });

        //Score boards
        var score_board = Crafty.e("LeftPoints, DOM, 2D, Text")
            .attr({ x: 100, y: 20, w: 100, h: 20, points: 0 });
        //Crafty.e("RightPoints, DOM, 2D, Text")
        //    .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
        //    .text("0 Points");
    }
}
