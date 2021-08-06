import fetch from "node-fetch";
import { getURLOrigin } from "../util";
import { ControlPanelError } from "./ControlPanelError";
import { Notifications } from "./Notifications";
import { Servers } from "./Servers";
import { Users } from "./Users";
import { Vouchers } from "./Vouchers";

export class ControlPanel {
  #options: ControlPanelOptions;
  users: Users;
  servers: Servers;
  vouchers: Vouchers;
  notifications: Notifications;

  constructor(options: ControlPanelOptions) {
    this.#options = {
      host: getURLOrigin(options.host),
      authorization: `Bearer ${options.authorization}`,
      headers: options.headers || {},
    };

    this.users = new Users(this);
    this.servers = new Servers(this);
    this.vouchers = new Vouchers(this);
    this.notifications = new Notifications(this);
  }

  headers(headers: Record<string, string>) {
    return {
      authorization: this.#options.authorization,
      accept: "application/json",
      ...this.#options.headers,
      ...headers,
    };
  }

  async request<T>(
    method: RequestMethod,
    url: string,
    body?: any | undefined,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const res = await fetch(this.#options.host + url, {
      method,
      body,
      headers: this.headers(headers),
    });

    const json = await res.json().catch(() => ({}));
    const errorData = {
      method,
      path: url,
      statusCode: res.status,
      body: json,
    };

    if (res.status.toString()[0] === "4") {
      throw new ControlPanelError(
        json?.error || json?.message || "Bad Request",
        errorData
      );
    } else if (res.status.toString()[0] === "5") {
      throw new ControlPanelError("Internal Server Error", errorData);
    }

    try {
      return json as T;
    } catch (e) {
      throw new ControlPanelError("Unknown Error", errorData);
    }
  }
}

export interface ControlPanelOptions {
  host: string;
  authorization: string;
  headers?: Record<string, string>;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
