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

export interface Item {
  id: string;
  name: string;
  group: string;
  category: string;
  properties: string[];
}

export interface Group {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  name: string;
}
export interface Rule {
  id: string;
  item?: string;
  group?: string;
  category?: string;
  location: string;
  description: string;
  // { [key: string]: boolean } TODO: handle properties
}
export interface RuleView {
  id: string;
  ruleFor: string;
  type: number;
  location: string;
  description: string;
  // { [key: string]: boolean } TODO: handle properties
}

export interface Decision {
  id: string;
  item?: string;
  group?: string;
  category?: string;
  location: string;
  description: string;
  priority: string;
  name: string;
  decisionNameType: string;
  // { [key: string]: boolean } TODO: handle properties
}

export interface DecisionView {
  id: string;
  decisionFor: string;
  type: number;
  location: string;
  description: string;
  priority: string;
  name: string;
  decisionNameType: string;
  // { [key: string]: boolean } TODO: handle properties
}
