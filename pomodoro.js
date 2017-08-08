//global variables
let interval;
let nextTimer;
let currentColor;

//html elements
const pomodoro = document.querySelector("#pomodoro");
const startAndStop = document.querySelector("#start");
const sessionLength = document.querySelector("#session");
const sessionPlus = document.querySelector("#sessionPlus");
const sessionMinus = document.querySelector("#sessionMinus");
const breakLength = document.querySelector("#break");
const breakPlus = document.querySelector("#breakPlus");
const breakMinus = document.querySelector("#breakMinus");

//add listeners
sessionPlus.addEventListener("click", lengthUp.bind(sessionLength));
sessionMinus.addEventListener("click", lengthDown.bind(sessionLength));
breakPlus.addEventListener("click", lengthUp.bind(breakLength));
breakMinus.addEventListener("click", lengthDown.bind(breakLength));

//countdown function
const countdown = seconds => {
  //clear any existing countdowns
  clearInterval(interval);
  const now = Date.now();
  const end = now + seconds * 1000;
  setBackground(0);

  interval = setInterval(() => {
    const secondsLeft = Math.floor((end - Date.now()) / 1000);
    
    //compute percent of time spent
    const percentDone = 100 - Math.floor(secondsLeft / seconds * 100);
    
    //check if countdown should continue or not
    if (secondsLeft < 0) {
      //clear the countdown and start the next timer
      clearInterval(interval);
      nextTimer();
      return;
    }
    //refresh the pomodoro background
    setBackground(percentDone);
  }, 1000);
};

function setBackground(percent) {
  pomodoro.style.background = `linear-gradient(90deg, ${currentColor} ${percent}%, rgba(0, 0, 0, 0) ${percent}%)`;
}

//start session time
function startSession() {
  //display 
  startAndStop.classList.remove("fa-play");
  startAndStop.classList.add("fa-stop");
  currentColor = "red";
  pomodoroText.textContent = "SESSION TIME";
  
  //set the next timer to break
  nextTimer = startBreak;
 
  const seconds = getSeconds(sessionLength.textContent);
  countdown(seconds);
}

function startBreak() {
  nextTimer = startSession;
  currentColor = "greenyellow";
  pomodoroText.textContent = "BREAK TIME";
  const seconds = getSeconds(breakLength.textContent);
  countdown(seconds);
}

const getSeconds = minutes => minutes * 60;

//increase length controllers
function lengthUp() {
  this.textContent++;
}

//decrease length controllers
function lengthDown() {
  if (this.textContent > 1) {
    this.textContent--;
  }
}

//stop and reset the session
function stopSession() {
  //change the button icon
  startAndStop.classList.remove("fa-stop");
  startAndStop.classList.add("fa-play");

  //reset the background
  setBackground(0);

  //reset the pomodoro text
  pomodoroText.textContent = "START!"

  //clear and set the interval
  clearInterval(interval);
  interval = "";
}

function startOrStop() {
  interval ? stopSession() : startSession();
}

const go = document.querySelector("#start");
go.addEventListener("click", startOrStop);
