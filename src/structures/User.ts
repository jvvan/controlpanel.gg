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

    this.id = data.id;
    this.name = data.name;
    this.role = data.role;
    this.credits = parseFloat(data.credits as any);
    this.serverLimit = parseFloat(data.server_limit as any);
    this.pterodactylID = data.pterodactyl_id;
    this.avatar = data.avatar ?? null;
    this.ip = data.ip ?? null;
    this.email = data.email;
    this.emailVerifiedAt = data.email_verified_at
      ? new Date(data.email_verified_at)
      : null;
    this.discordVerifiedAt = data.discord_verified_at
      ? new Date(data.discord_verified_at)
      : null;
    this.lastSeenAt = data.last_seen ? new Date(data.last_seen) : null;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);

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
