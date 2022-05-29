import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <Image href="/" src="/las-salsas.png" width={537} height={255} />
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2022 Las Salsas</p>
      </footer>
    </div>
  );
}
