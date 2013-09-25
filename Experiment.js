Experiment = {
    start : function(ignore,WIDTH,HEIGHT){
        WIDTH  = WIDTH  || 600;
        HEIGHT = HEIGHT || 300;
        Crafty.init(WIDTH, HEIGHT);
        Crafty.background('rgb(127,127,127)');
       
        //Paddles
        Crafty.e("Paddle, Color, Arc, Fourway, Collision")
            .arc(20, 0, Math.PI / 2 ,'rgb(0,0,255)')
            .collision(new Crafty.circle(0,0,20))
            .attr({ x: 20, y: 100 })
            .onHit('ball',function(){
                    console.log('left');
            });
  
        Crafty.e("Paddle, 2D, Canvas, Color, Multiway")
             .color('rgb(0,255,0)')
             .attr({ x: 580, y: 100, w: 10, h: 100 });
             //.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90 });
        
        //Ball
//        Crafty.e("2D, DOM, Color, Collision")
//            .color('rgb(0,0,255)')
//            .attr({ x: 300, y: 150, w: 10, h: 10, 
//                    dX: Crafty.math.randomInt(2, 5), 
//                    dY: Crafty.math.randomInt(2, 5) })
//            .bind('EnterFrame', function () {
//                //hit floor or roof
//                if (this.y <= 0 || this.y >= 290)
//                    this.dY *= -1;
//        
//                if (this.x > 600) {
//                    this.x = 300;
//                    Crafty("LeftPoints").each(function () { 
//                        this.text(++this.points + " Points") });
//                }
//                if (this.x < 10) {
//                    this.x = 300;
//                    Crafty("RightPoints").each(function () { 
//                        this.text(++this.points + " Points") });
//                }
//        
//                this.x += this.dX;
//                this.y += this.dY;
//            })
//            .onHit('Paddle', function () {
//                this.dX *= -1;
//            });
//
        

        ball_r = 20;
        Crafty.e("ball, Arc, Collision, Fourway")
            .arc(ball_r, 0, Math.PI * 2, 'red')
            //.color('red')
            .attr({x:250, y:50})
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
