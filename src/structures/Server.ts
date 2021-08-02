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
    this.data = data;
    this.product = new Product(panel, data.product);

    this._patch(data);
  }

  _patch(data: ApiServer) {
    this.data = data;

    data.id && (this.id = data.id);
    data.name && (this.name = data.name);
    data.description && (this.description = data.description);
    data.suspended && (this.suspended = new Date(data.suspended));
    data.identifier && (this.identifier = data.identifier);
    data.pterodactyl_id && (this.pterodactylID = data.pterodactyl_id);
    data.user_id && (this.userID = data.user_id);
    data.product_id && (this.productID = data.product_id);
    data.product && this.product._patch(data.product);
    data.created_at && (this.createdAt = new Date(data.created_at));
    data.updated_at && (this.updatedAt = new Date(data.updated_at));

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
