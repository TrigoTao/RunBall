/*************************************************
 *
 *  return: the points for collision
 * *********************************************/

function ArcPointData(radius, pi_b, pi, accuracy, width){
    var p = (accuracy || 61) - 1, d = [], width = width || 5;
    console.log(pi_b,Math.cos(pi_b));
    console.log(pi,Math.cos(pi));
    for(var i=0, a=pi_b; i<=p; i++){ 
        a = (i/p)*(pi - pi_b)+pi_b;
        d[i] = [Math.cos(a)*radius, Math.sin(a)*radius]; 
        console.log(i,a,d[i]);
    }
    radius += width;
    for(var i=p, a=pi; i<=p+p; i++){
        a = pi - (i/p - 1)*(pi - pi_b)
        d[i+1] = [Math.cos(a)*radius, Math.sin(a)*radius];
        console.log(i,a,d[i+1]);
    }
    console.log(d);
    return d; 
}
