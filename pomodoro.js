let interval;

const countdown = seconds => () =>{
  clearInterval(interval);
  const now = Date.now();
  const end = now + seconds * 1000;

  interval = setInterval(() => {
    const secondsLeft = Math.floor((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(interval);
      return;
    }
    console.log(secondsLeft);
  }, 1000);
}

countdown(10)();
const countDown15 = countdown(15);
setTimeout(countdown(15), 5000);
