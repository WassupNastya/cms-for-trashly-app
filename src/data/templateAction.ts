import { Action } from './model';

export const getAll: (
  type: string
) => (setLoading?: (value: boolean) => void) => Action = (type) => {
  return (setLoading) => {
    return { type, setLoading };
  };
};

export const setAll: <T>(type: string) => (data: T[]) => Action = (type) => {
  return (data) => {
    return { type, data };
  };
};

export const get: <T>(
  type: string
) => (id: string, onResponseCallback: (response: T) => void) => Action = (
  type
) => {
  return (id, onResponseCallback) => {
    return { type, id, onResponseCallback };
  };
};

export const create: <T>(
  type: string
) => (data: T, onResponseCallback: (response: string) => void) => Action = (type) => {
  return (data, onResponseCallback) => {
    return { type, data, onResponseCallback };
  };
};

export const deleteAction: (type: string) => (id: string) => Action = (
  type
) => {
  return (id) => {
    return { type, id };
  };
};
