import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  const [time, setTime] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
    setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Esa página no está disponible :(</h2>
      <p>
        Redireccionando en {time} a{" "}
        <Link href="/">
          <a>Página de Inicio</a>
        </Link>{" "}
        para ver más salsas...
      </p>

      <style jsx>{`
        .not-found {
          background: #fff;
          padding: 30px;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          transform: rotateZ(-1deg);
        }
        h1 {
          font-size: 3em;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
