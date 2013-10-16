 Crafty.c("Arc", {
     init: function(){
        this.requires('2D, Canvas, Color');
        //this.bind("Draw", function(e){
        //    console.log("Draw");
        //    this._draw(e);
        //})
        this.draw = this._draw;
        this.shape = 'Arc';
        return this;
     },
 
     arc: function(radius, pi_b,  pi, lineWidth, color) {
        this.radius = radius;
        this.w = this.h = radius * 2 + 2;
        this.color = color || "#000000";
        this.pi_b = pi_b;
        this.pi = pi;
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

 //{{{ Circle Component
//   Crafty.c("Circle", {
//       _radius: 8,
//       fillStyle:"rgba(0,255,0,1)",
//       strokeStyle: "rgba(0,0,0,0)",
//       ready: true,
//
//       get radius() { console.log('hen bu ke xue!');return this._radius; },
//       //set radius(r) {
//       //         console.log("bu ke xue");
//       //        this._radius = r;
//       //        this.w = this.h = 2*this.radius;
//       //        this.trigger("change");
//       //},
//
//       init: function() {
//               this.requires("2D, Canvas");
//
//               this.w = this.h = 2*this.radius;
//               var TWO_PI = Math.PI*2;
//
//               this.bind("Draw", function(e) {
//                   console.log("draw");
//                   e.ctx.fillStyle = this.fillStyle;
//                   e.ctx.strokeStyle = this.strokeStyle;
//                   e.ctx.beginPath();
//                   e.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI, true);
//                   e.ctx.closePath();
//                   e.ctx.fill();
//               });
//               this.trigger("change");
//               return this;
//       },
//       circle: function(radius) {
//               this.radius = radius;
//               this.trigger("change");
//               console.log("circle");
//               return this;
//       },
//
//       color: function(c) {
//               //this.fillStyle = Crafty.toRGB(c,this.alpha);
//               this.fillStyle = Crafty.toRGB(c, 1);
//               return this;
//       }
//   });
 //}}}
