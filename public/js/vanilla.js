document.getElementById('submitButton').addEventListener('click', function() { getCORS(url); 

  var field;
      field = document.getElementById('hashtag').value;

  var url = '/api/search/' + field;

    function getCORS(url) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {

          if (this.status == 200 && this.readyState == 4) {

            var myArr = JSON.parse(this.responseText);
            console.log(myArr);
       
            for (var i = 0; i < 10; i++) {

              var tweetText;
              tweetText = myArr.statuses[i].text;

              var username;
              username = myArr.statuses[i].user.screen_name;

              var tweetId;      
              tweetId = myArr.statuses[i].id_str;

              var tweetLink;
              tweetLink = "https://twitter.com/"+username+"/status/"+tweetId;

              var tweetDiv;
              tweetDiv = document.getElementById(i);

              tweetDiv.innerHTML = tweetText + " " + "<a href="+ tweetLink + ">" + "<i class='fa fa-twitter fa-lg'></i>Link</a>";

              var thePanels;
              thePanels = document.querySelectorAll('.panel'); 

              thePanels[i].style.display = 'inline-block';

            } 

          } 

        };

        xhr.send();
        return xhr;
    }

    getCORS(url, function(request){

        response = request.currentTarget.response || request.target.responseText;
        console.log(response);      
        
    });

});


// Input Validation

document.getElementById('hashtag').addEventListener('keyup', function() {

    var field;
    field = document.getElementById('hashtag').value;

    var space; 
    space = field.indexOf(' ');

    var theAlertDiv;
    theAlertDiv = document.getElementById('alert'); 

      if (field === '#') {

        theAlertDiv.classList.remove('collapse');   

        theAlertDiv.innerHTML = 'Please start your query <strong>without</strong> the hashtag';

      } else if (space !== -1 ) { 

        theAlertDiv.classList.remove('collapse'); 

        theAlertDiv.innerHTML = 'Please do not enter any space (hashtags are written as <strong>one word</strong>)';

      } 

});              
    