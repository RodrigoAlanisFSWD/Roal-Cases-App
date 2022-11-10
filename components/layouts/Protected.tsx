import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import * as authTypes from "../../redux/types/auth";
import { useRouter } from "next/router";
import { AppStore } from "../../redux/store";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected: FC<ProtectedProps> = ({ children }) => {
  const state = useSelector((store: AppStore) => store.auth.state);

  const router = useRouter();

  useEffect(() => {
    if (state === authTypes.UNAUNTHENTICATED) {
      router.push("/sign-in");
    }
  }, [state]);

  if (state === authTypes.AUTHENTICATED) {
    return children;
  }

  return <></>;
};
