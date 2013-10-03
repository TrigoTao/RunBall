Experiment = {
    start : function(ignore,WIDTH,HEIGHT){
        WIDTH  = WIDTH  || 600;
        HEIGHT = HEIGHT || 400;
        Crafty.init(WIDTH, HEIGHT);
        Crafty.background('rgb(127,127,127)');
       
        //Paddles

        Crafty.e("2D, Canvas, Paddle, Arc, Color,  Collision, WiredHitBox")
            .attr({ x: 50, y: 150 })
            .arc(20, Math.PI/2, Math.PI,'rgb(0,0,255)')
            .collision(new Crafty.polygon(ArcPointData(20, Math.PI/2, Math.PI)))
            .onHit('Ball',function(){
                    console.log('left');
            });
  

        Crafty.e("Paddle, 2D, Canvas, Color, Collision,WiredHitBox")
            .color('rgb(0,255,0)')
            .attr({ x: 580, y: 100, w: 10, h: 100 })
            .collision()
            .onHit('Ball',function(){
                    console.log('right');
            });
        
        ball_r = 10;
        Crafty.e("Ball, 2D, Canvas, Collision, Fourway, WiredHitBox")
            //.arc(ball_r, 0, Math.PI * 2, 'red')
            //.color('red')
            .attr({x:250, y:50, w: 10, h :10})
            .fourway(2)
            .collision(new Crafty.circle(0,0,ball_r))
            .onHit('Paddle', function () {
                //console.log("hit");
            });

        //Score boards
        Crafty.e("LeftPoints, DOM, 2D, Text")
            .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
            .text("0 Points");
        Crafty.e("RightPoints, DOM, 2D, Text")
            .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
            .text("0 Points");
    }
}
