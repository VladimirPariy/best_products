import {appUrl} from "lib/enums/app-urls";
import React, {FC} from "react";
import {Link} from "react-router-dom";

interface Props {
}

const AdminPanel: FC<Props> = (props) => {
  return (
    <div>
      <Link to={appUrl.new_product}>
        Add new product
      </Link>

      <Link to={appUrl.users_table}>
        User control
      </Link>
    </div>
  );
};

export default AdminPanel;