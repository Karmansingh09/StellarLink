import { useEffect } from 'react';

export function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | StellarLink Enterprise`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
  }, [title, description]);
}

export default useDocumentTitle;
