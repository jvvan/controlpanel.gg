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
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(panel: ControlPanel, data: ApiVoucher) {
    this.panel = panel;

    this._patch(data);
  }

  _patch(data: ApiVoucher) {
    this.data = data;

    this.id = data.id;
    this.memo = data.memo;
    this.code = data.code;
    this.uses = parseFloat(data.uses as any);
    this.credits = parseFloat(data.credits as any);
    this.used = Boolean(data.used);
    this.status = data.status;
    this.expiresAt = data.expires_at ? new Date(data.expires_at) : null;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);

    return this;
  }

  update(data: ApiVoucher) {
    return this.panel.vouchers.update(this.id, data, this);
  }

  delete() {
    return this.panel.vouchers.delete(this.id, this);
  }
}
