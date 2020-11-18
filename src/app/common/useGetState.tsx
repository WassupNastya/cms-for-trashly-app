import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useGetState = (
  items: JSX.Element,
  groups: JSX.Element,
  categories: JSX.Element,
  properties: JSX.Element,
  mainPath: string
) => {
  const location = useLocation();
  const currentPath = useMemo(() => location.pathname, [location]);

  return useMemo(() => {
    if (currentPath === mainPath || currentPath.endsWith('/items'))
      return items;
    else if (currentPath.endsWith('/groups')) return groups;
    else if (currentPath.endsWith('/categories')) return categories;
    else if (currentPath.endsWith('/properties')) return properties;
  }, [currentPath]);
};
