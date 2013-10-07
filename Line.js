Crafty.c('Line',{
    init: function(){
        this.requires('2D, Canvas, Color');
        this.draw = this._draw;
        this.shape = 'Line';
        return this;
     },
 
     line: function(point_b, point_e, lineWidth, color) {
        this.w = this.h = radius * 2 + 2;
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
        ctx.arc(
            this.x + this.radius + 1,
            this.y + this.radius + 1,
            this.radius,
            this.pi_b,
            this.pi
        );
        ctx.stroke();
        ctx.closePath();
        //ctx.fill();
        //console.log(this.x,this.y,this.radius);
    },

    // they > 0
    arcPointData: function ArcPointData(radius, pi_b, pi, width, accuracy){
        var p = (accuracy || 61) - 1, d = [], width = width || 5;
        //console.log(pi_b,Math.cos(pi_b));
        //console.log(pi,Math.cos(pi));
        offset = radius + 1;
        radius -= width / 2;
        for(var i=0, a=pi_b; i<=p; i++){ 
            a = (i/p)*(pi - pi_b)+pi_b;
            d[i] = [Math.cos(a)*radius + offset , Math.sin(a)*radius + offset]; 
        }
        radius += width;
        for(var i=p, a=pi; i<=p+p; i++){
            a = pi - (i/p - 1)*(pi - pi_b)
            d[i+1] = [Math.cos(a)*radius + offset, Math.sin(a)*radius + offset];
        }
        return d; 
    },

    // if the point is a ball(2D), r is its radius
    containsPoint: function(x,y,r){
        dia = (r || 0) * 2;
        if(this.lineWidth > dia){
            var allPoints = new Crafty.polygon(this.arcPointData(this.radius, this.pi_b, this.pi, this.lineWidth - dia));

            allPoints.shift(this.x,this.y);
            return allPoints.containsPoint(x,y);
        }
        else{
            return false;
        }
    }

 })
