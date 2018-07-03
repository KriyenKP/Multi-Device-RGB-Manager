module.exports = {

    RGBtoBGRInverted:function(r,b,g)
    {
        var BGRValue = (b*65536)+(g*256)+r;
        return BGRValue;
    },
     RGBtoBGR:function(r,g,b)
    {
        var BGRValue = (r*65536)+(g*256)+b;
        return BGRValue;
    },
    componentToHex:function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex:function(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    },
    hexToRgb:function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

}
/*
function RGBtoBGRInverted(r,g,b)
{
  var BGRValue = (b*65536)+(g*256)+r;
  return BGRValue;
}
function RGBtoBGR(r,g,b)
{
  var BGRValue = (r*65536)+(g*256)+b;
  return BGRValue;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
*/