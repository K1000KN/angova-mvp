import "../index.css";
import React, { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { withStyles, makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import { PlayArrow, Pause, Fullscreen } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import Popover from "@mui/material/Popover";
import { VolumeUp, VolumeMute, VolumeDown } from "@mui/icons-material";

const useStyles = makeStyles({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
});

const PrettoSlider = withStyles({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})(Slider);

// eslint-disable-next-line import/no-anonymous-default-export
export default forwardRef(
  (
    {
      onPlayPause,
      playing,
      onRewind,
      onFastForward,
      onMute,
      muted,
      onVolumeChange,
      onVolumeSeekUp,
      volume,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      played,
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      elapsedTime,
      totalDuration,
      onBookmark,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    function valueLabelFormat() {
      return elapsedTime;
    }
    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;
    return (
      <div className={classes.controlsWrapper} ref={ref}>
        {/* Top control */}
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ padding: 16 }}
        >
          <Grid item>
            <Typography className="titleVideo" style={{ color: "#fff" }}>
              Session code n°1
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>

        {/* Middle control */}
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {/* <IconButton onClick={onRewind} className='controlIcons' aria-label="rewind">
          <Replay10Icon style={{marginRight:30}} fontSize='inherit'/>
        </IconButton> */}
          <IconButton
            onClick={onPlayPause}
            className="controlIcons"
            aria-label="rewind"
          >
            {playing ? (
              <Pause fontSize="inherit" />
            ) : (
              <PlayArrow fontSize="inherit" />
            )}
          </IconButton>
          {/* <IconButton onClick={onFastForward}  style={{marginLeft:30}}className='controlIcons'  aria-label="rewind">
          <Forward10Icon fontSize='inherit'/>
        </IconButton> */}
        </Grid>

        {/* Bottom control */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="bottomControlGrid"
        >
          <Grid item xs={12} className="sliderStyle">
            <PrettoSlider
              min={0}
              max={100}
              style={{ color: "#F49E4C" }}
              value={played * 100}
              valueLabelDisplay="auto"
              valueLabelFormat={valueLabelFormat}
              onChange={onSeek}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <IconButton onClick={onPlayPause} className="bottomIcons">
                {playing ? (
                  <Pause fontSize="inherit" />
                ) : (
                  <PlayArrow fontSize="inherit" />
                )}
              </IconButton>
              <IconButton onClick={onMute} className="bottomIcons">
                {muted ? (
                  <VolumeMute fontSize="inherit" />
                ) : volume > 0.5 ? (
                  <VolumeUp fontSize="inherit" />
                ) : (
                  <VolumeDown fontSize="inherit" />
                )}
              </IconButton>

              <Slider
                min={0}
                max={100}
                value={volume * 100}
                className="volumeSlider"
                onChange={onVolumeChange}
                onChangeCommitted={onVolumeSeekUp}
              />

              <Button variant="text">
                <Typography className="duration">
                  {elapsedTime}/{totalDuration}
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              onClick={handlePopover}
              variant="text"
              className="buttonPlaybackRate"
            >
              <Typography className="typoResponsive">{playbackRate}</Typography>
            </Button>

            <Popover
              className="typoResponsive"
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Grid container direction="column-reverse">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <Button
                    className="buttonPlaybackRate"
                    onClick={() => onPlaybackRateChange(rate)}
                    variant="text"
                    key={rate}
                  >
                    <Typography
                      className="typoResponsive"
                      color={rate === playbackRate ? "#F49E4C" : "black"}
                    >
                      {rate}
                    </Typography>
                  </Button>
                ))}
              </Grid>
            </Popover>

            <IconButton onClick={onToggleFullScreen} className="bottomIcons">
              <Fullscreen fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
);
