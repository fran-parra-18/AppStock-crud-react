import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateProducts from "./pages/createProducts/CreateProducts";
import ShowProducts from "./pages/table/ShowProducts";

export const AppRouter = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ShowProducts/>} />
                <Route path="/create" element={<CreateProducts/>} />
            </Routes>

    );
}


