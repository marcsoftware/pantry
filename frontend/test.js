import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";

//---------------------------------------------------------------
// 
//---------------------------------------------------------------
import { me as appbit } from "appbit";
import { today } from "user-activity";



//---------------------------------------------------------------
// clock
//---------------------------------------------------------------


// Update the clock every minute
clock.granularity = "seconds";
var old_date;
// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  
  var parsed=(today.toString().match(/[\w\d]+/g));
  
  //save date so we can reset stats each new day.
  var new_date=(today.toString().match(/\d\d\ /));
  if(new_date === old_date){
    resetStats();   
  }
  old_date=new_date;
  
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  //makes seconds bounce left and right.
  var offset = parsed[6]%2;
  var standard=216;
  document.getElementById('seconds').x=standard+offset*4;
  
  document.getElementById('seconds').text=`${parsed[6]}`;
  document.getElementById('date').text=`${parsed[0]} ${parsed[1]} ${parsed[2]}`;
}
//---------------------------------------------------------------
// reset stats
//---------------------------------------------------------------
function resetStats(){
     counter=0;
     cals=0;
}
//---------------------------------------------------------------
// heart rate
//---------------------------------------------------------------
const heartrate = document.getElementById("heartrate");
import { HeartRateSensor } from "heart-rate";

if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
      heartrate.text=hrm.heartRate;
      print(hrm.heartRate);
     
     //console.log(hrm.timestamp);
   });
   hrm.start();
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}


//---------------------------------------------------------------
//  calculate calories cost of a heartbeat
//---------------------------------------------------------------
function getCost(x){
  x= parseInt(x);
  var base_rate= getBaseRate(x);

  var cost_per_x = base_rate*x;
  return cost_per_x;
}


//---------------------------------------------------------------
//  get base rate
//---------------------------------------------------------------
var Heart=[ 80,  90,  96,100, 103, 113,116,119, 147                        ];
var Cost= [1.5, 1.6, 4.9,5.4, 6.7, 7.4,8.2,10.4, 12.4                      ];
function getBaseRate(x){
    var base_rate= 1.6/93;
  
    var copy = Heart.slice();
    copy.push(x);
    copy.sort((a,b)=>a-b);
    var index=copy.indexOf(x);
    if(index>0){
      base_rate=Cost[index-1]/Heart[index-1];
    }else{
      base_rate=Cost[0]/Heart[0];
    }
  
    return base_rate;
}

//---------------------------------------------------------------
//  Print the hearate info
//---------------------------------------------------------------


var counter=0;
var cals=0;
var MAX_RATE=14;
 var SCREEN_WIDTH=299;
function print(x){
      var GOAL=600;
      
       
      var rate_per_minute = getCost(x);
  
      document.getElementById('points').text=rate_per_minute.toFixed(1);
  
      document.getElementById('barRate').width=(rate_per_minute/MAX_RATE)*SCREEN_WIDTH;
  
      if(x>=90){
        counter++
        
         
        cals+=getCost(x)/60;
        
      }
      
      // active minutes
      var minutes= Math.floor(counter/60);
      var seconds= (counter%60);
      var hours=Math.floor(counter/60/60); 
  
      history.text= minutes+'⌛'+seconds;

      // show star for every hour
      var star = '✔️';
      var stars='';
      for(var i=0;i<hours;i++){
        stars+=star;
      }
    
      document.getElementById('hours').text=stars;
      document.getElementById('cals').text=cals.toFixed(2);
  
      // minutes left
      var points_per_minute=5;
      var total_minutes=120;
      var remainder=(total_minutes-(cals/points_per_minute)).toFixed(0)
      document.getElementById('calsTime').text=remainder;
      document.getElementById('bonus').text=((total_minutes-minutes)-remainder);
     
  
      // progress bar
     
      
      var percent = cals/GOAL;
      
      document.getElementById('bar').width=percent*SCREEN_WIDTH;
      if(cals >=GOAL){
         
         document.getElementById('barDone').width=SCREEN_WIDTH;
      }
  
  
}


//---------------------------------------------------------------
//
//---------------------------------------------------------------
function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return (total / grades.length).toFixed(1);
}

//---------------------------------------------------------------
// 
//---------------------------------------------------------------

const history = document.getElementById("history");



<!DOCTYPE html>
<html>
<body>

<h2>Using the XMLHttpRequest Object</h2>

<div id="demo">
<button type="button" onclick="loadXMLDoc()">Change Content</button>
</div>

<script>
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "xmlhttp_info.txt", true);
  xhttp.send();
}
</script>

</body>
</html>
