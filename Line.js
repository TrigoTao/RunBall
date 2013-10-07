Crafty.c('Line',{
    init: function(){
        this.requires('2D, Canvas, Color');
        this.draw = this._draw;
        this.shape = 'Line';
        return this;
     },
 
     line: function(point_b, point_e, lineWidth, color) {
        this.color = color || "#000000";
        this.point_e = point_e;
        this.point_b = point_b;
        this.lineWidth = lineWidth || 10;
        
        this.trigger('Change');

        return this;
     },

     _draw: function() {
        var ctx = Crafty.canvas.context;
        // var ctx = e.ctx;
        //ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.point_b[0],this,point_b[1]);
        ctx.lineTo(this.point_e[0],this.point_e[1]);
        ctx.stroke();
        ctx.closePath();
        //ctx.fill();
        //console.log(this.x,this.y,this.radius);
    },

    // they > 0
    linePointData: function(point_b, point_e, width, accuracy){
        var p = (accuracy || 61) - 1, d = [], width = width || 5;
        //console.log(pi_b,Math.cos(pi_b));
        //console.log(pi,Math.cos(pi));
        return d; 
    },

    containsPoint: function(x,y,r){
        dia = (r || 0) * 2;
        if(this.lineWidth > dia){
            var allPoints = new Crafty.polygon(this.linePointData(this.point_b, this.point_e, this.lineWidth - dia));

            //allPoints.shift(this.x,this.y);
            return allPoints.containsPoint(x,y);
        }
        else{
            return false;
        }
    }

 })
