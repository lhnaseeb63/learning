const menu = document.getElementById('menu');

// convert menu items to array so they
// are iterable
Array.from(document.getElementsByClassName('menu-item')).forEach((item, index) => {
  //   append a mouseover listener to each item
  // use them to update active index attr on
  // our menu element
  item.onmouseover = () => {
    menu.dataset.activeIndex = index;
  };
});

// ============================================= Reels hover effect
// // event handler for onmousemove
// const handleOnMouseMove = (e) => {
//   // get card position
//   const { currentTarget: target } = e;

//   //   calculate position of mouse relative to each card
//   const rect = target.getBoundingClientRect(),
//     x = e.clientX - rect.left,
//     y = e.clientY - rect.top;

//   // with the x & y can set custom css properties
//   target.style.setProperty('--mouse-x', `${x}px`);
//   target.style.setProperty('--mouse-y', `${y}px`);
// };

// // add onmousemove event listener to each card
// for (const card of document.querySelectorAll('.card')) {
//   card.onmousemove = (e) => handleOnMouseMove(e);
// }

// loop over all cards, set mouse positions anywhere on
// any card
document.getElementById('cards').onmousemove = (e) => {
  for (const card of document.getElementsByClassName('card')) {
    //   calculate position of mouse relative to each card
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    // with the x & y can set custom css properties
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
};

/**
 * The Element.getBoundingClientRect() method returns a DOMRect
 * object providing information about the size of an element
 * and its position relative to the viewport.
 */

// ``````````````````````````````````````````````````````````Music Player
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

// // --------------------------------------------Event Listeners
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
