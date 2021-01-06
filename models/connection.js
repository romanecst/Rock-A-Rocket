var mongoose = require('mongoose');
var URI = require('URI');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(URI,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose