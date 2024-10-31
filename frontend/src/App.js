
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import NavRoot from "./pages/NavRoot";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteAction,
} from "./pages/EventDetailPage";
import EditEventPage, {
  action as eventEditAction,
  loader as editEventDetail,
} from "./pages/EditEventPage";
import NewEventPage, { action as addEvents } from "./pages/NewEventPage";
import { loader as allEventLoader } from "./pages/EventsPage";
import ErrorPage from "./pages/ErrorPage";
import NewsLetterPage, {
  action as newsletterAction,
} from "./pages/Newsletter (1)";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <NavRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: allEventLoader,
          },
          {
            path: ":eventId",
            element: <EventDetailPage />,
            loader: eventDetailLoader,
            action: deleteAction,
          },
          {
            path: ":eventId/edit",
            element: <EditEventPage />,
            action: eventEditAction,
            loader: editEventDetail,
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: addEvents,
          },
        ],
      },
    ],
  },
  {
    path: "newsletter",
    element: <NewsLetterPage />,
    action: newsletterAction,
  },
]);

function App() {
  return <RouterProvider router={Route}></RouterProvider>;
}

export default App;
