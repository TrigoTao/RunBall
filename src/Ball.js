
//ball_r = 10;

Crafty.c('Ball',{
    init : function() {
        this.ball_r = 0;
        this.requires('Arc');
        return this;
    },

    appear : function(x, y, ball_r){
        this.ball_r = ball_r;
        this.attr({x: x, y: y})
            .arc(ball_r,0,Math.PI * 2,1);
        return this;
    },

    getCenter : function(){
        return { x : this.x+this.ball_r+1, y : this.y+this.ball_r+1};
    }
});

//Crafty.e("2D, Canvas,Ball, Arc, Collision, Fourway, WiredHitBox")
//    //.arc(ball_r, 0, Math.PI * 2, 'red')
//    //.color('red')
//    .attr({x:250, y:50})
//    .fourway(2)
//    .collision(new Crafty.circle(0,0,ball_r))
//    .bind("Moved", function(from){
//        console.log(from);
//        console.log(track.containsPoint(from.x,from.y));
//    })
//    .onHit('Paddle', function () {
//        //console.log("hit");
//    });
