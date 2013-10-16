Crafty.c('Line',{
    init: function(){
        this.requires('2D, Canvas, Color');
        this.shape = 'Line';
        this.draw = this._draw;

        return this;
    },
 
    line: function(point_b, point_e, lineWidth, color) {
        this.color = color || "#000000";
        this.point_e = point_e;
        this.point_b = point_b;
        this.lineWidth = lineWidth || 10;

        var d = this.linePointData(this.point_b, this.point_e, this.lineWidth);
        var x_array = [], y_array = [];
        for(var i =0 ; i < d.length ; i++){
            x_array[i] = d[i][0];
            y_array[i] = d[i][1];
        }
        
        this.x = Math.min.apply(this, x_array);
        this.y = Math.min.apply(this, y_array);
        this.w = Math.max.apply(this, x_array) - this.x;
        this.h = Math.max.apply(this, y_array) - this.y;

        if(this.w < 0){
            this.x = point_e[0];
            this.w = -this.w;
        }
        if(this.h < 0){
            this.y = point_e[1];
            this.h = -this.h;
        }
        this.trigger('Change');

        return this;
    },

    _draw: function() {
        var ctx = Crafty.canvas.context;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        //ctx.globalCompositeOperation = 'destination-over';
        ctx.beginPath();
        ctx.moveTo(this.point_b[0],this.point_b[1]);
        ctx.lineTo(this.point_e[0],this.point_e[1]);
        ctx.stroke();
        ctx.closePath();

        console.log(this.point_b);
    },

    // they > 0
    linePointData: function(point_b, point_e, width, accuracy){
        var p = (accuracy || 61) - 1, d = [], width = width || 5;
        var dx = point_e[0] - point_b[0] , dy = point_e[1] - point_b[1];
        var length = Math.sqrt(dx*dx + dy*dy);
        //you can draw a map to help understand
        var width_x = width * Math.abs(dy)/length/2,
            width_y = width * Math.abs(dx)/length/2;

        var direction = dx*dy > 0 ? -1 : 1;
        d[0] = [point_b[0] - width_x, point_b[1] - width_y * direction];
        d[1] = [point_b[0] + width_x, point_b[1] + width_y * direction];
        d[2] = [point_e[0] + width_x, point_e[1] + width_y * direction];
        d[3] = [point_e[0] - width_x, point_e[1] - width_y * direction];

        //console.log(d[0],d[1],d[2],d[3]);
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
