import React from "react";
import { FaFutbol } from "react-icons/fa";
import { CardBody, Badge } from "reactstrap";

import Table from "../../../../../../../../components/Table";
import CardHeader from "../../../../../../../../components/CardHeader";
import DeleteButton from "../../../../../../../../components/ActionButtons/DeleteButton";

function TableEvents({ session, onDeleteEventClick, matchDetails }) {
  const tableColumns = [
    { name: "Jogador", attribute: "User.name" },
    {
      name: "Time",
      render: ({ data }) => {
        if (
          data.MatchEscalation &&
          data.MatchEscalation.team === "TIME A"
        ) {
          return data.Match.team_a;
        } else if (
          data.MatchEscalation &&
          data.MatchEscalation.team === "TIME B"
        ) {
          return data.Match.team_b;
        } else if (data.type === "GOL SOFRIDO") {
          return data.Match.team_b;
        }
      }
    },
    {
      name: "Evento",
      render: ({ data }) => {
        return data.type === "GOL SOFRIDO" ? "GOL" : data.description;
      }
    },
    {
      name: "Pontos",
      render: ({ data }) => {
        if (data.type === "GOL") {
          return (
            <Badge
              style={{ marginLeft: 15 }}
              className="event-value-badge green"
            >
              <FaFutbol />
            </Badge>
          );
        } else if (data.type === "GOL SOFRIDO") {
          return (
            <Badge
              style={{ marginLeft: 15 }}
              className="event-value-badge red"
            >
              <FaFutbol />
            </Badge>
          );
        } else {
          if (data.value > 0) {
            return (
              <Badge
                style={{ marginLeft: 15 }}
                className="event-value-badge green"
              >
                {`+${data.value}`}
              </Badge>
            );
          } else {
            return (
              <Badge
                style={{ marginLeft: 15 }}
                className="event-value-badge red"
              >
                {data.value}
              </Badge>
            );
          }
        }
      }
    }
  ]

  if (session.type === 'ORGANIZER') {
    tableColumns.push({
      name: <b className="action-column">Acões</b>,
      render: ({ data }) => (
        <ActionColumn
          data={data}
          onDeleteEventClick={() => onDeleteEventClick(data.id)}
        />
      )
    })
  }

  return (
    <>
      <CardHeader title="EVENTOS" style={{ marginTop: 25 }} />
      <CardBody>
        <hr style={{ borderColor: "white" }} />
        <Table
          isLoading={false}
          data={{ data: matchDetails.MatchEvents }}
          columns={tableColumns}
        />
      </CardBody>
    </>
  );
}

const ActionColumn = ({ onDeleteEventClick }) => (
  <div className="action-column">
    <DeleteButton onClick={onDeleteEventClick} />
  </div>
);

export default TableEvents;
