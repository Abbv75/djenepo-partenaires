// Query keys — used to uniquely identify and cache queries
export const blogKeys = {
  all: ['blogs'] as const,
  list: () => [...blogKeys.all, 'list'] as const,
  detail: (id: number) => [...blogKeys.all, 'detail', id] as const,
  byCategory: (categoryId: number) => [...blogKeys.all, 'byCategory', categoryId] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
  detail: (id: number) => [...categoryKeys.all, 'detail', id] as const,
};

export const serviceKeys = {
  all: ['services'] as const,
  list: () => [...serviceKeys.all, 'list'] as const,
};
