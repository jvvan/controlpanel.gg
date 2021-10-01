import { ApiNotification } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";

export class Notification {
  panel: ControlPanel;
  data: ApiNotification;

  id: string;
  type: string;
  notifiableType: string;
  notifiableID: number;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(panel: ControlPanel, data: ApiNotification) {
    this.panel = panel;

    this._patch(data);
  }

  _patch(data: ApiNotification) {
    this.data = data;

    this.id = data.id;
    this.type = data.type;
    this.notifiableType = data.notifiable_type;
    this.notifiableID = data.notifiable_id;
    this.title = data.data.title;
    this.content = data.data.content;
    this.readAt = new Date(data.read_at);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }
}
