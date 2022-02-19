/**
 * @interface IMainRequestExtras
 */
export interface IMainRequestExtras {
  method: string;
  path: string;
  [key: string]: any;
}

/**
 * @interface IMainRequestResponse
 */
export interface IMainRequestResponse {
  version: string;
  repository: string;
  author: {
    name: string;
    github: string;
  };
  status: string;
  date: Date | string | number;
}
