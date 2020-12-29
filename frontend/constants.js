var callback_url = ``;  // from fitbit.com app setting page

var database_url=''; // endpoint of java database

var client_id='';

var global_basic='';
function drawHeader(){
    var handle=document.getElementById('header');

    if(handle){
        handle.innerHTML=`<meta charset="utf-8"/><a href="/index.html">food log</a>
                          <a href="/report.html">report</a>  
                           <a href="/scale.html">scale</a>                         
                         | <a  href="" id="hyperlink">connect</a><a href="/glogin.html">login</a>  <span id="cookie"></span>
                           <div id="gSignInWrapper">
    <div id="customBtn" class="customGPlusSignIn">
      <span class="icon"></span>
      <span class="buttonText">Google</span>
    </div>
  </div>`
    }

        setConfig();
}





function setConfig(){
     

     var pageURL = window.location;
     
          
          

     if(!pageURL.toString().includes('poundreport')){
            // if not deployed on poundreport. 

            callback_url = `http://localhost:8080/connect.html`;  // from fitbit.com app setting page
            database_url='http://localhost:5000/demo'; // endpoint of java database
            client_id='22BVZC';
            global_basic='MjJCVlpDOmRjMTFjNzYwNTA4MjRmYjUwMWRjODhmNWRjYzRlOWE0';
            console.log('localhost constansts chosen');

     }else{
            //database_url="http://pantry-env.7zyk5zdmpf.us-east-1.elasticbeanstalk.com";
            database_url="https://eb.poundreport.com/demo";
            
            callback_url =`https://poundreport.com/connect.html`;
            client_id='22BWQ4';
            global_basic='MjJCV1E0OmY0NmYxZGQwYTMwNzcyMzFiNmY2YmZhY2UyMDMwNjVh'; //
            console.log('deployed constansts chosen');
     }


     document.getElementById('hyperlink').href=getUrl();

}



//--------------------------------------------------------------------------------------------------------------------------------
// this get the CODE from fitbit
//--------------------------------------------------------------------------------------------------------------------------------

function getUrl(){
  
  return `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${callback_url}&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight`
  
}




//--------------------------------- TODO put this in lib.js
flag=true;

/**
//---------------------------------------------------------------------
// read all cookies and stores in global variables
//---------------------------------------------------------------------
*/

var global_body='';
function readProfile(){
  global_name = getCookie('userName');
    global_email = getCookie('userEmail');
    global_token = getCookie('idToken');

       global_body = ` {

                            "name": "${global_name}",
                            "userEmail": "${global_email}",
                            "idTokenString":"${global_token}"
 
                        }`;
    document.getElementById('cookie').innerHTML=global_name;
}


/**
//---------------------------------------------------------------------
//
//---------------------------------------------------------------------
*/
var global_name='';
var global_email='';
var global_token='';
function getCookie(x) {
  var cname=x;
  
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var result = c.substring(name.length, c.length);
      
      
      return result;
    }
  }
  return "";
}
