import { useAppSelector } from "lib/store/store-types";
import { selectAuth, selectUser } from "lib/store/user/user-selector";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useNavigateHome = () => {
  const auth = useAppSelector(selectAuth);
  const role = useAppSelector(selectUser).role;
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth || role !== 1) {
      navigate("/");
    }
  }, [auth, role, navigate]);
};
