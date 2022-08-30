import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { User } from "../models/user";
import api from "../plugins/axios";
import { useEffect, useState } from "react";
import { useUserService } from "../services/userService";
import { Protected } from "../components/layouts/Protected";
import { Profile } from "../components/pages/Profile";

const ProfilePage: NextPage = () => {
  return (
    <Protected>
      <Profile />
    </Protected>
  );
};

export default ProfilePage;
