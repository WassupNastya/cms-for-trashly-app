import {
  getItemsAsync,
  getGroupsAsync,
  getCategoriesAsync,
  getPropertiesAsync,
  getRulesAsync,
  getDecisionsAsync,
  getLocationsAsync,
  getUsersAsync,
} from 'data/actions';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface UseDataProps {
  setLoading?: (value: boolean) => void;
  needEffect?: boolean;
}

export const useItems = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getItems = useCallback(() => {
    setLoading?.(true);
    dispatch(getItemsAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getItems();
  }, [needEffect, getItems]);

  return getItems;
};

export const useGroups = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getGroups = useCallback(() => {
    setLoading?.(true);
    dispatch(getGroupsAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getGroups();
  }, [needEffect, getGroups]);

  return getGroups;
};

export const useCategories = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getCategories = useCallback(() => {
    setLoading?.(true);
    dispatch(getCategoriesAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getCategories();
  }, [needEffect, getCategories]);

  return getCategories;
};

export const useProperties = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getProperties = useCallback(() => {
    setLoading?.(true);
    dispatch(getPropertiesAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getProperties();
  }, [needEffect, getProperties]);

  return getProperties;
};

export const useRules = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getRules = useCallback(() => {
    setLoading?.(true);
    dispatch(getRulesAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getRules();
  }, [needEffect, getRules]);

  return getRules;
};

export const useDecisions = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getDecisions = useCallback(() => {
    setLoading?.(true);
    dispatch(getDecisionsAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getDecisions();
  }, [needEffect, getDecisions]);

  return getDecisions;
};

export const useLocations = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getLocations = useCallback(() => {
    setLoading?.(true);
    dispatch(getLocationsAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getLocations();
  }, [needEffect, getLocations]);

  return getLocations;
};

export const useUsers = ({ setLoading, needEffect }: UseDataProps) => {
  const dispatch = useDispatch();

  const getUsers = useCallback(() => {
    setLoading?.(true);
    dispatch(getUsersAsync(setLoading));
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (needEffect) getUsers();
  }, [needEffect, getUsers]);

  return getUsers;
};
