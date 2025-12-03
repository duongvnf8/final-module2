// src/components/Play.js
import playPrev from '../assets/icons/playPrev.svg';
import playNext from '../assets/icons/playNext.svg';
import play from '../assets/icons/play.svg';
import like from '../assets/icons/like.svg';
import disLike from '../assets/icons/dislike.svg';
import moreVert from '../assets/icons/moreVert.svg';
import volume from '../assets/icons/volume.svg';
import repeatOff from '../assets/icons/repeatOff.svg';
import shuffleOff from '../assets/icons/shuffleOff.svg';

export default function Play() {
  return `
  <div id="player-wrapper" class="bg-[#212121] fixed bottom-0 right-0 left-0 z-200">
    <div class="w-full h-1 bg-gray-700 relative">
      <input 
        id="player-progress-bar"
        type="range" min="0" max="100" value="0"
        class="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 accent-red-500 cursor-pointer z-50"
      />
    </div>

    <div class="flex flex-col md:flex-row px-4 py-2 md:py-3 min-h-16 gap-2">

      <div class="flex items-center gap-3 justify-center md:justify-start md:w-1/3">
        <button id="js-prev-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
          <img class="w-6 h-6" src="${playPrev}" alt="prev" />
        </button>
        <button id="js-play-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
          <img class="w-10 h-10" src="${play}" alt="play" />
        </button>
        <button id="js-next-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
          <img class="w-6 h-6" src="${playNext}" alt="next" />
        </button>
       
        <div id="player-time" class="hidden lg:flex gap-1 text-sm text-gray-300">
            <span id="player-current">00:00</span> / 
            <span id="player-duration">00:00</span>
        </div>
      </div>

      <div class="flex flex-1 items-center justify-between gap-4 md:gap-3 flex-wrap">

        <div class="flex items-center gap-6 min-w-0 flex-1">
          <div id="player-thumbnail" class="w-10 h-10 bg-cover bg-center rounded shrink-0"></div>
          <div class="min-w-0">
            <div id="player-title" class="font-semibold text-base truncate">Bài hát A</div>
            <div id="player-artist" class="text-sm text-gray-400 truncate">Artist name</div>
          </div>

          <div class="hidden md:flex items-center gap-2">
            <button class="p-2 rounded-full hover:bg-white/20 cursor-pointer" id="player-dislike-btn">
              <img src="${disLike}" alt="dislike" />
            </button>

            <button class="p-2 rounded-full hover:bg-white/20 cursor-pointer" id="player-like-btn">
              <img src="${like}" alt="like" />
            </button>
            
            <button class="p-2 rounded-full hover:bg-white/20 cursor-pointer" id="player-more-btn">
              <img src="${moreVert}" alt="more" />
            </button>
            
          </div>

          <div class="md:hidden relative">
            <button id="mobile-options-btn" class="p-2 rounded-full hover:bg-gray-700">
              <i class="fa-solid fa-ellipsis-vertical text-lg md:text-xl"></i>
            </button>
            <div id="mobile-options-menu" class="hidden absolute right-0 top-10 bg-[#2b2b2b] shadow-xl rounded-lg p-2 w-40">
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Thêm vào Playlist</button>
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chia sẻ</button>
              <button class="w-full py-2 px-3 text-left hover:bg-gray-700 rounded">Chi tiết bài hát</button>
            </div>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-3 md:gap-3">
          <div class="flex items-center relative group">
            <button id="js-volume-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <img src="${volume}" alt="volume" />
            </button>
            
            <div id="js-volume-panel"
       class="md:block absolute right-12 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none
              rounded-lg shadow-lg transition duration-200">
              <input id="js-volume-slider" type="range" min="0" max="100" value="100"
                     class="h-3 w-[68px] accent-white" />
            </div>
          </div>

          <div class="flex items-center gap-2 md:gap-3">
            <button id="js-repeat-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <img src="${repeatOff}" alt="repeat" />
            </button>
            <button id="js-shuffle-btn" class="p-2 rounded-full hover:bg-white/20 cursor-pointer">
              <img src="${shuffleOff}" alt="shuffle" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
