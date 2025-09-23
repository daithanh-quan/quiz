declare namespace Param {
  export type Common = {
    page?: number;
    limit?: number;
  };

  export interface GetListClass extends Common {
    name?: string;
  }
}
