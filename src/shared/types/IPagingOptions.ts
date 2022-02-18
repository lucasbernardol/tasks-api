/**
 * @interface IPagingOptions
 */
export interface IPagingOptions {
  page: number;
  limit: number;
  setRange?: boolean;
  max?: number;
  min?: number;
}
