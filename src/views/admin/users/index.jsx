import { useDocumentTitle } from "hooks";
import React from "react";
import { withRouter } from "react-router-dom";

const Users = () => {
  useDocumentTitle('Users List | Salinaka Admin');
}
export default withRouter(Users);