import { ApiUser } from "../interfaces/api";
import { formDataHeaders, toFormData } from "../util";
import { ControlPanel } from "./ControlPanel";
import { User } from "./User";

export class Users {
  panel: ControlPanel;

  constructor(panel: ControlPanel) {
    this.panel = panel;
  }

  get(): Promise<User[]>;
  get(id: number | string): Promise<User>;
  async get(id?: number | string): Promise<User[] | User> {
    if (id) {
      const response = await this.panel.request<ApiUser>(
        "GET",
        `/api/users/${id}`
      );
      return new User(this.panel, response);
    } else {
      const users: ApiUser[] = [];
      let page = 1;
      do {
        const response = await this.panel.request<{
          data: ApiUser[];
          last_page: number;
        }>("GET", `/api/users?page=${page}`);
        users.push(...response.data);
        if (response.last_page <= page) break;
        page++;
      } while (true);
      return users.map((u) => new User(this.panel, u));
    }
  }

  async update(
    id: number | string,
    data: Partial<ApiUser>,
    user?: User
  ): Promise<User> {
    const response = await this.panel.request<ApiUser>(
      "PATCH",
      `/api/users/${id}`,
      toFormData(data),
      formDataHeaders
    );

    return user ? user._patch(response) : new User(this.panel, response);
  }

  async delete(id: number | string, user?: User): Promise<User> {
    const response = await this.panel.request<ApiUser>(
      "DELETE",
      `/api/users/${id}`
    );

    return user ? user._patch(response) : new User(this.panel, response);
  }
}
