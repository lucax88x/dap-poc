import forEachObjIndexed from 'ramda/es/forEachObjIndexed';
import replace from 'ramda/es/replace';

export class Routes {
  static Home = '/';

  static Protocol = {
    Start: '/protocol/start/:propertyId',
    Resume: '/protocol/resume/:propertyId',
    Review: '/protocol/review/:propertyId'
  };

  static MapTo(route: string, params: { [key: string]: string }): string {
    // TODO: test & provide version with just value which replaces the first placeholder (error in case of multiple.)
    forEachObjIndexed(
      (value, key) => (route = replace(`:${key}`, value)(route)),
      params
    );
    return route;
  }
}
