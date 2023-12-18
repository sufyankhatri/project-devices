import { Device } from "./Device";
import { User } from "./User";

export interface Project {
  id: number;
  name: string;
  users: User[];
  devices: Device[];
  expirationDate: string | null;
  beginDate: string;
}
