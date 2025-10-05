export const EVENT_CATEGORIES = Symbol('IEventCategoriesRepository');
export interface IEventCategoriesRepository {
  findAll();
}
