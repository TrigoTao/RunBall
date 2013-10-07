/*************************************************
 *
 *  return: the points for collision
 * *********************************************/

function ArcPointData(radius, pi_b, pi, width, accuracy){
    var p = (accuracy || 6) - 1, d = [], width = width || 5;
    //console.log(pi_b,Math.cos(pi_b));
    //console.log(pi,Math.cos(pi));
    offset = radius + 1;
    for(var i=0, a=pi_b; i<=p; i++){ 
        a = (i/p)*(pi - pi_b)+pi_b;
        d[i] = [Math.cos(a)*radius + offset , Math.sin(a)*radius + offset]; 
        console.log(i,a,d[i]);
    }
    radius += width;
    for(var i=p, a=pi; i<=p+p; i++){
        a = pi - (i/p - 1)*(pi - pi_b)
        d[i+1] = [Math.cos(a)*radius + offset, Math.sin(a)*radius + offset];
        console.log(i+1,a,d[i+1]);
    }
    return d; 
}
