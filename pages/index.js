import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "receta" });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  const myRecipes = recipes.map((recipe) => (
    <RecipeCard key={recipe.sys.id} recipe={recipe} />
  ));
  return <div className="row justify-content-center ">{myRecipes}</div>;
}
