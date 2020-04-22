import React from 'react'
import VideoListItem from './VideoListItem.js'

export default function VideoList(props) {
  const { onVideoSelected } = props

  return (
    <div>
      <h2 className="h6 mb-3">Recommended Videos</h2>
      <ul class="list-unstyled">
        {
          props.videos.map(video => (
            <VideoListItem
              key={video.videoId}
              title={video.title}
              poster={video.poster}
              onVideoSelected={() => onVideoSelected(video)}
            />
          ))
        }
      </ul>
    </div>
  )
}
