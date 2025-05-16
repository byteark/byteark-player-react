export interface VideoInfoProps {
  title: string;
  description: string;
}

export default function VideoInfo(props: VideoInfoProps) {
  const { title, description } = props;

  return (
    <div>
      <h1 className='h4'>{title}</h1>
      <p className='text-muted mt-4'>{description}</p>
    </div>
  );
}
