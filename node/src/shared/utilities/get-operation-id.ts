export function GetOperationId(model: string, operation: string) {
  const _model = ToTitleCase(model).replace(/\s/g, '');
  const _operation = ToTitleCase(operation).replace(/\s/g, '');

  return {
    title: '',
    operationId: `${_model}_${_operation}`,
  };
}

function ToTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}
