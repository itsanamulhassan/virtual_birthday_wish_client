import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import i18n from "./i18n";

import { RouterProvider } from "react-router-dom";
import routers from "./routers/routers";

function App() {
  return (
    <Suspense fallback="Loading...">
      <HelmetProvider>
        <Helmet
          htmlAttributes={{
            lang: i18n.language,
          }}
        >
          <title>Birthday Celebration</title>
          <link
            rel="shortcut icon"
            href="/favicon.png"
            type="image/x-icon"
          ></link>
        </Helmet>
        <RouterProvider router={routers} />
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
