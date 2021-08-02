export interface ApiUser {
  id: number;
  name: string;
  role: UserRole;
  credits: number;
  server_limit: number;
  pterodactyl_id: number;
  avatar?: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  ip?: string;
  last_seen?: string;
  discord_verified_at?: string;
}

export type UserRole = "admin" | "client" | "member";

export interface ApiServer {
  id: string;
  name: string;
  description?: string;
  suspended?: string;
  identifier: string;
  pterodactyl_id: number;
  user_id: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  product: ApiProduct;
}

export interface ApiProduct {
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
  created_at: string;
  updated_at: string;
  disabled: boolean;
}

export interface ApiVoucher {
  memo: string;
  code: string;
  uses: number;
  credits: number;
  expires_at?: string;
  updated_at: string;
  created_at: string;
  id: number;
  used: number;
  status: VoucherStatus;
}

export type VoucherStatus = "VALID" | "EXPIRED" | "USES_LIMIT_REACHED";
