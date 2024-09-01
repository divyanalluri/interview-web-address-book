export const EDUCATION = "Education";
export const WORK_EXPERIENCE = "Experience";
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

export type SortOrderType = typeof SORT_ORDER[keyof typeof SORT_ORDER];
