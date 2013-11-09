//  warn : depend on a global logger

Crafty.c('Ball',{
    init : function() {
        this.ball_r = 0;
        this.requires('Arc, Fourway');
        this.pos_history = [];
        this.history_num = 0;
        this.wrong_times = 0;
        this.record_time = [];
        this.next_hop = 'head';
        this.total_run = 1;
        this.BACK_THRESHOLD = 1;

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

        return this;
    },

    goBack : function(n){
        // n < this.history_num
        
        this.wrong_times ++;

        n = ( n && n < this.history_num) ? n : this.history_num - 1;
        var back_pos = this.pos_history[n];
        var now_pos = this.getPos();
        var dx = now_pos.x - back_pos.x;
        var dy = now_pos.y - back_pos.y;
        if( Math.abs(dx) + Math.abs(dy) <= this.BACK_THRESHOLD * 2 ) {
            back_pos.x = back_pos.x - dx;
            back_pos.y = back_pos.y - dy;
        }

        return this.appear(back_pos.x , back_pos.y, this.ball_r);
    },

    recPosHistory : function(pos){
        this.pos_history.unshift(pos);
        this.pos_history.pop();
        return this;
    },

    recTime : function(){
        track = this.track;
        var center = this.getCenter();
        if(this.next_hop == 'head' && track.cPointInHead(center.x,center.y,this.ball_r)){
            this.record_time.push((new Date()).getTime());
            this.next_hop = 'tail';
            logger.debug('head');
        } 
        if(this.next_hop == 'tail' && track.cPointInTail(center.x,center.y,this.ball_r)){
            this.record_time.push((new Date()).getTime());
            this.next_hop = 'head';
            logger.debug('tail');
        }
        if(this.record_time.length == this.run_times + 1){
            this.next_hop = 'end';
        }
    },

    moveOnTrack : function(track, finish_go){

        if(!track ||  typeof(track) == 'function'){
            finish_go = track;
            track = null;
        }
        track = track || this.track;

        this.bind("Moved", function(from){
            var center = this.getCenter();
            this.nowIn = track.containsPoint(center.x,center.y,this.ball_r);
            
            if(this.nowIn == false && this.lastTimeIn){
                this.goBack();
                logger.debug('out');
                Crafty.audio.play("warn");
                this.nowIn = true;
            }
            this.lastTimeIn = this.nowIn;
            if( this.nowIn ){
                this.recPosHistory(this.getPos());
            }
            
            this.recTime();

            if(this.next_hop == 'end'){
                finish_go(this);
            }
        });

        return this;
    },

    setRunTimes : function(run_times){
        this.run_times = run_times;
        return this;
    },

    setOnTrack : function(track){
        this.track = track;
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
