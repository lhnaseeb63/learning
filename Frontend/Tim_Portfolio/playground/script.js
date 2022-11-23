// const musicContainer = document.getElementById('music-container');
// const playBtn = document.getElementById('play');
// const prevBtn = document.getElementById('prev');
// const nextBtn = document.getElementById('next');

// const audio = document.getElementById('audio');
// const progress = document.getElementById('progress');
// const progressContainer = document.getElementById('progress-container');
// const title = document.getElementById('title');
// const cover = document.getElementById('cover');

// // Song Titles: need same names on images and mp3s
// const songs = ['hey', 'summer', 'ukulele'];

// // Keep track of song
// let songIndex = 2;

// // Initially load song details into DOM
// loadSong(songs[songIndex]);

// // Update song details
// function loadSong(song) {
//   title.innerText = song;
//   audio.src = `music/${song}.mp3`;
//   cover.src = `images/${song}.jpg`;
// }

// // Play Song
// function playSong() {
//   musicContainer.classList.add('play');
//   playBtn.querySelector('i.fas').classList.remove('fa-play');
//   playBtn.querySelector('i.fas').classList.add('fa-pause');

//   audio.play();
// }

// // Pause Song
// function pauseSong() {
//   musicContainer.classList.remove('play');
//   playBtn.querySelector('i.fas').classList.add('fa-play');
//   playBtn.querySelector('i.fas').classList.remove('fa-pause');

//   audio.pause();
// }

// // Prev Song
// function prevSong() {
//   songIndex--;

//   if (songIndex < 0) {
//     songIndex = songs.length - 1;
//   }

//   loadSong(songs[songIndex]);
//   playSong();
// }

// // Next Song
// function nextSong() {
//   songIndex++;

//   if (songIndex > songs.length - 1) {
//     songIndex = 0;
//   }

//   loadSong(songs[songIndex]);
//   playSong();
// }

// // Update Progress Bar
// function updateProgress(e) {
//   const { duration, currentTime } = e.srcElement;
//   const progressPercent = (currentTime / duration) * 100;
//   progress.style.width = `${progressPercent}%`;
// }

// // Set progress bar
// function setProgress(e) {
//   const width = this.clientWidth;
//   const clickX = e.offsetX;
//   const duration = audio.duration;

//   audio.currentTime = (clickX / width) * duration;
// }

// --------------------------------------------Event Listeners
// playBtn.addEventListener('click', () => {
//   const isPlaying = musicContainer.classList.contains('play');

//   if (isPlaying) {
//     pauseSong();
//   } else {
//     playSong();
//   }
// });

// // Change song
// prevBtn.addEventListener('click', prevSong);
// nextBtn.addEventListener('click', nextSong);

// // Time/song update event
// audio.addEventListener('timeupdate', updateProgress);

// // Click on progress bar
// progressContainer.addEventListener('click', setProgress);

// // Song ends
// audio.addEventListener('ended', nextSong);

/* `````````````````````````````````````````````` Sliding BG */
// const body = document.querySelector('.content-wrapper');
const wrapper = document.querySelector('.content-wrapper');
const content = document.querySelectorAll('.content');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

console.log(content);

let activeContent = 0;

rightBtn.addEventListener('click', () => {
  activeContent++;

  if (activeContent > content.length - 1) {
    activeContent = 0;
  }
  console.log(activeContent);
  setActiveSlide();
});

leftBtn.addEventListener('click', () => {
  activeContent--;

  if (activeContent < 0) {
    activeContent = content.length - 1;
  }
  console.log(activeContent);
  setActiveSlide();
});

setContent();

function setContent() {
  console.log('set content');
}

function setActiveSlide() {
  content.forEach((option) => {
    option.classList.remove('active');
  });

  content[activeContent].classList.add('active');
}

// setBgToBody();

// function setBgToBody() {
//   body.style.backgroundImage = slides[activeContent].style.backgroundImage;
// }

// -------------------------------expanding cards
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    console.log('clicked');
    removeActivePanelClasses();
    panel.classList.add('activePanel');
  });
});

function removeActivePanelClasses() {
  panels.forEach((panel) => {
    panel.classList.remove('activePanel');
  });
}
