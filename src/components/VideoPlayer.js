import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";

function VideoPlayer({ url, height, width }) {
  return <ReactPlayer url={url} playing={true} loop={true} controls={true} height={height} width={width} />;
}

export default VideoPlayer;
