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

    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = parseFloat(data.price as any);
    this.memory = parseFloat(data.memory as any);
    this.cpu = parseFloat(data.cpu as any);
    this.swap = parseFloat(data.swap as any);
    this.disk = parseFloat(data.disk as any);
    this.io = parseFloat(data.io as any);
    this.databases = parseFloat(data.databases as any);
    this.backups = parseFloat(data.backups as any);

    this.allocations = parseFloat(data.allocations as any);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.disabled = data.disabled;

    return this;
  }

  async servers() {
    const servers = await this.panel.servers.get();
    return servers.filter((server) => server.productID === this.id);
  }
}
