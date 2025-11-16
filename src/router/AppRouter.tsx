import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import MarkdownReader from "../components/MarkdownReader";
import SqlProcedureGenerator from "../extensions/proc-generator/ProcGenerator";
import HomePage from "../pages/HomePage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "lesson/:lesson/:slug",
        element: <MarkdownReader />,
      },

      {
        path: "tools/proc-generator",
        element: <SqlProcedureGenerator />,
      },
    ],
  },
]);
