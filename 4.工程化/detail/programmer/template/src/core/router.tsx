import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "../config/routes";


export default function() {
  const route = useRoutes(routes);

  return (
    <BrowserRouter>
      {route}
    </BrowserRouter>
  )
}