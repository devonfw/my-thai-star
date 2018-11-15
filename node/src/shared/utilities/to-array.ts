export function EnumToArray(enumVariable: any): string[] {
  return Object.keys(enumVariable).map(key => enumVariable[key]);
}

export function FilterCategoriesToArray(list: { id: string }[]) {
  const result = [];
  list.forEach(element => {
    result.push(parseInt(element.id, 10));
  });
  return result;
}
