var express = require('express'),
    cors = require('express-cors'),
    path = require('path'),
	  Twit = require('twit');

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})    
 
var app = express();

//For Heroku
app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(cors({
    allowedOrigins: [
        'twitter.com'
    ]
}));

app.get('/', function(req, res) {
    res.render('index');
});
 
app.get('/api/search/:hashtag', function(req, res){ 

	T.get('search/tweets', { q: '#'+req.hashtag, count: 10 }, function(err, data, response) {
	  res.jsonp(data); 
	  console.log(data)
	});
});

app.param('hashtag', function(req, res, next, hashtag){
	req.hashtag = hashtag;
	next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



