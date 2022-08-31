import { useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React from 'react';

const PageNotFound = ({ history }) => {
  useScrollTop();
  window.document.title = "Salinaka | Not Found";

  return (
    <div className="page-not-found">
      <h1>:( Page you are looking for doesn&apos;t exists.</h1>
      <br />
      <button
        className="button"antd
        onClick={history.goBack}
        type="button"
      >
        Go back
      </button>
    </div>
  );
};

PageNotFound.propTypes = {
  history: PropType.shape({
    goBack: PropType.func
  }).isRequired
};

export default PageNotFound;
