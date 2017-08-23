var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var keys = require('./config/keys');
var Url = require('./models/Url');
var NewUrl = require('./models/NewUrl');
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


mongoose.connect(keys.mongoURI);




var lastUrl = [];
var shortURL = 1;

// NewUrl.findOne({}, function(err, doc){
//     if(err){
//         return console.error()
//     }
//     else{
//         console.log(doc);
//     }
// })
app.get('/', function(req, res){
    res.render('home');
});

app.get('/:redirectUrl', function(req, res){
    Url.findOne({ "shortenedUrl": req.params.redirectUrl}, function(err, doc){
        console.log(doc);

        if(doc == null){
            res.json({"error": "This url is not on the database"});
        }
        else{
            res.redirect(doc.originalUrl);
        }

    })
});

app.get('/new/:url(*)', function(req, res){
    var urlParam = req.params.url;
    var expression = /(((https):\/{2}www\.)+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/gi;
    var regex = new RegExp(expression);


    if(!urlParam.match(regex)) {
      res.json({"error": "This is not a valid url"})
    }
    else {
      //var shortURL = Math.floor(1000 + Math.random() * 9000).toString();
      
      
        NewUrl.findOne({}, (err, doc) => {
            if(err) {
                return console.error(err);
            }
            else if(doc == null) {
                new NewUrl({
                    originalUrl: urlParam,
                    shortenedUrl: shortURL.toString()
                }).save(function(err, doc){
                    if(err){
                      return console.error(err);
                    }
                  });

                new Url({
                    originalUrl: urlParam,
                    shortenedUrl: shortURL.toString()
                }).save(function(err, doc){
                    if(err){
                      return console.error(err);
                    }
                    res.json({
                        "originalUrl" :urlParam,
                        "shortUrl" : "localhost:3000/" + shortURL
                    });
        
                  });
            }
            else{
                var updateShortUrl = parseInt(doc.shortenedUrl) + 1;
                new NewUrl({
                    originalUrl: urlParam,
                    shortenedUrl: updateShortUrl.toString()
                }).save(function(err, doc){
                    if(err){
                      return console.error(err);
                    }
        
                  });
                
                NewUrl.remove({}, function(err, doc){
                    if(err){
                        return console.error(err);
                    }
                })
                
                new Url({
                    originalUrl: urlParam,
                    shortenedUrl: updateShortUrl.toString()
                }).save(function(err, doc){
                    if(err){
                      return console.error(err);
                    }
                    res.json({
                        "originalUrl" :urlParam,
                        "shortUrl" : "localhost:3000/" + updateShortUrl
                    });
        
                });
                
            }
        });
        
      
      
      
    }
  });







app.listen(3000, function() {

})
