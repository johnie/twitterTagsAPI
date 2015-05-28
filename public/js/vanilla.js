document.getElementById('submitButton').addEventListener('click', getCORS); 

    function getCORS(url) {

        var field;
        field = document.getElementById('hashtag').value;

        var url = '/api/search/' + field;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.send();
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

          } else if (this.status == 404) { 

            console.log('404'); 

            showAlertDiv('Oops. Something went wrong.');

          }

        };

        return xhr;
    }


function showAlertDiv(message) {

  var theAlertDiv;
  theAlertDiv = document.getElementById('alert'); 

  theAlertDiv.classList.remove('collapse');   

  theAlertDiv.innerHTML = message;

}


// Input Validation

document.getElementById('hashtag').addEventListener('keyup', function() {

    var field;
    field = document.getElementById('hashtag').value;

    var space; 
    space = field.indexOf(' ');

    var theAlertDiv;
    theAlertDiv = document.getElementById('alert'); 

    theAlertDiv.classList.add('collapse'); 

      if (field === '#') {

        showAlertDiv('Please start your query <strong>without</strong> the hashtag'); 

      } else if (space !== -1 ) { 

        showAlertDiv('Please do not enter any space (hashtags are written as <strong>one word</strong>)'); 

      } 
        
});              
    