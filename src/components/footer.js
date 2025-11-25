import skipNext from '../assets/icons/skipNext.svg?raw';
import skipPrevious from '../assets/icons/skipPrevious.svg?raw';
import moreVert from '../assets/icons/moreVert.svg?raw';
import playArrow from '../assets/icons/playArrow.svg?raw';
import thumbUp from '../assets/icons/thumbUp.svg?raw';
import thumbDown from '../assets/icons/thumbDown.svg?raw';
import shuffle from '../assets/icons/shuffle.svg?raw';
function Footer() {
  return `<footer class="fixed bottom-0 right-0 left-0 flex justify-between items-center h-16 z-200 ">
  <div class="w-full">
    <!-- Main player -->
    <div class="bg-[#212121] border-t border-white/6">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-4">
            <button >
              ${skipPrevious}
            </button>

            <!-- play -->
            <button >
              ${playArrow}
            </button>

            <!-- next -->
            <button>
              ${skipNext}
            </button>

            <!-- time -->
            <div class="text-sm text-white/70 ml-2"></div>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <img src="" alt="album" class="w-12 h-12 rounded-sm" />

              <div class="min-w-[220px] max-w-[380px]">
                <div class="font-semibold truncate"></div>
                <div class="text-xs text-white/60 truncate"></div>
              </div>
            </div>

            <div class="flex items-center gap-2 ml-2">
              <button class="icon-btn rounded hover:bg-white/6">
                ${thumbDown}
              </button>

              <button class="icon-btn rounded hover:bg-white/6">
                ${thumbUp}
              </button>

              <button class="icon-btn rounded hover:bg-white/6">
                ${moreVert}
              </button>
            </div>
          </div>

          <!-- Right controls -->
          <div class="flex items-center gap-3">
            <button class="icon-btn rounded hover:bg-white/6" title="Lyrics / queue">
              
            </button>

            <button class="icon-btn rounded hover:bg-white/6" title="Loop">
            </button>

            <button class="icon-btn rounded hover:bg-white/6" title="Shuffle">
              
            </button>

            <div class="flex items-center gap-2">
              <button class="icon-btn rounded hover:bg-white/6" title="Volume">
              </button>

              <button class="icon-btn rounded hover:bg-white/6">
              </button>
            </div>
          </div>
        </div>

        <!-- Optional: a slightly larger progress + scrub bar -->
        <div class="pb-4">
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <div class="track">
                <div class="progress" style="width:28%"></div>
              </div>
            </div>
            <div class="text-xs text-white/50 min-w-[60px] text-right"></div>
          </div>
        </div>

      </div>
    </div>
  </div></footer>`;
}

export default Footer;
