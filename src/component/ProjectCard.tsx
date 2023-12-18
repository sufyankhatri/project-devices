import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./index.css";
import { Project } from "../interface/Project";

interface IProjectCard {
  project: Project;
  handleEditClick: (project: Project) => void;
  handleDeleteClick: (project: Project) => void;
}

const ProjectCard: React.FC<IProjectCard> = ({
  project,
  handleDeleteClick,
  handleEditClick,
}) => {
  const { name, users, devices, expirationDate, beginDate } = project;
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {expirationDate}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {beginDate}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Users
        </Typography>
        <Typography variant="body2">
          {users.length > 0 ? (
            <div className="grid-item-user">
              <div>firstName</div>
              <div>lastName</div> <div> appUserId</div>
              <div>disabled</div>
            </div>
          ) : (
            <div>No users...</div>
          )}
          {users.map((u) => (
            <div className="grid-item-user">
              <div>{u.firstName}</div>
              <div>{u.lastName}</div>
              <div>{u.appuserId}</div>
              <div>{u.disabled}</div>
            </div>
          ))}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Devices
        </Typography>
        <Typography variant="body2">
          {devices.length > 0 ? (
            <div className="grid-item-device">
              <div>ID</div>
              <div>Serial Number</div>
            </div>
          ) : (
            <div>No devices...</div>
          )}
          {devices.map((d) => (
            <div className="grid-item-device">
              <div>{d.deviceId}</div>
              <div>{d.serialNumber}</div>
            </div>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditClick(project)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteClick(project)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
