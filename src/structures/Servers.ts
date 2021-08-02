import { ApiServer } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";
import { Server } from "./Server";

export class Servers {
  panel: ControlPanel;

  constructor(panel: ControlPanel) {
    this.panel = panel;
  }

  get(): Promise<Server[]>;
  get(id: string): Promise<Server>;
  async get(id?: string) {
    if (id) {
      const response = await this.panel.request<ApiServer>(
        "GET",
        `/api/servers/${id}`
      );
      return new Server(this.panel, response);
    } else {
      const servers: ApiServer[] = [];
      let page = 1;
      do {
        const response = await this.panel.request<{
          data: ApiServer[];
          last_page: number;
        }>("GET", `/api/servers?page=${page}`);
        servers.push(...response.data);
        if (response.last_page <= page) break;
        page++;
      } while (true);
      return servers.map((s) => new Server(this.panel, s));
    }
  }

  async delete(id: number | string, server?: Server): Promise<Server> {
    const response = await this.panel.request<ApiServer>(
      "DELETE",
      `/api/servers/${id}`
    );

    return server ? server._patch(response) : new Server(this.panel, response);
  }

  async suspend(id: number | string, server?: Server): Promise<Server> {
    const response = await this.panel.request<ApiServer>(
      "PATCH",
      `/api/servers/${id}/suspend`
    );

    return server ? server._patch(response) : new Server(this.panel, response);
  }

  async unsuspend(id: number | string, server?: Server): Promise<Server> {
    const response = await this.panel.request<ApiServer>(
      "PATCH",
      `/api/servers/${id}/unsuspend`
    );

    return server ? server._patch(response) : new Server(this.panel, response);
  }
}
