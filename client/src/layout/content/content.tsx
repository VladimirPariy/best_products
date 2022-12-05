import Sidebar from "components/sidebar/sidebar";
import {useScreenWidth} from "lib/hooks/use-screen-width";
import React, {FC} from "react";

const Content: FC = () => {
  const userScreenWidth = useScreenWidth()
  return (
    <>
    <div>
      Content
    </div>
      {
        userScreenWidth <= 768 ? null :
          <Sidebar/>
      }
    </>
  );
};

export default Content;