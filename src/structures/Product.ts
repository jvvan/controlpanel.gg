import { ApiProduct } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";

export class Product {
  panel: ControlPanel;
  data: ApiProduct;

  id: string;
  name: string;
  description: string;
  price: number;
  memory: number;
  cpu: number;
  swap: number;
  disk: number;
  io: number;
  databases: number;
  backups: number;
  allocations: number;
  createdAt: Date;
  updatedAt: Date;
  disabled: boolean;

  constructor(panel: ControlPanel, data: ApiProduct) {
    this.panel = panel;

    this._patch(data);
  }

  _patch(data: ApiProduct) {
    this.data = data;

    data.id && (this.id = data.id);
    data.name && (this.name = data.name);
    data.description && (this.description = data.description);
    data.price && (this.price = data.price);
    data.memory && (this.memory = data.memory);
    data.cpu && (this.cpu = data.cpu);
    data.swap && (this.swap = data.swap);
    data.disk && (this.disk = data.disk);
    data.io && (this.io = data.io);
    data.databases && (this.databases = data.databases);
    data.backups && (this.backups = data.backups);
    data.allocations && (this.allocations = data.allocations);
    data.created_at && (this.createdAt = new Date(data.created_at));
    data.updated_at && (this.updatedAt = new Date(data.updated_at));
    data.disabled && (this.disabled = data.disabled);

    return this;
  }

  async servers() {
    const servers = await this.panel.servers.get();
    return servers.filter((server) => server.productID === this.id);
  }
}
