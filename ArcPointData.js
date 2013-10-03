/*************************************************
 *
 *  return: the points for collision
 * *********************************************/

function ArcPointData(radius, pi_b, pi, accuracy, width){
    var p = (accuracy || 61) - 1, d = [], width = width || 5;
    console.log(pi_b,Math.cos(pi_b));
    console.log(pi,Math.cos(pi));
    console.log(width);
    offset = radius + 1;
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
}
