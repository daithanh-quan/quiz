import React, { Fragment } from "react";

import Search from "./search";
import Table from "./table";

const QuestionListContainer = () => {
  return (
    <Fragment>
      <Search />
      <Table />
    </Fragment>
  );
};

export default QuestionListContainer;
