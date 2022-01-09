/* eslint import/prefer-default-export: "off" */
export function toCamelCase(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
