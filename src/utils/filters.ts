export enum SortFilters {
  DEFAULT = 'DEFAULT',
  NAME = 'NAME',
  NAME_REVERSE = 'NAME_REVERSE',
  DATE_NEW_TO_OLD = 'DATE_NEW_TO_OLD',
  DATE_OLD_TO_NEW = 'DATE_OLD_TO_NEW',
}

export interface Filters {
  category: string;
  sort: SortFilters;
  brand: string[];
  color: string[];
  capacity: string[];
  popular: boolean;
}

export const initialState: Filters = {
  category: 'all',
  sort: SortFilters.DEFAULT,
  brand: [],
  color: [],
  capacity: [],
  popular: false,
};
