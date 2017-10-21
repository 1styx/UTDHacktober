export function zip(array1, array2) {
    var c = [];
    for(var i = 0; i < Math.max(array1.length, array2.length); i++){
        var left = null;
        if (i < array1.length) {
            left = array1[i];
        }
        var right = null;
        if (i < array2.length) {
            right = array2[i];
        }
        c.push([left, right]);
    }
    return c;
}