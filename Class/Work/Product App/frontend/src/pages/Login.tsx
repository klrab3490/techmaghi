import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Login submitted")
    } else {
      console.log("Registration submitted")
    }
  }

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
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
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
              >
                Login instead
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
