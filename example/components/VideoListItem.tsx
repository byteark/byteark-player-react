export interface VideoListItemProps {
  title: string;
  poster: string;
  onVideoSelected: () => void;
}

export default function VideoList(props: VideoListItemProps) {
  const { title, poster, onVideoSelected } = props;

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    onVideoSelected();
  };

  return (
    <li>
      <a className='media my-2' href='#' onClick={onClick}>
        <img className='rounded mr-3' style={{ width: 100 }} src={poster} alt={title} />
        <div className='media-body'>
          <p className='h6 mt-0 mb-1'>{title}</p>
        </div>
      </a>
    </li>
  );
}
