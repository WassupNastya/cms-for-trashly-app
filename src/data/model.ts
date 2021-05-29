import { LocationForDownload } from './location/download';
import { ItemForDownload } from './item/download';
import { RuleForDownload } from './rule/download';
import { DecisionForDownload } from './decision/download';

export interface Action {
  type: string;
  data?: any;
}

export interface Location {
  id: string;
  name: string;
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
  name: string;
  item?: string;
  group?: string;
  category?: string;
  location: string;
  description: string;
  properties: string[];
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

export interface TrashHunterItem {
  item: string;
  name: string;
  id: string;
}

export interface TrashHunterGroup {
  group: string;
  name: string;
  id: string;
}
export interface DataForDownload {
  locations: LocationForDownload[];
  items: ItemForDownload[];
  rules: RuleForDownload[];
  decisions: DecisionForDownload[];
  trashHunter: (TrashHunterItem | TrashHunterGroup)[];
}

export interface UserData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}