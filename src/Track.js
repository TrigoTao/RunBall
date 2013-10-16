Crafty.c('Track', {
    init: function(){
        this.jigsaw = [];

        return this;
    },

    push: function(obj){
        this.jigsaw.push(obj);

        return this;
    },

    // if the point is a ball(2D), r is its radius
    containsPoint: function(x,y,r){
        jigsaw = this.jigsaw;
        for(var i =0 ; i < jigsaw.length ; i++){
            piece = jigsaw[i];
            if(piece.containsPoint(x,y,r)){
                return true;
            }
        }
        return false;
    }
});
