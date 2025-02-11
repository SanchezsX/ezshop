import { Bot } from "@/modules/Bot/page";
import { Categories } from "@/modules/Categories/page";
import { CreateGood } from "@/modules/CreateGood/page";
import { CreateShop } from "@/modules/CreateShop/page";
import { CreateShopHint } from "@/modules/CreateShopHint/page";
import { Goods } from "@/modules/Goods/page";
import { Main } from "@/modules/Main/page";
import { Orders } from "@/modules/Orders/page";
import { Settings } from "@/modules/Settings/page";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { EditGood } from "@/modules/EditGood/page.tsx";
import { CreateCategory } from "@/modules/CreateCategory/page.tsx";
import { EditCategory } from "@/modules/EditCategory/page.tsx";
import { DetailOrder } from "@/modules/DetailOrder/page.tsx";
import { AuthError } from "@/modules/AuthError/page.tsx";
import { RPP } from "@/modules/RPP/page.tsx";
import { useEffect } from "react";

export function Router() {
  const loc = useLocation();
  const navigate = useNavigate();

  console.log("@loc", loc);

  useEffect(() => {
    if (loc.pathname === "/") navigate("/shop");
  }, []);

  return (
    <Routes>
      <Route path="/shop" element={<Main />} />
      <Route path="/create-shop" element={<CreateShop />} />
      <Route path="/create-shop/hint" element={<CreateShopHint />} />
      <Route path="/shop/:id" element={<Settings />} />
      <Route path="/shop/:id/goods" element={<Goods />} />
      <Route path="/shop/:id/goods/add" element={<CreateGood />} />
      <Route path="/shop/:id/goods/edit/:goodId" element={<EditGood />} />
      <Route path="/shop/:id/goods/edit" element={<RPP />} />
      <Route path="/shop/:id/categories" element={<Categories />} />
      <Route path="/shop/:id/categories/add" element={<CreateCategory />} />
      <Route
        path="/shop/:id/categories/edit/:categoryId"
        element={<EditCategory />}
      />
      <Route path="/shop/:id/categories/edit" element={<RPP />} />
      <Route path="/shop/:id/orders" element={<Orders />} />
      <Route path="/shop/:id/orders/:orderId" element={<DetailOrder />} />
      <Route path="/shop/:id/bot" element={<Bot />} />
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="auth-error" element={<AuthError />} />
    </Routes>
  );
}
