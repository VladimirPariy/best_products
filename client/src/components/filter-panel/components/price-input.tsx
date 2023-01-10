import React, { ChangeEvent, FC } from "react";
import "components/filter-panel/components/price-input.module.scss";

interface Props {
  title: string;
  value: number;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PriceInput: FC<Props> = ({ changeHandler, value, title }) => {
  return (
    <input type="number" name={title} value={value} onChange={changeHandler} />
  );
};

export default PriceInput;
