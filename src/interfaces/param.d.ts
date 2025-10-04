declare namespace Param {
  export type Common = {
    page?: number;
    limit?: number;
  };

  export interface GetListClass extends Common {
    name?: string;
  }
  export interface GetListStudent extends Common {
    name?: string;
  }

  export interface GetListExam extends Common {
    name?: string;
  }

  export interface GetListQuestion extends Common {
    name?: string;
  }
}
