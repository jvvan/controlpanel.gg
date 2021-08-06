import { ApiUser, UserRole } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";

export class User {
  panel: ControlPanel;
  data: ApiUser;

  id: number;
  name: string;
  role: UserRole;
  credits: number;
  serverLimit: number;
  pterodactylID: number;
  avatar: string | null;
  ip: string | null;
  email: string;
  emailVerifiedAt: Date | null;
  discordVerifiedAt: Date | null;
  lastSeenAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(panel: ControlPanel, data: ApiUser) {
    this.panel = panel;

    this._patch(data);
  }

  _patch(data: ApiUser) {
    this.data = data;

    data.id && (this.id = data.id);
    data.name && (this.name = data.name);
    data.role && (this.role = data.role);
    data.credits && (this.credits = data.credits);
    data.server_limit && (this.serverLimit = data.server_limit);
    data.pterodactyl_id && (this.pterodactylID = data.pterodactyl_id);
    data.avatar && (this.avatar = data.avatar);
    data.ip && (this.ip = data.ip);
    data.email && (this.email = data.email);
    data.email_verified_at &&
      (this.emailVerifiedAt = new Date(data.email_verified_at));
    data.discord_verified_at &&
      (this.discordVerifiedAt = new Date(data.discord_verified_at));
    data.last_seen && (this.lastSeenAt = new Date(data.last_seen));
    data.created_at && (this.createdAt = new Date(data.created_at));
    data.updated_at && (this.updatedAt = new Date(data.updated_at));

    return this;
  }

  update(data: Partial<ApiUser>) {
    return this.panel.users.update(this.id, data, this);
  }

  delete() {
    return this.panel.users.delete(this.id, this);
  }

  async servers() {
    const servers = await this.panel.servers.get();
    return servers.filter((server) => server.userID === this.id);
  }
}
