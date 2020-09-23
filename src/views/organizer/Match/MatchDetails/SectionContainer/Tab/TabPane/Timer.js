import React from "react";
import { Button, Col } from "reactstrap";
import ReactStopwatch from "react-stopwatch";
import { FaPlay } from "react-icons/fa";

export const Timer = ({
  timer,
  round,
  matchDetails,
  handleStartTime,
  formatedTimer,
  minute,
  setMinute
}) => {
  return (
    <Col
      md={12}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <p>{round}</p>
      {!timer && !formatedTimer && formatedTimer === undefined ? (
        <h1 style={{ margin: 0 }}>--:--</h1>
      ) : (
        <ReactStopwatch
          // seconds={formatedTimer ? formatedTimer.split(":")[1] : 0}
          hours={0}
          seconds={0}
          minutes={0}
          limit={`00:${matchDetails.duration.toString().padStart(2, "0")}:00`}
          onCallback={() => console.log("Finish")}
          render={({ minutes, seconds }) => {
            return (
              <div>
                <h1>
                  {minutes ? minutes.toString().padStart(2, "0") : "00"}:
                  {seconds ? seconds.toString().padStart(2, "0") : "00"}
                </h1>
              </div>
            );
          }}
        />
      )}
      <Button
        className="btn btn-start"
        style={{ marginTop: 25 }}
        onClick={() => handleStartTime(matchDetails.round)}
      >
        <FaPlay />
      </Button>
    </Col>
  );
};
