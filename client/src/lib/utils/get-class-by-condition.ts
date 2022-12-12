interface CSSModuleType {
  [index: string]: string;
}

type getClassNameType = (
  CSSModule: CSSModuleType,
  mainClass: string,
  extraClass: string,
  condition: boolean,
  secondExtraClass?: string
) => string;

export const getClassNameByCondition: getClassNameType = (
  CSSModule,
  mainClass,
  extraClass,
  condition,
  secondExtraClass = ''
) => {
  return `${CSSModule[mainClass]} ${condition ? CSSModule[extraClass] : CSSModule[secondExtraClass]}`;
};
