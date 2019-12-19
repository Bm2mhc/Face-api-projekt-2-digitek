var Twit = require('twit');

var express = require('express');           // Include the express library
var server = express();					    // Create a server using express
server.listen(8080);                        // Listen for HTTP
server.use('/',express.static('client'));   // Set a static file directory
console.log('Now listening on port 8080');

var T = new Twit({
consumer_key:         'F3zWTz3wO2ujNaRD0hl7D13ae',
consumer_secret:      'EbnaQnDxtMsueZqCnCxZ5WLZjOYT4KyNeraHoCq2QXHu3vGbFkE',
access_token:         '2738164473-ABU3s7HiBLpuRCeUVkYZID2gIlzBQvuZecMGIfp',
access_token_secret:  '1nVt0jrn2jgPwPELORc0iHqFC54PX148BHTZKYwQ0JwnD'
})

function uploadAndSentTwit(){
    var filename = "output.png";
    var params = {
        encoding: base64
    }
    var b64 = fs.readFileSync(filename, params)
        
    T.post('media/upload', {media_data: b64}, uploaded);

    function uploaded(err, data, response){
        var id = data.media_id_string;
        var tweet = {
            status: "Image",
            media_ids: [id]
        }
        console.log("lagt op");
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log("Error in tweet function");
        } else{
            console.log("Tweet has been tweeted");
        }
    }
}