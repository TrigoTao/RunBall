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
        var jigsaw = this.jigsaw;
        for(var i =0 ; i < jigsaw.length ; i++){
            piece = jigsaw[i];
            if(piece.containsPoint(x,y,r)){
                return true;
            }
        }
        return false;
    },

    cPointInHead: function(x,y,r){
        if(this.jigsaw.length > 0){
            var head = this.jigsaw[0];
            return head.containsPoint(x,y,r);
        }
        return false;
    },

    cPointInTail: function(x,y,r){
        if(this.jigsaw.length > 0){
            var tail = this.jigsaw[this.jigsaw.length - 1];
            return tail.containsPoint(x,y,r);
        }
        return false;
    }
});
