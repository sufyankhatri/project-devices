import { devices } from "../db/device";
import { projects } from "../db/project";
import { users } from "../db/user";
import { Project } from "../interface/Project";
import { v4 as uuid } from "uuid";

export const getProjects = (): Project[] => {
  return projects.map((p) => {
    const projectDevices = devices.filter((d) => d.projectId === p.id);
    const projectUsers = users
      .filter((u) => u.projectId === p.id)
      .map((u) => ({ ...u, uid: uuid() }));
    return {
      id: p.id,
      name: p.title,
      devices: projectDevices,
      users: projectUsers,
      expirationDate: p.expirationDate,
      beginDate: p.beginDate,
    };
  });
};
