import { ApiServer } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";
import { Product } from "./Product";

export class Server {
  panel: ControlPanel;
  data: ApiServer;

  id: string;
  name: string;
  description: string | null;
  suspended: Date | null;
  identifier: string;
  pterodactylID: number;
  userID: number;
  productID: string;
  product: Product;
  createdAt: Date;
  updatedAt: Date;

  constructor(panel: ControlPanel, data: ApiServer) {
    this.panel = panel;
    this.product = new Product(panel, data.product);

    this._patch(data);
  }

  _patch(data: ApiServer) {
    this.data = data;

    this.id = data.id;
    this.name = data.name;
    this.description = data.description ?? null;
    this.suspended = data.suspended ? new Date(data.suspended) : null;
    this.identifier = data.identifier;
    this.pterodactylID = data.pterodactyl_id;
    this.userID = data.user_id;
    this.productID = data.product_id;
    this.product._patch(data.product);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);

    return this;
  }

  suspend() {
    return this.panel.servers.suspend(this.id, this);
  }
  unsuspend() {
    return this.panel.servers.unsuspend(this.id, this);
  }

  delete() {
    return this.panel.servers.delete(this.id, this);
  }

  user() {
    return this.panel.users.get(this.userID);
  }
}
