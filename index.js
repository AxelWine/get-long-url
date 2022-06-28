const request = require("request");
const objToStr = Object.prototype.toString;

const GetLongUrl = function(url) {
    if( objToStr.call(url) !== "[object String]" ) return new Error("[GetLongURL] URL is not a string");
    
    return new Promise(function(resolve, reject) {
        request("http://checkshorturl.com/expand.php?u="+url, function(e, c, b) {
            let longUrl = b.substring(b.indexOf("<a href=\"")+9, b.length);
            longUrl = longUrl.substring(longUrl.indexOf("<a href=\"")+9, longUrl.length);
            longUrl = longUrl.substring(0, longUrl.indexOf("\""));

            if( ! longUrl.includes("http://") && ! longUrl.includes("https://") ) return reject(null);
            else if( longUrl.includes(">") || longUrl.includes("<") ) return reject(null);
            else return resolve(longUrl);
        });
    });
};

module.exports = GetLongUrl;