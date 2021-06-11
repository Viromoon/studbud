var mySong = document.getElementById("mySong");
var icon = document.getElementById("icon");
icon.onclick = function(){
  if(mySong.paused){
    mySong.play();
    icon.src = "images/pause-8.png";// Custom pause button
  }else{
    mySong.pause();
    icon.src = "images/play-8.png";// Custom play button
  }
  
}

var lastSong = null;
    var selection = null;
    var playlist = ["media/song.mp3", "media/song1.mp3", "media/song2.mp3"]; // List of songs
    var player = document.getElementById("mySong"); // Get audio element
    player.autoplay=true;
    player.addEventListener("ended", selectRandom); // Run function when the song ends

    function selectRandom(){
        while(selection == lastSong){ // Repeat until a different song is selected
            selection = Math.floor(Math.random() * playlist.length);
        }
        lastSong = selection; // Remember the last song
        player.src = playlist[selection]; // Tell HTML the location of the new song
    }

    selectRandom(); // Select initial song
    player.play(); // Start song
