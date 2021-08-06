import { ApiNotification, NotificationVia } from "../interfaces/api";
import { formDataHeaders, toFormData } from "../util";
import { ControlPanel } from "./ControlPanel";
import { Notification } from "./Notification";
import { User } from "./User";

export type UserResolvable = User | string | number;

export class Notifications {
  panel: ControlPanel;

  constructor(panel: ControlPanel) {
    this.panel = panel;
  }

  resolveID(user: UserResolvable) {
    if (user instanceof User) return user.id;
    if (typeof user === "string") return parseInt(user);
    else return user;
  }

  get(user: UserResolvable): Promise<Notification[]>;
  get(user: UserResolvable, id: string): Promise<Notification>;
  async get(user: UserResolvable, id?: string) {
    const userID = this.resolveID(user);
    if (id) {
      const response = await this.panel.request<ApiNotification>(
        "GET",
        `/api/notifications/${userID}/${id}`
      );
      return new Notification(this.panel, response);
    } else {
      const notifications: ApiNotification[] = [];
      let page = 1;
      do {
        const response = await this.panel.request<{
          data: ApiNotification[];
          last_page: number;
        }>("GET", `/api/notifications/${userID}?page=${page}`);
        notifications.push(...response.data);
        if (response.last_page <= page) break;
        page++;
      } while (true);
      return notifications.map((n) => new Notification(this.panel, n));
    }
  }

  async create({
    via,
    all,
    users,
    title,
    content,
  }: {
    via: NotificationVia[];
    all?: boolean;
    users?: UserResolvable[];
    title: string;
    content: string;
  }): Promise<true> {
    return await this.panel.request(
      "POST",
      `/api/notifications`,
      toFormData({
        via: via.join(","),
        all: all ? 1 : 0,
        users: users?.map((u) => this.resolveID(u)).join(","),
        title,
        content,
      }),
      formDataHeaders
    );
    return true;
  }

  delete(user: UserResolvable): Promise<number>;
  delete(user: UserResolvable, id: string): Promise<Notification>;
  async delete(user: UserResolvable, id?: string) {
    const userID = this.resolveID(user);
    if (id) {
      const response = await this.panel.request<ApiNotification>(
        "DELETE",
        `/api/notifications/${userID}/${id}`
      );
      return new Notification(this.panel, response);
    } else {
      const response = await this.panel.request<{ count: number }>(
        "DELETE",
        `/api/notifications/${userID}`
      );
      return response.count;
    }
  }
}
