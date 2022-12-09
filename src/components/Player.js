import React, {useState, useRef} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReactPlayer from 'react-player';
import { makeStyles } from '@mui/styles';
import PlayerControls from './PlayerControls';
import screenfull from 'screenfull';
import Paper  from '@mui/material/Paper';

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative"
  }
});


const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function Player() {

  const classes = useStyles();
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume:0.5,
    playbackRate:1.0,
    seeking: false,
  });
  // eslint-disable-next-line no-unused-vars
  const {playing, muted, volume, playbackRate, played, seeking} = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const [bookmarks, setBookmarks] = useState([])
  const handlePlayPause= ()=> {
    setState({...state, playing:!state.playing});
  };
  const handleRewind= ()=> {
    playerRef.current.seekTo(playerRef.current.getCurrentTime()-10)
  };
  const handleFastForward= ()=> {
    playerRef.current.seekTo(playerRef.current.getCurrentTime()+10)
  };
  const handleMute= ()=> {
    setState({...state, muted:!state.muted});
  };
  const handleVolumeChange= (e, newValue)=> {
    setState({...state, volume:parseFloat(newValue/100), muted:newValue===0?true:false});
  };
  const handleVolumeSeekUp= (e, newValue)=> {
    setState({...state, volume:parseFloat(newValue/100), muted:newValue===0?true:false});
  };
  const handlePlaybackRateChange= (rate)=> {
    setState({...state, playbackRate:rate});
  };
  const toggleFullScreen= ()=> {
    screenfull.toggle(playerContainerRef.current)
  };
  const handleProgress = (changeState) =>{
    //console.log(changeState);
    if(count>3){
      controlsRef.current.style.visibility = "hidden";
      count=0
    }
    if(controlsRef.current.style.visibility === "visible"){
      count += 1;
    }
    if(!state.seeking){
      setState({...state, ...changeState});
    }

  }
  const handleSeekChange = (e, newValue) =>{
    setState({...state, played:parseFloat(newValue / 100)});
  }
  const handleSeekMouseDown = (e) =>{
    setState({...state, seeking:true});
  }
  const handleSeekMouseUp = (e, newValue) =>{
    setState({...state, seeking:false});
    playerRef.current.seekTo(newValue /100);
  }
  const handleMouseMove = ()=>{
    controlsRef.current.style.visibility = "visible";
    count = 0;
  }
  const addBookmark = (changeState)=>{
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(playerRef.current.getInternalPlayer(),0,0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  }
  const currentTime = playerRef.current ? playerRef.current.getCurrentTime():'00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);
  return (
    <>
     
      <Container style={{marginTop:"6%", width:"95%"}}>
        <div 
          ref={playerContainerRef}
          className={classes.playerWrapper}
          onMouseMove={handleMouseMove}
        >
          <ReactPlayer
            ref={playerRef}
            url= 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            width='100%'
            height='100%'
            playing = {playing}
            muted = {muted}
            playbackRate ={playbackRate}
            onProgress={handleProgress}
            config={{
              file:{
                attributes:{
                  crossOrigin: "anonymous"
                }
              }
            }}
          />
         <PlayerControls
         ref= {controlsRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind= {handleRewind}
          onFastForward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          volume={volume}
          playbackRate={playbackRate}
          onPlaybackRateChange = {handlePlaybackRateChange}
          onToggleFullScreen = {toggleFullScreen}
          played={played}
          onSeek= {handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime = {elapsedTime}
          totalDuration = {totalDuration}
          onBookmark = {addBookmark}
         />
        </div>
        <Grid container style={{marginTop: 20}} spacing={3}>
            {bookmarks.map((bookmark,index)=>(
              <Grid item key={index}>
                <Paper onClick={()=> playerRef.current.seekTo(bookmark.time)}>
                  <img alt='bookmark' crossOrigin='anonymous' src={bookmark.image}/>
                  <Typography>BookMark at {bookmark.display}</Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
        <canvas ref={canvasRef}/>
      </Container>
    </>
  );
}

export default Player;
