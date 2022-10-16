import { NextPage } from "next";
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
