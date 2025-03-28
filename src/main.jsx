import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading.jsx";
import LoadingWrapper from "./components/LoadingWrapper.jsx";
import Launchpad from "./pages/leaderboard/Launchpad.tsx";

// Lazy load the components
const Home = lazy(() => import("./pages/Home/HomePage.jsx"));
const LeaderboardPage = lazy(() => import("./pages/leaderboard/Launchpad.tsx"));
const Leader = lazy(() => import("./pages/Test_Temp/Leader.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/leaderboard/:cluster",
    element: (
      <Suspense fallback={<Loading />}>
        <LeaderboardPage />
      </Suspense>
    ),
  },
  {
    path: "/leader",
    element: (
      <Suspense fallback={<Loading />}>
        <Leader />
      </Suspense>
    ),
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingWrapper>
      <RouterProvider router={router} />
    </LoadingWrapper>
  </StrictMode>
);
