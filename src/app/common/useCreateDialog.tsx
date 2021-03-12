import { CategoryModal } from 'app/categories/categoryModal';
import { GroupModal } from 'app/groups/groupModal';
import { ItemModal } from 'app/items/itemModal';
import { PropertyModal } from 'app/properties/propertyModal';
import { Tab } from 'data/enums';
import React, { useCallback } from 'react';

import { useDialog } from './useDialog';

export const useCreateDialog = () => {
  const { show, hide, dialog } = useDialog();

  const getDialog = useCallback(
    (type: string, onChange: (name: string) => void) => {
      switch (type) {
        case Tab.Items:
          return <ItemModal hide={hide} onChangeSubItem={onChange} />;
        case Tab.Groups:
          return <GroupModal hide={hide} onChangeSubItem={onChange} />;
        case Tab.Categories:
          return <CategoryModal hide={hide} onChangeSubItem={onChange} />;
        default:
          return <PropertyModal hide={hide} onChangeSubItem={onChange} />;
      }
    },
    [hide]
  );

  return { show, dialog: dialog((_, type, onChange) => getDialog(type, onChange)) };
};
