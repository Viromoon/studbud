var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('sw-reset');

var watch = new Stopwatch(timer);

function start() {
  toggleBtn.textContent = 'Stop';
  watch.start();
}

function stop() {
  toggleBtn.textContent = 'Start';
  watch.stop();
}

toggleBtn.addEventListener('click', function() {
  watch.isOn ? stop() : start();
});

sw-resetBtn.addEventListener('click', function() {
  watch.sw-reset();
});
