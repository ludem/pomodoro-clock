let interval;
let nextTimer;

const countdown = seconds => {
  clearInterval(interval);
  const now = Date.now();
  const end = now + seconds * 1000;

  interval = setInterval(() => {
    const secondsLeft = Math.floor((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      console.log("done");
      clearInterval(interval);
      nextTimer();
      return;
    }
    console.log(secondsLeft);
  }, 1000);
}

const breakLength = 10;
const sessionLength = 15;


function startSession() {
  nextTimer = startBreak;
  countdown(sessionLength);
}

function startBreak() {
  nextTimer = startSession;
  countdown(breakLength);
}

startSession();