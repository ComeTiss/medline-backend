export function enumToStrArr(enumeration: EnumType): Array<string> {
  const strArr: Array<string> = [];
  Object.keys(enumeration).forEach((key) => strArr.push(enumeration[key]));
  return strArr;
}

export type EnumType = { [s: string]: string };
