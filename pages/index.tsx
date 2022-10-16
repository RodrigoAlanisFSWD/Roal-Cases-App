import { Home } from "../components/pages/Home";
import type { GetServerSideProps, NextPage } from "next";
import { Category } from "../models/category";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCategories } from "../redux/states/categories";
import { getCategories } from "../services/categoriesService";

interface HomeProps {
  categories: Category[]
}

const HomePage: NextPage<HomeProps> = ({ categories }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCategories(categories))
  }, [])

  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const categories = await getCategories()

  return {
    props: {
      categories,
    }
  }
}

export default HomePage;
