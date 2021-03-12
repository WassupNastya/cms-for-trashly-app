import React, { ReactNode, useCallback, useContext, useState } from 'react';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  filterItem: (value: string) => boolean;
}

const SearchContext = React.createContext<SearchContextProps>({
  searchValue: '',
  setSearchValue: () => {},
  filterItem: () => false,
});

interface SearchProviderProps {
  children?: ReactNode;
}

export const SearchProvider = (props: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filterItem = useCallback(
    (value: string) => value.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue]
  );

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, filterItem }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
