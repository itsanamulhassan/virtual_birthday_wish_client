import { createBrowserRouter, Outlet } from "react-router-dom";
import { BubblyContainer } from "react-bubbly-transitions";
import StepOne from "@/pages/StepOne";
import StepTwo from "@/pages/StepTwo";

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BubblyContainer
          colors={["#FF5733", "#33FF57", "#3357FF"]} // Set animation background colors
          duration={1500} // Set duration of the animation
        />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <StepOne /> }, // Use `index: true` for the default route
      { path: "2", element: <StepTwo /> },
    ],
  },
]);

export default router;
