const songs = [
  {
    title: "Titliyaan",
    artist: "Hardy Sandhu",
    src: "song1.mp3"
  },
  {
    title: "Baby Girl",
    artist: "Guru Randhawa Dhvani Bhanushali",
    src: "song2.mp3"
  },
  {
    title: "Brown Munde",
    artist: "Ap Dhillon Gurinder Gill",
    src: "song3.mp3"
  }
];

let songIndex = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress() {
  const percent = progress.value;
  audio.currentTime = (percent / 100) * audio.duration;
}

function setVolume() {
  audio.volume = volume.value;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Events
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);
audio.addEventListener('ended', nextSong); // autoplay

// Load initial song
loadSong(songs[songIndex]);

