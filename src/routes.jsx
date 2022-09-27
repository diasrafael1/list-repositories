import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error404";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repositorios/:repoName" element={<Repository />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
