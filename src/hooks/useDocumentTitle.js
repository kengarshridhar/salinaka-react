import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Salinaka | eCommerce';
    }
  }, [title]);
};

export default useDocumentTitle;
