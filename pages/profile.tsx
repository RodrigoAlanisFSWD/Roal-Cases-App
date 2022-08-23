import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { User } from "../models/user";
import api from "../plugins/axios";

interface ProfileProps {
  user: User;
}

const ProfilePage: NextPage<ProfileProps> = ({ user }) => {
  return <div>{user.email}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  const { data } = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${cookies["roal_cases/access_token"]}`,
    },
  });

  return {
    props: {
      user: data,
    },
  };
};

export default ProfilePage;
