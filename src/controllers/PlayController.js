import { formatTime } from '../format/formatTime';

import play from '../assets/icons/play.svg';
import stop from '../assets/icons/stop.svg';
import shuffle from '../assets/icons/shuffle.svg';
import shuffleOff from '../assets/icons/shuffleOff.svg';
import repeatOff from '../assets/icons/repeatOff.svg';
import repeatOne from '../assets/icons/repeatOne.svg';
import repeatAll from '../assets/icons/repeatAll.svg';
import volume from '../assets/icons/volume.svg';
import volumeMute from '../assets/icons/volumeMute.svg';

class PlayerController {
  constructor() {
    this.songs = [];
    this.currentIndex = 0;
    this.currentSong = null;
    this.audio = new Audio();
    this.isShuffle = false;
    this.repeatMode = 'off';
    this.lastVolume = 0.5;
    this.initialized = false;
    this.audio.volume = this.lastVolume;
    this.audio.onended = () => this.handleSongEnd();
  }

  setSongs(tracks = []) {
    this.songs = Array.isArray(tracks) ? tracks : [];
  }

  async loadSong(song) {
    if (!song) return;

    this.currentSong = song;
    this.currentIndex = this.songs.findIndex(
      s => String(s.id) === String(song.id)
    );

    this.audio.src = song.audioUrl;
    this.audio.load();

    const thumbEl = document.querySelector('#player-thumbnail');
    const titleEl = document.querySelector('#player-title');
    const artistEl = document.querySelector('#player-artist');

    if (thumbEl) {
      thumbEl.style.backgroundImage = `url('${song.thumbnails?.[0]}')`;
    }

    if (titleEl) {
      titleEl.textContent = song.title || 'Không rõ tên bài hát';
    }

    if (artistEl) {
      artistEl.textContent = song.artists?.[0] || 'Không rõ nghệ sĩ';
    }

    this.updatePlayButton(false);

    return new Promise(resolve => {
      this.audio.addEventListener(
        'loadedmetadata',
        () => {
          const durationEl = document.querySelector('#player-duration');
          if (durationEl) {
            durationEl.textContent = formatTime(this.audio.duration);
          }
          resolve();
        },
        { once: true }
      );
    });
  }

  async playSong() {
    try {
      await this.audio.play();
      this.updatePlayButton(true);
      this.showPlayer();
    } catch (error) {
      console.warn('Cannot play audio:', error);
    }
  }

  pauseSong() {
    this.audio.pause();
    this.updatePlayButton(false);
  }

  togglePlay() {
    if (this.audio.paused) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }

  async nextSong() {
    if (!this.songs.length) return;

    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    const next = this.songs[this.currentIndex];

    await this.loadSong(next);
    this.playSong();
  }

  async prevSong() {
    if (!this.songs.length) return;

    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    const prev = this.songs[this.currentIndex];

    await this.loadSong(prev);
    this.playSong();
  }

