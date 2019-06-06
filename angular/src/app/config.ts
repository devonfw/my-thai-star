export const config: any = {
  pageSizes: [8, 16, 24],
  pageSizesDialog: [4, 8, 12],
  roles: [
    { name: 'CUSTOMER', permission: 0 },
    { name: 'WAITER', permission: 1 },
    { name: 'MANAGER', permission: 2 },
  ],
  langs: [
    { label: 'English', value: 'en' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Español', value: 'es' },
    { label: 'Català', value: 'ca' },
    { label: 'Français', value: 'fr' },
    { label: 'Nederlands', value: 'nl' },
    { label: 'हिन्दी', value: 'hi' },
    { label: 'Polski', value: 'pl' },
    { label: 'Русский', value: 'ru' },
    { label: 'български', value: 'bg' },
  ],
};

export enum BackendType {
  IN_MEMORY,
  REST,
  GRAPHQL,
}
