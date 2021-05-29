import { createUserAsync } from 'data/actions';
import { Role } from 'data/enums';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

export const useNewUser = () => {
  const dispatch = useDispatch();

  const createNewUser = (user: firebase.auth.UserCredential) => {
    if (user.additionalUserInfo.isNewUser) {
      dispatch(
        createUserAsync({ id: '', name: user.user.email, role: Role.Viewer }, () => {})
      );
    }
  };

  return createNewUser;
};
