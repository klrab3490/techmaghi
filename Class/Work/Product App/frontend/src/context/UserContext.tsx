import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  products: any[];
  fetchProducts: () => Promise<void>;
  fetchProductData: (id: string) => Promise<any>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Environment variable naming fix for Vite
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  // ✅ Restore user from localStorage when app reloads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${backend}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("✅ Login successful:", data);

      setUser(data.user);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error; // so UI can display an error
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${backend}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("✅ Registration successful:", data);
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${backend}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${backend}/api/products/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("✅ Products fetched:", data);
      setProducts(data);
    } catch (error) {
      console.error("❌ Fetch products error:", error);
    }
  };

  const fetchProductData = async (id: string) => {
    try {
      const response = await fetch(`${backend}/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      console.log("✅ Product data fetched:", data);
      return data;
    } catch (error) {
      console.error("❌ Fetch product data error:", error);
      throw error;
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, products, fetchProducts, fetchProductData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within a UserProvider");
  return context;
};
