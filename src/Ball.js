Crafty.c('Ball',{
    init : function() {
        this.ball_r = 0;
        this.requires('Arc');
        this.pos_history = [];
        this.history_num = 0;
        return this;
    },

    appear : function(x, y, ball_r){
        this.ball_r = ball_r;
        this.attr({x: x, y: y})
            .arc(ball_r,0,Math.PI * 2,1);
        this.pos_history = [];
        for ( var i = 0; i < this.history_num ; i++ ){
            this.pos_history.push({x: x, y: y});
        }
        console.log("appear");
        return this;
    },

    goBack : function(n){
        // n < this.history_num
        n = ( n && n < this.history_num) ? n : this.history_num - 1;
        var back_pos = this.pos_history[n];
        console.log(back_pos);
        return this.appear(back_pos.x , back_pos.y, this.ball_r);
    },

    recPosHistory : function(pos){
        this.pos_history.unshift(pos);
        this.pos_history.pop();
        return this;
    },

    setHistoryNum : function(n){
        this.history_num = n;
        this.pos_history = [];
        for ( var i = 0; i < this.history_num ; i++ ){
            this.pos_history.push({x: this.x, y: this.y});
        }
        return this;
    },

    getCenter : function(){
        return { x : this.x+this.ball_r+1, y : this.y+this.ball_r+1};
    },

    getPos : function(){
        return { x : this.x, y : this.y };
    },

    getPosHistory : function(){
        return this.pos_history;
    }
});
