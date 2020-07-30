import React, { useEffect, useState } from "react";
import "./styles.css";

import MatchList from "./MatchList";
import MatchDetails from "./MatchDetails";
import MatchStarted from "./MatchStarted";

const Match = ({ match, history }) => {
  const [route, setRoute] = useState("");
  const [currentData, setCurrentData] = useState();
  const [matchEvents, setMatchEvents] = useState({ data: [] });

  const data = {
    data: [
      {
        id: 1,
        date: "2020-01-01",
        team_a: "TIME A",
        team_b: "TIME B",
        time_start: "18:00:00",
        time_end: "18:00:00",
        type: "PARTIDA INTERNA",
        duration: 30,
        modality: "2 TEMPOS",
        score_type: "RANKEADA",
        players_quantity: 5,
        status: "PRÉ-PARTIDA",
        players: [
          {
            id: 1,
            name: "Caio Deambrosio",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 2,
            name: "Ana Luiza",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 3,
            name: "Jorge",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 4,
            name: "Luis",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 5,
            name: "Kleber",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 6,
            name: "João",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 7,
            name: "Fernando",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 8,
            name: "Henrique",
            matchConfimation: {
              createdAt: "2020-06-20 11:20:12"
            }
          },
          {
            id: 9,
            name: "Carlos"
          },
          {
            id: 10,
            name: "Junior"
          }
        ]
      }
    ]
  };

  const events = {
    data: [
      {
        id: 1,
        description: "CANETA",
        value: 1,
        updatedAt: "2020-07-29T22:29:28.532Z"
      },
      {
        id: 2,
        description: "CHAPÉU",
        value: 1,
        updatedAt: "2020-07-29T22:29:40.054Z"
      },
      {
        id: 3,
        description: "DRIBLE",
        value: 1,
        updatedAt: "2020-07-29T22:29:46.486Z"
      },
      {
        id: 3,
        description: "CARTÃO VERMELHO",
        value: -2,
        updatedAt: "2020-07-29T22:29:46.486Z"
      }
    ]
  };

  const handleSelectEvent = ({ event, player }) => {
    const newEvent = {
      event_id: event.id,
      user_id: player.id,
      event_value: event.value,
      user_team: player.team,
      user_team_name: player.teamName,
      event_description: event.description
    };

    setMatchEvents({
      data: [...matchEvents.data, { ...newEvent }]
    });
  };

  useEffect(() => {
    setRoute(window.location.pathname);
  }, [window.location.pathname]);

  switch (route) {
    case "/organizer/matches":
      return (
        <MatchList
          data={data}
          history={history}
          currentData={currentData}
          setCurrentData={setCurrentData}
        />
      );
    case "/organizer/matches/details":
      return (
        <MatchDetails
          history={history}
          currentData={currentData}
          setCurrentData={setCurrentData}
        />
      );
    case "/organizer/matches/details/started":
      return (
        <MatchStarted
          data={currentData}
          events={events.data}
          matchEvents={matchEvents}
          handleSelectEvent={handleSelectEvent}
        />
      );

    default:
      return <></>;
  }
};

export default Match;
