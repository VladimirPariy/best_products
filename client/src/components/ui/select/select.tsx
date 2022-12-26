import React, {ChangeEvent, FC, ReactNode} from "react";
import styles from "components/ui/select/select.module.scss";

interface Props {
  labelTitle: string;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectDefaultValue: string;
  selectTitle: string;
  children: ReactNode
}

const Select: FC<Props> = (props) => {
  return (
    <label className={styles.label}>
      {props.labelTitle}
      <select
        onChange={props.changeHandler}
        defaultValue={props.selectDefaultValue}
      >
        <option value="0"
                disabled
                hidden>
          {props.selectTitle}
        </option>
        {props.children}
      </select>
    </label>
  );
};

export default Select;