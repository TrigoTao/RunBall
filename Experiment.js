Experiment = {
    start : function(ignore,WIDTH,HEIGHT){
        WIDTH  = WIDTH  || 600;
        HEIGHT = HEIGHT || 400;
        Crafty.init(WIDTH, HEIGHT);
        Crafty.background('rgb(127,127,127)');

        //add beep sound
        Crafty.audio.add("warn", "workspace/2HAND/assets/sounds/beep-1.mp3");
       
        //Paddles
        var track = Crafty.e("Track")
            .push( Crafty.e("Arc")
                    .attr({ x: 50, y: 150 })
                    .arc(50, Math.PI/2, Math.PI*3/2, 20, 'green')
            )
            .push( Crafty.e("Line").line([300,150],[100,150],20,'green'))
            //.push( Crafty.e("Line").line([200,20],[40,40],1,'black'))
            //.push( Crafty.e("Line").line([198.7,10.0],[38.7,30.0],1,'black') );

        Crafty.e("Paddle, 2D, Canvas, Color, Collision,WiredHitBox")
            .color('rgb(0,255,0)')
            .attr({ x: 580, y: 100, w: 10, h: 100 })
            .collision()
            .onHit('Ball',function(){
                console.log('right');
            });
        

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
