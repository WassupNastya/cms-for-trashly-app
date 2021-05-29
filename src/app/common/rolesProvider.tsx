import React, { ReactNode, useContext } from 'react';
import { Role } from 'data/enums';

interface RolesContextProps {
  isAdmin: boolean;
  isEditor: boolean;
  isViewer: boolean;
}

const RolesContext = React.createContext<RolesContextProps>({
  isAdmin: false,
  isEditor: false,
  isViewer: true,
});

interface RolesProviderProps {
  role: string;
  children?: ReactNode;
}

export const RolesProvider = (props: RolesProviderProps) => {
  const isAdmin = props.role === Role.Admin;
  const isEditor = props.role === Role.Editor;
  const isViewer = props.role === Role.Viewer;

  return (
    <RolesContext.Provider value={{ isAdmin, isEditor, isViewer }}>
      {props.children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => useContext(RolesContext);
