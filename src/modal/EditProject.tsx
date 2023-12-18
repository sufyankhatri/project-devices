import { Checkbox, Divider, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Project } from "../interface/Project";

const style = {
  position: "absolute" as "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflow: "scroll",
};
interface IEditProjectModal {
  project: Project;
  handleClose: () => void;
  handleSubmit: (project: Project) => void;
}
const EditProjectModal: React.FC<IEditProjectModal> = ({
  project: projectItem,
  handleClose,
  handleSubmit,
}) => {
  const [project, setProject] = React.useState<Project>(projectItem);

  const handleProjectFieldChange = (name: string, value: string) => {
    setProject((p) => ({ ...p, [name]: value }));
  };

  const handleUserChange = (
    uid: string,
    name: string,
    value: string,
    isNumber?: boolean
  ) => {
    const oldUsers = [...project.users];
    const newUsers = oldUsers.map((u) => {
      if (u.uid === uid) {
        return { ...u, [name]: isNumber ? +value : value };
      }
      return u;
    });
    setProject((project) => ({ ...project, users: newUsers }));
  };

  const handleDeviceSerialNumberChange = (
    deviceId: number,
    serialNumber: string
  ) => {
    const oldDevices = [...project.devices];
    const newDevices = oldDevices.map((d) =>
      d.deviceId === deviceId ? { ...d, serialNumber } : d
    );
    setProject((project) => ({ ...project, devices: newDevices }));
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      title="Edit Project"
      sx={{ overflow: "scroll" }}
    >
      <Box sx={style}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          onChange={(e) => handleProjectFieldChange("name", e.target.value)}
          value={project.name}
        />
        <TextField
          id="beginDate"
          label="Begin Date"
          variant="outlined"
          name="beginDate"
          onChange={(e) =>
            handleProjectFieldChange("beginDate", e.target.value)
          }
          value={project.beginDate}
        />
        <TextField
          id="expiratonDate"
          label="Expiration Date"
          variant="outlined"
          name="expirationDate"
          onChange={(e) =>
            handleProjectFieldChange("expirationDate", e.target.value)
          }
          value={project.expirationDate}
        />
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Users
        </Typography>
        {project.users.map((u) => (
          <>
            <TextField
              id={`firstname`}
              label="First Name"
              variant="outlined"
              name="firstName"
              value={u.firstName}
              onChange={(e) => {
                handleUserChange(u.uid, "firstName", e.target.value);
              }}
            />
            <TextField
              id={`lastname`}
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={u.lastName}
              onChange={(e) => {
                handleUserChange(u.uid, "lastName", e.target.value);
              }}
            />
            <TextField
              id={`appuserId`}
              label="App User Id"
              variant="outlined"
              name="appuserId"
              value={u.appuserId}
              onChange={(e) => {
                handleUserChange(u.uid, "appuserId", e.target.value, true);
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Disabled{" "}
              <Checkbox
                checked={Boolean(u.disabled)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleUserChange(
                    u.uid,
                    "disabled",
                    e.target.checked ? "1" : "0",
                    true
                  );
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: "10px" }} />
          </>
        ))}
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Devices
        </Typography>

        {project.devices.map((d) => (
          <TextField
            id="serialNumber"
            label="Serial Number"
            variant="outlined"
            value={d.serialNumber}
            onChange={(e) =>
              handleDeviceSerialNumberChange(d.deviceId, e.target.value)
            }
          />
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleSubmit(project);
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;
