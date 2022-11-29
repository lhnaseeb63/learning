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

// ``````````````````````````````````````````````````````````Music Players
const characterDemoContainer = document.getElementById('character-demo-container');
const narrationDemoContainer = document.getElementById('narration-demo-container');
const voiceDemoCharacter = document.getElementById('voice-demo-container');

const characterPlayBtn = document.getElementById('character-play');
const narrationPlayBtn = document.getElementById('narration-play');
const voicePlayBtn = document.getElementById('voice-play');

const characterPrevBtn = document.getElementById('character-prev');
const narrationPrevBtn = document.getElementById('narration-prev');
const voicePrevBtn = document.getElementById('voice-prev');

const characterNextBtn = document.getElementById('character-next');
const narrationNextBtn = document.getElementById('narration-next');
const voiceNextBtn = document.getElementById('voice-next');

const characterAudio = document.getElementById('character-audio');
const narrationAudio = document.getElementById('narration-audio');
const voiceAudio = document.getElementById('voice-audio');

const characterProgress = document.getElementById('character-progress');
const narrationProgress = document.getElementById('narration-progress');
const voiceProgress = document.getElementById('voice-progress');

const characterProgressContainer = document.getElementById('character-progress-container');
const narrationProgressContainer = document.getElementById('narration-progress-container');
const voiceProgressContainer = document.getElementById('voice-progress-container');

const characterTitle = document.getElementById('character-title');
const narrationTitle = document.getElementById('narration-title');
const voiceTitle = document.getElementById('voice-title');

const characterCover = document.getElementById('character-cover');
const narrationCover = document.getElementById('narration-cover');
const voiceCover = document.getElementById('voice-cover');

// Keep track of song
let characterSongIndex = 0;
let narrationSongIndex = 1;
let voiceSongIndex = 2;

// Song Titles: need same names on images and mp3s
const characterSongs = ['hey', 'summer', 'ukulele'];
const narrationSongs = ['hey', 'summer', 'ukulele'];
const voiceSongs = ['hey', 'summer', 'ukulele'];

const characterPlayer = {
  container: characterDemoContainer,
  playBtn: characterPlayBtn,
  prevBtn: characterPrevBtn,
  nextBtn: characterNextBtn,
  audio: characterAudio,
  progress: characterProgress,
  progressContainer: characterProgressContainer,
  title: characterTitle,
  cover: characterCover,
  folder: 'reel1',
  songs: characterSongs,
  songIndex: characterSongIndex,
};
const narrationPlayer = {
  container: narrationDemoContainer,
  playBtn: narrationPlayBtn,
  prevBtn: narrationPrevBtn,
  nextBtn: narrationNextBtn,
  audio: narrationAudio,
  progress: narrationProgress,
  progressContainer: narrationProgressContainer,
  title: narrationTitle,
  cover: narrationCover,
  folder: 'reel2',
  songs: narrationSongs,
  songIndex: narrationSongIndex,
};
const voicePlayer = {
  container: voiceDemoCharacter,
  playBtn: voicePlayBtn,
  prevBtn: voicePrevBtn,
  nextBtn: voiceNextBtn,
  audio: voiceAudio,
  progress: voiceProgress,
  progressContainer: voiceProgressContainer,
  title: voiceTitle,
  cover: voiceCover,
  folder: 'reel3',
  songs: voiceSongs,
  songIndex: voiceSongIndex,
};

const players = [characterPlayer, narrationPlayer, voicePlayer];

// Initially load song details into DOM ??forEach
players.forEach((player) => {
  loadSong(player, player.songs[player.songIndex]);
});

// Update song details
function loadSong(player, song) {
  player.title.innerText = song;

  player.audio.src = `music/${player.folder}/${song}.mp3`;

  player.cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong(player) {
  player.container.classList.add('play');

  player.playBtn.querySelector('i.fas').classList.remove('fa-play');
  player.playBtn.querySelector('i.fas').classList.add('fa-pause');

  // audio
  player.audio.play();
}

// Pause Song
function pauseSong(player) {
  console.log('hello?');
  // musicContainer
  player.container.classList.remove('play');
  // playBtn
  player.playBtn.querySelector('i.fas').classList.add('fa-play');
  player.playBtn.querySelector('i.fas').classList.remove('fa-pause');

  // audio
  player.audio.pause();
}

// // --------------------------------------------Event Listeners

players.forEach((player) => {
  player.playBtn.addEventListener('click', () => {
    const isPlaying = player.container.classList.contains('play');

    if (isPlaying) {
      pauseSong(player);
    } else {
      playSong(player);
    }
  });

  // prevBtn
  player.prevBtn.addEventListener('click', () => {
    console.log('back!');
    player.songIndex--;

    if (player.songIndex < 0) {
      player.songIndex = player.songs.length - 1;
    }
    // player, song,
    loadSong(player, player.songs[player.songIndex]);
    playSong(player);
  });

  // nextBtn
  player.nextBtn.addEventListener('click', () => {
    console.log('next!');
    player.songIndex++;

    if (player.songIndex > player.songs.length - 1) {
      player.songIndex = 0;
    }

    loadSong(player, player.songs[player.songIndex]);
    playSong(player);
  });

  // Time/song update event
  player.audio.addEventListener('timeupdate', (e) => {
    // Update Progress Bar
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    player.progress.style.width = `${progressPercent}%`;
  });

  // Click on progress bar
  player.progressContainer.addEventListener('click', (e) => {
    const width = player.progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = player.audio.duration;

    player.audio.currentTime = (clickX / width) * duration;
  });

  // Song ends
  player.audio.addEventListener('ended', () => {
    console.log('next!');
    player.songIndex++;

    if (player.songIndex > player.songs.length - 1) {
      player.songIndex = 0;
    }

    loadSong(player, player.songs[player.songIndex]);
    playSong(player);
  });
});
