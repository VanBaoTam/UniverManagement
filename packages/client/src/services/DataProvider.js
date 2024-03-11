import axios from "axios";
import { BASE_URL } from "@constants";

axios.interceptors.request.use((request) => {
  request.validateStatus = (status) => {
    return status < 500;
  };

  const defaultHeader = get(request, "headers['Content-Type']");
  if (!defaultHeader) {
    set(request, "headers['Content-Type']", "application/json; charset=utf-8");
  }
  return request;
});

// ----------------------------------------------------------------------------------

export class DataProvider {
  static instance;
  constructor() {}

  // ----------------------------------------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataProvider();
    }

    return this.instance;
  }

  getRequestUrl(opts) {
    //: { baseUrl?: string; path?: string }
    const urlPath = opts?.path ?? "";
    return [opts?.baseUrl ?? BASE_URL, urlPath].join("/");
  }

  async send(opts) {
    //  baseUrl?: string;
    // path: string;
    // method?: "get" | "post" | "put" | "patch" | "delete" | "options";
    // params?: Record<string | symbol | number, any>;
    // body?: any;
    // headers?: Record<string | symbol | number, any>;
    // configs?: object;

    const {
      baseUrl,
      path,
      method = "get",
      params = {},
      body: data,
      headers,
      configs,
    } = opts;
    const requestUrl = this.getRequestUrl({ baseUrl, path });
    const props = {
      url: requestUrl,
      method,
      params,
      data,
      headers,
      paramsSerializer: { serialize: (p) => stringify(p) },
      ...configs,
    };

    const response = await axios.request(props);
    return response;
  }

  async get(opts) {
    const { configs, ...rest } = opts;
    const response = await this.send({ ...rest, method: "get", configs });
    return response;
  }
  async post(opts) {
    const { configs, ...rest } = opts;
    const response = await this.send({ ...rest, method: "post", configs });
    return response;
  }

  async put(opts) {
    const { configs, ...rest } = opts;
    const response = await this.send({ ...rest, method: "put", configs });
    return response;
  }

  async patch(opts) {
    const { configs, ...rest } = opts;
    const response = await this.send({ ...rest, method: "patch", configs });
    return response;
  }

  async delete(opts) {
    const { configs, ...rest } = opts;
    const response = await this.send({ ...rest, method: "delete", configs });
    return response;
  }
}
