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

    data.id && (this.id = data.id);
    data.notifiable_type && (this.notifiableType = data.notifiable_type);
    data.notifiable_id && (this.notifiableID = data.notifiable_id);
    data.data.title && (this.title = data.data.title);
    data.data.content && (this.content = data.data.content);
    data.read_at && (this.readAt = new Date(data.read_at));
    data.created_at && (this.createdAt = new Date(data.created_at));
    data.updated_at && (this.updatedAt = new Date(data.updated_at));
  }
}
