export interface Filters {
    searchQuery: string | null,
    colors: string[],
    currency: string | null,
    minValue: string | null,
    maxValue: string | null,
    conditions: string[],
    categories: string[],
    tags: string[],
    acquiredFrom: string | null,
    acquiredTo: string | null,
    isPatented: string | null,
    sortBy: string | null,
    sortOrder: string | null,
}

