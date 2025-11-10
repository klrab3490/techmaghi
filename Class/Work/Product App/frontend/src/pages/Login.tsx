import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const { user, login, register } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Automatically redirect logged-in users
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      if (isLogin) {
        await login(email, password);
        console.log("✅ Login successful");
        navigate("/dashboard", { replace: true });
      } else {
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        await register(name, email, password);
        console.log("✅ Registration successful");
        setIsLogin(true); // Switch to login after successful registration
      }
    } catch (err: any) {
      console.error("❌ Error occurred:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <Card className="w-[360px] shadow-md border dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            {isLogin ? "Login" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Welcome back! Enter your credentials."
              : "Register a new account to start shopping."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Processing..."
                : isLogin
                  ? "Login"
                  : "Register"}
            </Button>
          </form>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          {isLogin ? (
            <>
              <p>Don’t have an account?</p>
              <Button
                variant="ghost"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
                disabled={loading}
              >
                Create one
              </Button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <Button
                variant="ghost"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
                disabled={loading}
              >
                Login
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
