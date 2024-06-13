export const contestCategories = ["ongoing", "upcoming", "ended"] as const;

export type ContestCategory = (typeof contestCategories)[number];
