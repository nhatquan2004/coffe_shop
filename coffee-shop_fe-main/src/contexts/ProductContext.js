import { createContext, useEffect, useState } from "react";
import { getAllMenus } from "../services/menuService";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("📥 Loading menus from menuService...");

        const result = await getAllMenus();
        console.log("✅ Response:", result);

        let menuData = [];
        if (result?.success && Array.isArray(result?.data)) {
          menuData = result.data;
        } else if (Array.isArray(result?.data)) {
          menuData = result.data;
        } else if (Array.isArray(result)) {
          menuData = result;
        }

        console.log("📊 Loaded menus:", menuData.length);
        setMenus(menuData);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider 
      value={{ 
        menus, 
        setMenus, 
        loading, 
        error
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
