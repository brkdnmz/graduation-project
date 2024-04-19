"use client";

import jsCookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRevalidateSession } from "~/hooks/use-session";
import { api } from "~/trpc/react";
import { GenericAuthForm } from "../_components/generic-auth-form";

const signupFormSchema = z
  .object({
    email: z.string().email("Must be a valid email").trim(),
    username: z.string().min(1, "Must not be empty").trim(),
    password: z.string().min(1, "Must not be empty"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupFormSchema>;

export default function Signup() {
  const signUp = api.auth.signUp.useMutation();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const login = api.session.login.useMutation();
  const revalidateSession = useRevalidateSession();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    signUp.mutate(
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      {
        onSuccess: () => {
          void trpcUtils.user.getAll.invalidate();

          login.mutate(
            {
              emailOrUsername: data.email,
              password: data.password,
            },
            {
              onSuccess: ({ accessToken, expiresAt }) => {
                jsCookie.set("access_token", accessToken, {
                  expires: expiresAt,
                });

                void revalidateSession();
                // TODO: Redirect to previous page
                router.push("/");
              },
              onError: (error) => {
                alert(error.message);
              },
            },
          );
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  return (
    <GenericAuthForm
      inputFields={[
        { name: "email", label: "Email", type: "email" },
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        {
          name: "confirmPassword",
          label: "Confirm password",
          type: "password",
        },
      ]}
      onSubmit={onSubmit}
      submitButtonText="Sign Up"
      zodFormSchema={signupFormSchema}
      footer={
        <>
          {"Have an account? "}
          <Link href="/auth/login" className="text-blue-400">
            Log in
          </Link>
          .
        </>
      }
    />
  );
}
