declare namespace Param {
  export type Common = {
    page?: number;
    limit?: number;
  };

  export interface GetListClass extends Common {
    name?: string;
  }

  export interface GetListClassStudent {
    class_id: number;
  }
  export interface GetListStudent extends Common {
    name?: string;
    exclude_class_id?: number;
    only_in_class_id?: number;
  }

  export interface GetListExam extends Common {
    name?: string;
    include_questions?: boolean;
  }

  export interface GetListQuestion extends Common {
    name?: string;
    exam_id?: number;
  }
}
