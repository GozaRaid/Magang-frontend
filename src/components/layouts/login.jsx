import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePostAuth } from "@/features/auth/usePostAuth";
import { useAuth } from "@/features/auth/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function Login() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const mutation = usePostAuth();
  const [loginfailed, setLoginFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const username = event.target.username.value;
    const password = event.target.password.value;

    mutation.mutate(
      { username, password },
      {
        onError: (error) => {
          setLoginFailed(error.message);
          setIsLoading(false);
        },
        onSuccess: (data) => {
          login(data.data.accessToken);
          router.push("/admin/dashboard");
        },
      }
    );
  };

  return (
    <Card className="max-w-sm mx-auto bg-background">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="JohnDoe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="**********"
            />
          </div>
          {loginfailed && (
            <p className="text-sm text-red-500">
              Username or Password is incorrect
            </p>
          )}
          <div></div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-950"
            disabled={isLoading}
          >
            {isLoading ? "Logging in" : "Login"}
          </Button>
        </form>
        <div className="pt-3 text-sm text-center text-grey-dark">
          Go to homepage?{" "}
          <Link
            href="/"
            className="font-bold no-underline text-blue"
            prefetch={false}
          >
            Homepage.
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
