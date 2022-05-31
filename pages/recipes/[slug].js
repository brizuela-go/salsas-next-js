import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";
import Head from "next/head";

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

  const {
    featuredImage,
    title,
    cookingTime,
    ingredients,
    method,
    descripcion,
    slug,
  } = recipe.fields;

  return (
    <>
      <Head>
        <title>Las Salsas | {title}</title>
        <meta charset="utf-8" />
        <meta name="description" content={descripcion} />
        <meta name="image" content={"https:" + featuredImage.fields.file.url} />
        <meta itemprop="name" content={`Las Salsas | ${title}`} />
        <meta itemprop="description" content={descripcion} />
        <meta
          itemprop="image"
          content={"https:" + featuredImage.fields.file.url}
        />
        <meta property="og:title" content={`Las Salsas | ${title}`} />
        <meta property="og:description" content={descripcion} />
        <meta
          property="og:image"
          content={"https:" + featuredImage.fields.file.url}
        />
        <meta
          property="og:url"
          content={"https://las-salsas.vercel.app/recipes/" + slug}
        />
        <meta property="og:site_name" content={`Las Salsas | ${title}`} />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`Las Salsas | ${title}`} />
        <meta property="twitter:description" content={descripcion} />
        <meta
          property="twitter:image:src"
          content={"https:" + featuredImage.fields.file.url}
        />
      </Head>
      <img className="mask" src={"https:" + featuredImage.fields.file.url} />
      <div className="mask" />
      <div className="mb-11 mb-lg-12 mb-md-14 mb-sm-11 " />
      <h2 className="text-white text-center display-1 fw-bolder salsa-title">
        {title}
      </h2>
      <div className="mb-14 mb-lg-10 mb-md-14 " />
      ‎
      <div className="mb-sm-9 mb-14 mb-lg-0 mb-md-14" />
      ‎
      <div className="mb-md-12" />
      <div className="info">
        <h4 className="mb-4">
          <i className="fas fa-stopwatch fa-lg "></i>
          {"  "}
          {cookingTime} minutos
        </h4>

        {ingredients.map((ing) => (
          <span
            key={ing}
            className={`me-2 badge badge-ingredient rounded-pill p-2 my-2 ${ing
              .toLowerCase()
              .split(" ")
              .join("-")}`}
          >
            {ing}
          </span>
          // <span key={ing}>{ing}</span>
        ))}
      </div>
      <div className="method mt-5">
        <div>{documentToReactComponents(method)}</div>
      </div>
    </>
  );
}
