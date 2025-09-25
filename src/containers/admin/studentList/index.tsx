import React, { Fragment } from "react";

import Search from "./search";
import Table from "./table";

const StudentListContainer = () => {
  return (
    <Fragment>
      <Search />
      <Table />
    </Fragment>
  );
};

export default StudentListContainer;
