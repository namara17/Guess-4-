 $(document).ready(function() {    //NUMBER GAME 
//   $('#rules').hide();
   $('#commBox').hide();
   $('#feedback').hide();
   $('.guessesLeft').hide();
   $('#rules').mousedown(function() {
   $('.slideup').slideToggle("slow") 
   });
 $('#winLose').hide();
 myNum = [];
     $('#commBox').keyup(function(e) {
    	//alert(e.keyCode);
    	if(e.keyCode == 13) {	
            newGuess();
    	}
    });
 
})	 // Close document ready code

 function newGame() {
 $('body').removeClass('winners');
// $('#rules').show();
 $('#commBox').show();
 $('#feedback').show();
 $('#winLose').hide().html("<h1> X </h1>");
 $('.guessesLeft').show().text(" 12 Guesses Left");
 document.getElementById('nextGuess').value = "";
 document.getElementById('feedback').innerHTML = "<p><u>Your Score:</u></p></div>";
 var y=0;		 
 remaining = 12; 
 myNum =[ Math.floor(Math.random()*10),0,0,0];
 myNum2 = "";
   for (var i=1; i<4; i++)
     {
     y = Math.floor(Math.random()*10); 
     for (var k=0; k<i; k++)
	    {
         if (y === myNum[k])
	       {
	       i--;
		   k=14;
           }
		 else 
	       { 
		   (myNum[i]=y);
           }
        }				 
     }
   myNum.length=4;
     for(z=0;z <= 3; z++)
	   {
	   x = myNum[z].toString();
	   myNum2 += x;
	   }
   return myNum;
  }
 // $('#commBox h4').append("myNum2 = " + myNum2);

 function winnerCircle() {
	var msg="Congratulations!" + " " + " You guessed my number!";
    if (remaining >5)
       {
  	   msg = " TERRIFIC job! "+ " " +" You guessed my number in "+(12 - remaining)+ " guesses!";
       }
	$('#winLose').show().append(msg); 
	$('#winLose').append("<br /><span class=\"bigger\">" + myNum2 + "</span>"); 
    $('body').toggleClass('winners');

	$('#winLose h1').mouseup(function(){
	   $('#winLose').html('<h1> X </h1>').hide();
	   $('body').toggleClass('winners');
	    newGame(); 
	  })   //  end X - click function

	}  // end WinnerCircle

 function gameOver(){
 msg= "Sorry, you used up your 12 guesses.<br />My number was  " + myNum2 +"<br /><br />Do you want to try again?  <strong><span class=\"yes\">| Yes </span> /  <span class=\"no\"> No |</span></strong></h3><br />";
	$('#winLose').append(msg).show('slow'); 
    $('body').toggleClass('winners');
  $('.yes').click(function() {
	   newGame();
    })
  $('.no').click(function() {
      msg = "THANKS FOR PLAYING!";
      $('#winLose').toggleClass('over').text(msg);
	  $('body').addClass('over').css('color','purple'); 
      setTimeout(function() { $('body').fadeOut('slow') },3000);
 	 }) 
  }   //   end of gameOver

  //begin main loop with remaining guesses.
 function newGuess() {
      //   $('#go').mousedown(function(){		 //REMAINS OPEN TIL  125    
	$('#commBox h4.red').remove();
	var userGuessArray = [];
	var userGuessed = document.getElementById('nextGuess').value;

 if ( isNaN(+userGuessed) || +userGuessed %1 != 0 || +userGuessed > 9876 || +userGuessed < 0123)
    {  
	 $('#commBox input:last').after("<h4 class='red'>Please enter a 4-digit number, with no spaces and no duplicates</h4>"); 
	  document.getElementById('nextGuess').value = "";
	  return;
    }

  for (j=0; j<4; j++)
	  {	
	  userGuessArray[j] = +userGuessed[j]; 
	  }				

     // EVALUATE USER GUESS

      npicas = nforms = 0;     
      for (var m=0; m<4 ; m++)
        {
        for (var loop=0; loop<4; loop++)
           {   
	       if (myNum[m] === userGuessArray[loop])	  // test the array format of userGuess which is
              {
	          (m === loop)? nforms++ : npicas++;
              }
           }
  	     }

	  remaining--;
	  document.getElementById('nextGuess').value = "";
 	  if (nforms === 4)
  	     {
		  winnerCircle(); 
		 }
	

		  // tell player results of guess
	  $('#feedback').append("<br /> " + userGuessed + "  - " + nforms + " Form, " + npicas + " Pica ");	 // output the number format
      $('.guessesLeft').text(" " + remaining + " guesses left! ");

	  if (remaining < 1)
	    { gameOver(newGame());	  // callback function newGame
	    }
 
  }   //  End function newGuess

   