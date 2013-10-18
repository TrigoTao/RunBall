Experiment = {
    start : function(ignore,WIDTH,HEIGHT){
        WIDTH  = WIDTH  || 600;
        HEIGHT = HEIGHT || 400;
        Crafty.init(WIDTH, HEIGHT);
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
            .appear(ball_attr.x, ball_attr.y, ball_attr.r)
            .fourway(1)
            .bind("Moved", function(from){
                var center = this.getCenter();
                this.nowIn = track.containsPoint(center.x,center.y,5);
                if(this.nowIn == false && this.lastTimeIn){
                    this.goBack();
                    console.log('out');
                    Crafty.audio.play("warn");
                }
                this.lastTimeIn = this.nowIn;
                this.recPosHistory(this.getPos());
                console.log(this.getPosHistory());
            });

        //Score boards
        //Crafty.e("LeftPoints, DOM, 2D, Text")
        //    .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
        //    .text("0 Points");
        //Crafty.e("RightPoints, DOM, 2D, Text")
        //    .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
        //    .text("0 Points");
    }
}
