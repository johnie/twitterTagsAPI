var express = require('express'),
    cors = require('express-cors'),
    path = require('path'),
	Twit = require('twit');

var T = new Twit({
    consumer_key:         'vLs7djQMnHrzl8LUtS3fE4ctp'
  , consumer_secret:      'Hs7C5lbNkHB4mFzIIkg3Fa8zQb0MZ7uSM5WEbMxWN9GqKDlilB'
  , access_token:         '1546166371-iFR3DNltdMB04umxgiEjgSRMpLlW9Tel7cZ64aW'
  , access_token_secret:  '1rgnYbXeljc7SSsDJ7TI3WvlDvsRfsFFa6Z5dmDlQMZpC'
})    
 
var app = express();
 
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

app.listen(3000);
console.log('Your app is now running at: http://127.0.0.1:3000/');


