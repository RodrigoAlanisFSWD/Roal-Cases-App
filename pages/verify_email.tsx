import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Protected } from "../components/layouts/Protected";
import { VerifyEmail } from "../components/pages/VerifyEmail";
import { User } from "../models/user";
import { AppStore } from "../redux/store";


const VerifyEmailPage: NextPage = () => {

    const user = useSelector((store: AppStore) => store.auth.profile)

    const router = useRouter();
  
    useEffect(() => {
       if (user) {
        if (user?.mail_confirmed) {
            router.push("/profile")
        }
       }
    }, []);

    return (
        <Protected>
            <VerifyEmail />
        </Protected>
    )
}

export default VerifyEmailPage;