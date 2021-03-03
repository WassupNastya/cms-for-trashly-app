import { db } from 'database';

import { handleObject } from './converters';
import { isEmpty } from './helper';

export const get = <T>(collectionName: string) => {
  return (id: string) => {
    return db
      .collection(collectionName)
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data() as T;
        return data;
      })
      .catch((error) => console.log(error));
  };
};

export const getAll = <T>(collectionName: string) => {
  return () => {
    return db
      .collection(collectionName)
      .get()
      .then((response) =>
        response.docs.map<T>((x) => {
          const data = x.data();
          data.id = x.id;
          return data as T;
        })
      )
      .catch((error) => console.log(error));
  };
};

export const create = <T>(collectionName: string, needHandling?: boolean) => {
  return (data) => {
    const id = !isEmpty(data.id)
      ? data.id
      : db.collection(collectionName).doc().id;
    return db
      .collection(collectionName)
      .doc(id)
      .set(
        needHandling
          ? handleObject<T>({ ...data, id })
          : {
              ...data,
              id,
            }
      )
      .then(() => id)
      .catch((error) => console.log(error));
  };
};

export const deleteRequest = (collectionName: string) => {
  return (id: string) =>
    db
      .collection(collectionName)
      .doc(id)
      .delete()
      .then(() => id)
      .catch((error) => console.log(error));
};
