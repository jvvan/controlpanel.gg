import { ApiVoucher } from "../interfaces/api";
import { formDataHeaders, toFormData } from "../util";
import { ControlPanel } from "./ControlPanel";
import { Voucher } from "./Voucher";

export class Vouchers {
  panel: ControlPanel;

  constructor(panel: ControlPanel) {
    this.panel = panel;
  }

  get(): Promise<Voucher[]>;
  get(id: number | string): Promise<Voucher>;
  async get(id?: number | string): Promise<Voucher[] | Voucher> {
    if (id) {
      const response = await this.panel.request<ApiVoucher>(
        "GET",
        `/api/vouchers/${id}`
      );
      return new Voucher(this.panel, response);
    } else {
      const vouchers: ApiVoucher[] = [];
      let page = 1;
      do {
        const response = await this.panel.request<{
          data: ApiVoucher[];
          last_page: number;
        }>("GET", `/api/vouchers?page=${page}`);
        vouchers.push(...response.data);
        if (response.last_page <= page) break;
        page++;
      } while (true);
      return vouchers.map((v) => new Voucher(this.panel, v));
    }
  }

  async create(data: Partial<ApiVoucher>) {
    const response = await this.panel.request<ApiVoucher>(
      "POST",
      "/api/vouchers",
      toFormData(data),
      formDataHeaders
    );
    return new Voucher(this.panel, response);
  }

  async update(
    id: number | string,
    data: Partial<ApiVoucher>,
    voucher?: Voucher
  ): Promise<Voucher> {
    const response = await this.panel.request<ApiVoucher>(
      "PATCH",
      `/api/vouchers/${id}`,
      toFormData(data),
      formDataHeaders
    );

    return voucher
      ? voucher._patch(response)
      : new Voucher(this.panel, response);
  }

  async delete(id: number | string, voucher?: Voucher): Promise<Voucher> {
    const response = await this.panel.request<ApiVoucher>(
      "DELETE",
      `/api/vouchers/${id}`
    );

    return voucher
      ? voucher._patch(response)
      : new Voucher(this.panel, response);
  }
}
