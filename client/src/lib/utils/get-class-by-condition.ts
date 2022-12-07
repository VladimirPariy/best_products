interface CSSModuleType {
  [index: string]: string;
}

type getClassNameType = (
  CSSModule: CSSModuleType,
  mainClass: string,
  extraClass: string,
  condition: boolean
) => string;

export const getClassNameByCondition: getClassNameType = (
  CSSModule,
  mainClass,
  extraClass,
  condition
) => {
  return `${condition ? CSSModule[mainClass] : CSSModule[extraClass]}`;
};
