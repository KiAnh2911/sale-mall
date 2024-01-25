import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/layouts/Layout";
import ProductList from "./pages/products";
import AuthRouter from "./pages/auth/router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="product" element={<ProductList />} />
        </Route>
        <Route path="auth/*" element={<AuthRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
