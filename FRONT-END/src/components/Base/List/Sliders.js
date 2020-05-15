import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: (props) => props.height,
    justifyContent: "center",
    margin: "0 auto",
  },
  margin: {
    height: theme.spacing(3),
  },
  padding: 0,
}));

function carThumbComponent(props) {
  return (
    <>
      <span {...props}>
        <span style={{ color: "black", fontWeight: "bold" }}>56%</span>
        <span>
          <DriveEtaIcon style={{ color: "#FE2E2E" }} />
        </span>
      </span>
    </>
  );
}

const Bedge = ({ stationName }) => (
  <IconButton aria-label="cart">
    <LocationOnIcon style={{ transform: "rotate( 90deg )", marginLeft: -15 }} />
    <Typography
      style={{ fontSize: "0.7rem", color: "black", fontWeight: "bold" }}
    >
      {stationName}
    </Typography>
  </IconButton>
);

const CourseSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  rail: {
    backgroundColor: "#08088A",
    opacity: 4,
  },
  mark: {
    backgroundColor: "gray",
    width: 8,
    marginLeft: -3,
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow:
      "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      },
    },
  },
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
})(Slider);

export default function Sliders({ subContent }) {
  const barLength = { height: 100 * subContent.length };
  const classes = useStyles(barLength);
  const len = Math.round(100 / (subContent.length - 1));
  const courselist = subContent;
  const stations = courselist.map((obj) => obj.stationName);

  const [percent, setPercent] = useState(100);
  let [mark, setMarks] = useState([]);
  let [courselen, setCourseLen] = useState(0);

  // 역간 거리 계산 함수
  const calculate = () => {
    setPercent(percent - len);
    return percent;
  };
  // station을 반환해줌
  const stationName = () => {
    setCourseLen(courselen + 1);
    return stations[courselen];
  };

  useEffect(() => {
    if (percent >= 0) {
      stations.map((obj) => {
        setMarks([
          ...mark,
          {
            value: calculate(),
            label: <Bedge stationName={stationName()} />,
          },
        ]);
      });
    }
  }, [percent]);

  return (
    <div className={classes.root}>
      <CourseSlider
        orientation="vertical"
        defaultValue={36}
        aria-label="123"
        aria-labelledby="vertical-slider"
        marks={mark}
        ThumbComponent={carThumbComponent}
        disabled="true"
        value={36}
        valueLabelDisplay="on"
      />
    </div>
  );
}
