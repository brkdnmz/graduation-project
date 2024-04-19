"use client";

import jsCookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRevalidateSession } from "~/hooks/use-session";
import { api } from "~/trpc/react";
import { GenericAuthForm } from "../_components/generic-auth-form";

const loginFormSchema = z.object({
  emailOrUsername: z.string().min(1, "Must not be empty").trim(),
  password: z.string().min(1, "Must not be empty"),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function Login() {
  const login = api.session.login.useMutation();
  const router = useRouter();
  const revalidateSession = useRevalidateSession();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    login.mutate(
      {
        emailOrUsername: data.emailOrUsername,
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
  };

  return (
    <GenericAuthForm
      inputFields={[
        { name: "emailOrUsername", label: "Email or Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
      ]}
      onSubmit={onSubmit}
      submitButtonText="Log in"
      zodFormSchema={loginFormSchema}
      footer={
        <>
          {"Don't have an account? "}
          <Link href="/auth/signup" className="text-blue-400">
            Sign up
          </Link>
          .
        </>
      }
    />
  );
}
