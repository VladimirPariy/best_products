interface IStyles {
  [index: string]: string;
}

export const addTwoClassNames = (styles: IStyles, firstClass: string, secondClass: string): string => {
  return [styles[firstClass], styles[secondClass]].join(' ');
}