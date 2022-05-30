import Link from "next/link";
import Image from "next/image";

export default function RecipeCard({ recipe }) {
  const { title, slug, cookingTime, thumbnail, descripcion } = recipe.fields;

  return (
    <div className="col-lg-4 col-md-6 my-5">
      <div className="card text-center ">
        <div
          className="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          <img
            src={"https:" + thumbnail.fields.file.url}
            className="img-fluid"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{descripcion}</p>
          <Link href={"/recipes/" + slug}>
            <button type="button" className="btn btn-primary">
              PREPARAR
            </button>
          </Link>
        </div>
        <div className="card-footer">
          <i className="fas fa-stopwatch fa-lg "></i>
          {"   "}
          {cookingTime} minutos
        </div>
      </div>

      <style jsx>{`
        .card {
          width: 21rem;
        }
      `}</style>
    </div>
  );
}
