import React, {FC, ReactNode} from "react";

interface Props {
  children:ReactNode
}

const AllCommentsWrapper: FC<Props> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default AllCommentsWrapper;