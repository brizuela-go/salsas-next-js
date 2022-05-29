import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Skeleton from "../../components/Skeleton";
import Head from "next/head";
import { MDBBadge } from "mdb-react-ui-kit";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "receta",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "receta",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { recipe: items[0] },
    revalidate: 1,
  };
};

export default function RecipeDetails({ recipe }) {
  if (!recipe) return <Skeleton />;

  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  return (
    <>
      <Head>
        <title>Las Salsas | {title}</title>
      </Head>
      <div className="animate__animated animate__fadeIn">
        <img className="mask" src={"https:" + featuredImage.fields.file.url} />
        <div className="mask" />

        <h2 className="text-white text-center display-1 fw-bolder salsa-title">
          {title}
        </h2>

        <div className="info">
          <h4>
            <i className="fas fa-stopwatch fa-lg "></i>
            {"  "}
            {cookingTime} minutos
          </h4>

          {ingredients.map((ing) => (
            <span
              key={ing}
              className={`me-2 badge badge-ingredient rounded-pill ${ing
                .toLowerCase()
                .split(" ")
                .join("-")}`}
            >
              {ing}
            </span>
            // <span key={ing}>{ing}</span>
          ))}
        </div>

        <div className="method">
          <div>{documentToReactComponents(method)}</div>
        </div>
      </div>
    </>
  );
}
