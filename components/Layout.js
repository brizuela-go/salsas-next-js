import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [first, setfirst] = useState("");
  const [bar, setBar] = useState("");

  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setfirst("bg-light");
      setBar("text-dark");
    } else {
      setfirst("");
      setBar("text-white");
    }
  };

  typeof window !== "undefined" &&
    window.addEventListener("scroll", changeNavbarColor);

  return (
    <div className="layout">
      <Head>
        <title>Las Salsas</title>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <header>
        <nav
          className={`navbar navbar-expand-lg fixed-top navbar-scroll ${first}`}
        >
          <div className="container-fluid">
            <Link href="/">
              <a className="navbar-brand">
                <img src="/icon.png" width="80px" alt="las salsas logo" />
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className={`fas fa-bars ${bar}`}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto">
                <li className="nav-item me-2">
                  <button type="button" className="btn btn-light">
                    Acerca de
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-light">
                    CONTACT
                  </button>
                </li>
              </ul>
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item ms-4 me-3 me-lg-0">
                  <a
                    className="nav-link btn btn-floating d-flex justify-content-center btn-light"
                    href="https://www.facebook.com/Meditation-Aid-104520335561800/"
                    role="button"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2022 Las Salsas</p>
      </footer>

      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.1.0/mdb.min.js"
      ></script>
    </div>
  );
}
