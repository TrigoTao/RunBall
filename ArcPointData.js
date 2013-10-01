/*************************************************
 *
 *  return: the points for collision
 * *********************************************/

function ArcPointData(radius, pi_b, pi, accuracy){
    var p = accuracy || 500, d = [], TWO_PI = Math.PI*2;
    for(var i=0, a=pi_b; i<p; a = (i/p)*(pi - pi_b)+pi_b, i++) 
        d[i] = [Math.cos(a)*radius, Math.sin(a)*radius]; 
    return d; 
}
