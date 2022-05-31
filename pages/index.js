import { createClient } from "contentful";
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { MDBInput } from "mdb-react-ui-kit";

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
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes
    .map((recipe) => <RecipeCard key={recipe.sys.id} recipe={recipe} />)
    .filter((recipe) =>
      recipe.props.recipe.fields.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="row justify-content-center ">
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Buscar una salsa"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="input-group-text border-0" id="search-addon">
          <i className="fas fa-search"></i>
        </span>
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="mt-5 text-center">
          <h2>Oops, ninguna salsa coincide con el nombre "{search}"</h2>
        </div>
      ) : (
        filteredRecipes
      )}
    </div>
  );
}
