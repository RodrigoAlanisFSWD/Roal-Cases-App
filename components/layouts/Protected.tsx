import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import * as authTypes from "../../store/types/auth";
import { useRouter } from "next/router";

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected: FC<ProtectedProps> = ({ children }) => {
  const state = useSelector((store: StoreState) => store.auth.state);

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
