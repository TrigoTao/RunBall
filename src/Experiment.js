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

        for (i = 0; i < config_jigsaw.length; i++) {
            item = config_jigsaw[i];
            console.log(item);

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

        Crafty.e("Ball, Fourway")
            .appear(250,50,5)
            .fourway(1)
            .bind("Moved", function(){
                var center = this.getCenter();
                this.nowIn = track.containsPoint(center.x,center.y,5);
                if(this.nowIn == false && this.lastTimeIn){
                    this.appear(250,50,5);
                    console.log('out');
                    Crafty.audio.play("warn");
                }
                this.lastTimeIn = this.nowIn;
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
