import MediaInfo from '../components/MediaInfo';
import SongListPlayer from '../components/SongListPlayer';
import { player } from '../controllers/PlayController';

export default function SongDetailPage(data) {
  const infoPayload = {
    thumbnails: data.thumbnails,
    title: data.title,
  };

  const albumTracks = Array.isArray(data.album?.tracks)
    ? data.album.tracks
    : [];

  const playlistTracks = Array.isArray(data.playlists)
    ? data.playlists.flatMap(p => p.tracks || [])
    : [];

  const limitedPlaylistTracks = playlistTracks.slice(0, 95);

  const mixTracks = [...albumTracks, ...limitedPlaylistTracks];

  const relatedTracks = Array.isArray(data.related) ? data.related : [];

  const finalTracks = mixTracks.length > 0 ? mixTracks : relatedTracks;

  const mergedTracks = finalTracks.map(t => ({
    id: t.id,
    title: t.title,
    thumbnails: t.thumbnails || data.thumbnails || [],
    duration: t.duration || 0,
    audioUrl: t.audioUrl,
    audioType: t.audioType,
    artists: t.artists || ['Không rõ nghệ sĩ'],
  }));

  player.setSongs(mergedTracks);

  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30">
      <div class="md:col-span-1">
        ${MediaInfo(infoPayload)}
      </div>

      <div class="md:col-span-2">
        ${SongListPlayer(mergedTracks)}
      </div>
    </div>
  `;
}
