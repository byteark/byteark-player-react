import VideoListItem from './VideoListItem';

import type { IVideo } from '../videos';

export interface VideoListProps {
  videos: IVideo[];
  onVideoSelected: (video: IVideo) => void;
}

export default function VideoList(props: VideoListProps) {
  const { onVideoSelected } = props;

  return (
    <div>
      <h2 className='h6 mb-3'>Recommended Videos</h2>
      <ul className='list-unstyled'>
        {props.videos.map((video) => (
          <VideoListItem
            key={video.videoId}
            title={video.title}
            poster={video.poster}
            onVideoSelected={() => onVideoSelected(video)}
          />
        ))}
      </ul>
    </div>
  );
}
