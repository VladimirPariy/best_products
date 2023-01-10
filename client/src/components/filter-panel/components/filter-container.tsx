import React, { FC, ReactNode, useState } from "react";

import Arrow from "assets/icon/general/arrow";

interface Props {
  children: ReactNode;
  className: string;
  title?: string;
}

const FilterContainer: FC<Props> = ({ children, className, title }) => {
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={className}>
      <div onClick={openHandler}>
        <Arrow />
        <span>{title}</span>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default FilterContainer;
