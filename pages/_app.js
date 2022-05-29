import "../styles/globals.css";
import Layout from "../components/Layout";
import "animate.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
