import { ApiVoucher, VoucherStatus } from "../interfaces/api";
import { ControlPanel } from "./ControlPanel";

export class Voucher {
  panel: ControlPanel;
  data: ApiVoucher;

  id: number;
  memo?: string;
  code: string;
  uses: number;
  credits: number;
  used: boolean;
  status: VoucherStatus;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(panel: ControlPanel, data: ApiVoucher) {
    this.panel = panel;
    this.data = data;

    this._patch(data);
  }

  _patch(data: ApiVoucher) {
    data.id && (this.id = data.id);
    data.memo && (this.memo = data.memo);
    data.code && (this.code = data.code);
    data.uses && (this.uses = data.uses);
    data.credits && (this.credits = data.credits);
    data.used && (this.used = Boolean(data.used));
    data.status && (this.status = data.status);
    data.expires_at && (this.expiresAt = new Date(data.expires_at));
    data.created_at && (this.createdAt = new Date(data.created_at));
    data.updated_at && (this.updatedAt = new Date(data.updated_at));

    return this;
  }

  update(data: ApiVoucher) {
    return this.panel.vouchers.update(this.id, data, this);
  }

  delete() {
    return this.panel.vouchers.delete(this.id, this);
  }
}
