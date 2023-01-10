import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSetParam = (
  condition: boolean,
  param: { [index: string]: unknown }
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let title: string;
  let value: unknown;
  for (const item in param) {
    title = item;
    value = param[item] as string;
  }

  useEffect(() => {
    if (condition) {
      searchParams.set(`${title}`, `${value}`);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(`${title}`);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};
