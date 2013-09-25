 Crafty.c("Arc", {
     init: function(){
         this.requires('2D, Canvas, Color');
         //this.bind("Draw", function(e){
         //    console.log("Draw");
         //    this._draw(e);
         //})
         this.draw = this._draw;
         return this;
     },
 
     arc: function(radius, pi_b,  pi, color) {
         this.radius = radius;
         this.w = this.h = radius * 2+2;
         this.color = color || "#000000";
         this.pi_b = pi_b;
         this.pi = pi;
         
         this.trigger('Change');
         return this;
     },

     _draw: function() {
        console.log("_draw");
        var ctx = Crafty.canvas.context;
        // var ctx = e.ctx;
        //ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x + this.radius + 1,
            this.y + this.radius + 1,
            this.radius,
            this.pi_b,
            this.pi_b + this.pi
        );
        ctx.stroke();
        ctx.closePath();
        //ctx.fill();
        //console.log(this.x,this.y,this.radius);
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
