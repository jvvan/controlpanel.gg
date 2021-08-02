import { RequestMethod } from "./ControlPanel";

export class ControlPanelError extends Error {
  method: RequestMethod;
  path: string;
  statusCode: number;
  body: any;

  constructor(
    message: string,
    {
      method,
      path,
      statusCode,
      body,
    }: { method: RequestMethod; path: string; statusCode: number; body: any }
  ) {
    super(`${message} (${statusCode}, ${method} ${path})`);
    this.name = "ControlPanelError";
    this.method = method;
    this.path = path;
    this.statusCode = statusCode;
    this.body = body;
  }
}
