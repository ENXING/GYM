function json2url(obj) {
    var ret = '';
    for (let key in obj) {
        ret += key + '=' + obj[key] + '&'
    }
    return ret.slice(0, -1);
}
// var url = 'http://localhost:10201/api';
var url = 'https://workout.enxing.cf/api';
sessionStorage.setItem("url", url);