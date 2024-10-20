"use client";

import Link from "next/link";
import { z } from "zod";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePostUser } from "@/features/auth/usePostUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// Define the Zod validation schema
const registerValidationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  keyword: z.string().min(1, { message: "Keyword is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  reenterPassword: z
    .string()
    .min(1, { message: "Re-entering your password is required" }),
});

// Add custom validation for password match
registerValidationSchema.refine(
  (data) => data.password === data.reenterPassword,
  {
    message: "Passwords must match",
    path: ["reenterPassword"],
  }
);

export function Register() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const mutation = usePostUser();
  const [registerFailed, setRegisterFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && router.pathname !== "/") {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      const { username, password, keyword } = values;

      await mutation.mutateAsync({ username, password, keyword });
      login(data.data.accessToken);
      router.push("/admin/dashboard");
    } catch (error) {
      setRegisterFailed(error.message);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-sm mx-auto bg-background">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Create your account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            username: "",
            keyword: "",
            password: "",
            reenterPassword: "",
          }}
          validationSchema={toFormikValidationSchema(registerValidationSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John"
                  className="input-custom"
                />
                {errors.username && touched.username && (
                  <div className="text-red-500">{errors.username}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="**********"
                  className="input-custom"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reenterPassword">Re-Enter Password</Label>
                <Field
                  id="reenterPassword"
                  name="reenterPassword"
                  type="password"
                  placeholder="**********"
                  className="input-custom"
                />
                {errors.reenterPassword && touched.reenterPassword && (
                  <div className="text-red-500">{errors.reenterPassword}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Field id="keyword" name="keyword" className="input-custom" />
                {errors.keyword && touched.keyword && (
                  <div className="text-red-500">{errors.keyword}</div>
                )}
              </div>
              {registerFailed && (
                <div className="text-sm text-red-500">{registerFailed}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-950"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Registering" : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
        <div className="pt-3 text-sm text-center text-grey-dark">
          Already have an account?{" "}
          <Link
            href="login"
            className="font-bold no-underline text-blue"
            prefetch={false}
          >
            Sign in.
          </Link>
        </div>
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
