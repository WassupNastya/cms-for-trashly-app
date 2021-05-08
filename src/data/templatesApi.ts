import { db } from 'database';

import { Collection, Exception, Response } from './enums';
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

export const create = (collectionName: string) => {
  return (data) => {
    const id = !isEmpty(data.id)
      ? data.id
      : db.collection(collectionName).doc().id;

    return db
      .collection(collectionName)
      .where('name', '==', data.name)
      .get()
      .then((response) => {
        if (response.size > 0) throw Exception.Duplicate;
        else
          db.collection(collectionName)
            .doc(id)
            .set({
              ...data,
              id,
            })
            .catch(() => Response.ServerError);
        return Response.Ok;
      })
      .catch((error) =>
        error === Exception.Duplicate
          ? Response.Duplicate
          : Response.ServerError
      );
  };
};

export const deleteRequest = (collectionName: string) => {
  return (id: string) =>
    db
      .collection(collectionName)
      .doc(id)
      .delete()
      .then(() => Response.Ok)
      .catch(() => Response.ServerError);
};

const checkDependencyError = (error) =>
  error === Exception.Dependency ? Response.Dependency : Response.ServerError;


export const checkForGroupDependency = () => {
  return (id: string) =>
    db
      .collection(Collection.Items)
      .where('group', '==', id)
      .get()
      .then((response) => {
        if (response.size > 0) throw Exception.Dependency;
        else
          db.collection(Collection.Rules)
            .where('group', '==', id)
            .get()
            .then((response) => {
              if (response.size > 0) throw Exception.Dependency;
              else
                db.collection(Collection.Decisions)
                  .where('group', '==', id)
                  .get()
                  .then((response) => {
                    if (response.size > 0) throw Exception.Dependency;
                    else return Response.Ok;
                  });
              return Response.Ok;
            })
            .catch(checkDependencyError);
        return Response.Ok;
      })
      .catch(checkDependencyError);
};

export const checkForCategoryDependency = () => {
  return (id: string) =>
    db
      .collection(Collection.Items)
      .where('categories', 'array-contains', id)
      .get()
      .then((response) => {
        if (response.size > 0) throw Exception.Dependency;
        else
          db.collection(Collection.Rules)
            .where('category', '==', id)
            .get()
            .then((response) => {
              if (response.size > 0) throw Exception.Dependency;
              else
                db.collection(Collection.Decisions)
                  .where('category', '==', id)
                  .get()
                  .then((response) => {
                    if (response.size > 0) throw Exception.Dependency;
                    else return Response.Ok;
                  });
              return Response.Ok;
            })
            .catch(checkDependencyError);
        return Response.Ok;
      })
      .catch(checkDependencyError);
};

export const checkForPropertyDependency = () => {
  return (id: string) =>
    db
      .collection(Collection.Items)
      .where('properties', 'array-contains', id)
      .get()
      .then((response) => {
        if (response.size > 0) throw Exception.Dependency;
        else
          db.collection(Collection.Rules)
            .where('properties', 'array-contains', id)
            .get()
            .then((response) => {
              if (response.size > 0) throw Exception.Dependency;
              else
                db.collection(Collection.Decisions)
                  .where('properties', 'array-contains', id)
                  .get()
                  .then((response) => {
                    if (response.size > 0) throw Exception.Dependency;
                    else return Response.Ok;
                  });
              return Response.Ok;
            })
            .catch(checkDependencyError);
        return Response.Ok;
      })
      .catch(checkDependencyError);
};

export const checkForItemDependency = () => {
  return (id: string) =>
    db
      .collection(Collection.Rules)
      .where('item', '==', id)
      .get()
      .then((response) => {
        if (response.size > 0) throw Exception.Dependency;
        else
          db.collection(Collection.Decisions)
            .where('item', '==', id)
            .get()
            .then((response) => {
              if (response.size > 0) throw Exception.Dependency;
              else return Response.Ok;
            })
            .catch(checkDependencyError);
        return Response.Ok;
      })
      .catch(checkDependencyError);
};
