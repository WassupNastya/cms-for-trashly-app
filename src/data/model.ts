import { ShorthandPropertyAssignment } from 'typescript';

export interface Action {
  type: string;
  data?: any;
}

export interface Location {
  id: string;
  displayName: string;
  latitude: number;
  longitude: number;
  state: string;
  county: string;
  country: string;
  defaultZoomLevel: number;
  locationCode: string;
}

export interface ItemsItem {
  id: string;
  name: string;
  group: string;
  properties: string[];
}

export interface ItemsGroup {
  id: string;
  name: string;
}

export interface ItemsProperty {
  id: string;
  name: string;
}

export interface RuleForItem {
  item: string;
  location: string;
  description: string;
  id: string;
}

export interface RuleForGroup {
  id: string;
  location: string;
  description: string;
  group: string;
}

export interface RuleForCategory {
  id: string;
  category: string;
  description: string;
  location: string;
  // { [key: string]: boolean } TODO: handle properties
}

export interface DecisionForItem {
  decisionNameType: string;
  item: string;
  location: string;
  name: string;
  priority: string;
  id: string;
}

export interface DecisionForGroup {
  description: string;
  group: string;
  location: string;
  name: string;
  id: string;
}

export interface DecisionForProperties {
  // { [key: string]: boolean } TODO: handle properties
  decisionNameType: string;
  location: string;
  name: string;
  priority: string;
  id: string;
}
