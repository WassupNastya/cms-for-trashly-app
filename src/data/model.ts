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
  categories: string[];
  properties: string[];
  aliases: string;
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
  properties: string[];
}
export interface RuleView {
  id: string;
  ruleFor: string;
  type: number;
  location: string;
  description: string;
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
  properties: string[];
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
}