  async playRandomSong() {
    if (!this.songs.length) return;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songs.length);
    } while (randomIndex === this.currentIndex && this.songs.length > 1);

    this.currentIndex = randomIndex;
    const randomSong = this.songs[randomIndex];

    await this.loadSong(randomSong);
    this.playSong();
  }

  updateVolumeIcon() {
    const icon = document.querySelector('#js-volume-btn img');
    if (!icon) return;

    icon.src = this.audio.volume === 0 ? volumeMute : volume;
  }

  setVolume(val) {
    const volumeVal = Number(val) / 100;
    this.audio.volume = Math.min(Math.max(volumeVal, 0), 1);
    this.updateVolumeIcon();
  }

  toggleMute() {
    const slider = document.querySelector('#js-volume-slider');

    if (this.audio.volume > 0) {
      this.lastVolume = this.audio.volume;
      this.audio.volume = 0;
    } else {
      this.audio.volume = this.lastVolume || 0.5;
    }

    if (slider) {
      slider.value = this.audio.volume * 100;
    }

    this.updateVolumeIcon();
  }

  initVolumePanel() {
    const btn = document.querySelector('#js-volume-btn');
    const panel = document.querySelector('#js-volume-panel');
    const slider = document.querySelector('#js-volume-slider');

    if (!btn || !panel || !slider) return;

    const showPanel = () => {
      panel.classList.remove('hidden');
    };

    const hidePanelWithDelay = () => {
      setTimeout(() => {
        const btnHover = btn.matches(':hover');
        const panelHover = panel.matches(':hover');
        if (!btnHover && !panelHover) {
          panel.classList.add('hidden');
        }
      }, 80);
    };

    btn.addEventListener('mouseenter', showPanel);
    panel.addEventListener('mouseenter', showPanel);

    btn.addEventListener('mouseleave', hidePanelWithDelay);
    panel.addEventListener('mouseleave', hidePanelWithDelay);

    btn.addEventListener('click', () => this.toggleMute());

    slider.addEventListener('input', e => this.setVolume(e.target.value));

    slider.value = this.audio.volume * 100;
    this.updateVolumeIcon();
  }

  onProgressChange(val) {
    const duration = this.audio.duration;
    if (!duration || isNaN(duration)) return;

    const percent = Number(val);
    this.audio.currentTime = (percent / 100) * duration;
  }

  initProgressBar() {
    const progress = document.querySelector('#player-progress-bar');
    const currentEl = document.querySelector('#player-current');
    if (!progress || !currentEl) return;

    this.audio.addEventListener('timeupdate', () => {
      const duration = this.audio.duration;
      if (!duration || isNaN(duration)) return;

      progress.value = (this.audio.currentTime / duration) * 100;
      currentEl.textContent = formatTime(this.audio.currentTime);
    });
  }

  updatePlayButton(isPlaying) {
    const img = document.querySelector('#js-play-btn img');
    if (!img) return;

    img.src = isPlaying ? stop : play;
    img.alt = isPlaying ? 'pause' : 'play';
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;

    const shuffleImg = document.querySelector('#js-shuffle-btn img');
    if (!shuffleImg) return;

    shuffleImg.src = this.isShuffle ? shuffle : shuffleOff;
  }

  toggleRepeat() {
    if (this.repeatMode === 'off') {
      this.repeatMode = 'all';
    } else if (this.repeatMode === 'all') {
      this.repeatMode = 'one';
    } else {
      this.repeatMode = 'off';
    }

    const repeatImg = document.querySelector('#js-repeat-btn img');
    if (!repeatImg) return;

    if (this.repeatMode === 'off') repeatImg.src = repeatOff;
    if (this.repeatMode === 'all') repeatImg.src = repeatAll;
    if (this.repeatMode === 'one') repeatImg.src = repeatOne;
  }

  handleSongEnd() {
    if (this.repeatMode === 'one') {
      this.playSong();
      return;
    }

    if (this.isShuffle) {
      this.playRandomSong();
      return;
    }

    if (this.repeatMode === 'all') {
      this.nextSong();
      return;
    }

    this.updatePlayButton(false);
  }

  showPlayer() {
    const wrapper = document.querySelector('#player-wrapper');
    if (wrapper) {
      wrapper.classList.remove('hidden');
    }
  }

  initTrackClick() {
    document.addEventListener('click', async e => {
      const item = e.target.closest('.track-item');
      if (!item) return;

      const trackId = item.dataset.trackId;
      if (!trackId) return;

      const song = this.songs.find(s => String(s.id) === String(trackId));
      if (!song) return;

      await this.loadSong(song);
      this.playSong();
    });
  }

  addListener(selector, event, handler) {
    document
      .querySelectorAll(selector)
      .forEach(el => el.addEventListener(event, handler));
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.initProgressBar();
    this.initTrackClick();
    this.initVolumePanel();

    this.addListener('#js-play-btn', 'click', () => this.togglePlay());
    this.addListener('#js-next-btn', 'click', () => this.nextSong());
    this.addListener('#js-prev-btn', 'click', () => this.prevSong());

    this.addListener('#js-shuffle-btn', 'click', () => this.toggleShuffle());
    this.addListener('#js-repeat-btn', 'click', () => this.toggleRepeat());

    this.addListener('#player-progress-bar', 'input', e =>
      this.onProgressChange(e.target.value)
    );
  }
}

export const player = new PlayerController();
