export enum Root {
  Items = '/items',
  Rules = '/rules',
  Decisions = '/decisions',
  Locations = '/locations',
  Users = '/users'
}

export enum Tab {
  Items = 'Item',
  Groups = "Group",
  Categories = "Category",
  Properties = "Property",
}

export enum Type {
  ForItem = 0,
  ForGroup,
  ForCategory,
  ForPropertiesOnly
}

export enum Collection {
  Items = 'items',
  Groups = 'groups',
  Categories = 'categories',
  Properties = 'properties',
  Rules = 'rules',
  Decisions = 'decisions',
  Locations = 'locations',
  Users = 'users'
}

export enum Response {
  Ok = '0',
  Duplicate = '1',
  ServerError = '2',
  Dependency = '3'
}

export enum Exception {
  Dependency = 'Dependency',
  Duplicate = 'Duplicate'
}

export enum MainTab {
  RecyclableItems = 0,
  Rules = 1,
  Decisions = 2,
  Locations = 3,
  Users = 4,
}

export enum Role {
  Viewer = 'Viewer',
  Editor = 'Editor',
  Admin = 'Administrator',
}
