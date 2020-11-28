import { db } from 'database';

import { Location } from './model';

export const getLocations = () => {
  return db
    .collection('locations')
    .get()
    .then((response) =>
      response.docs.map<Location>((x) => {
        const location = x.data() as Location;
        location.id = x.id;
        return location;
      })
    )
    .catch((error) => console.log(error));
};
