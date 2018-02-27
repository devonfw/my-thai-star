export const config: any = {
  pageSizes: [8, 16, 24],
  pageSizesDialog: [4, 8, 12],
  roles: [
    { name: 'CUSTOMER', permission: 0 },
    { name: 'WAITER', permission: 1 },
  ],
  langs: [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'हिन्दी', value: 'hi' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Français', value: 'fr' },
    { label: 'Polski', value: 'pl' },
    { label: 'Nederlands', value: 'nl' },
    { label: 'Русский', value: 'ru' },
    { label: 'български', value: 'bg' },
    { label: 'Català', value: 'ca' },
  ],
};

export enum BackendType {
  IN_MEMORY,
  REST,
  GRAPHQL,
}
