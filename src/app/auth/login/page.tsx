"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import type { HTMLInputTypeAttribute } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

const loginFormSchema = z.object({
  emailOrUsername: z.string().min(1, "Must not be empty").trim(),
  password: z.string().min(1, "Must not be empty"),
});

type LoginForm = z.infer<typeof loginFormSchema>;

const inputFields: {
  name: keyof LoginForm;
  label: string;
  type: HTMLInputTypeAttribute;
}[] = [
  { name: "emailOrUsername", label: "Email or Username", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

export default function Login() {
  const { formState, register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  const login = api.session.login.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const { accessToken, user } = await login.mutateAsync({
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      });

      jsCookie.set("access_token", accessToken);
      console.log(user);

      // TODO: Redirect to previous page
      router.push("/");
    } catch (error) {
      if (error instanceof TRPCClientError) alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col justify-center gap-3 rounded-lg border-2 border-slate-900 bg-slate-800 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputFields.map((field) => (
        <label key={field.name} className="mb-3">
          <span className="mb-1 inline-block">{field.label}</span>
          <input
            type={field.type}
            {...register(field.name)}
            className="w-full rounded-lg bg-slate-300 bg-opacity-20 p-1"
          />
          {formState.errors[field.name] && (
            <div className="relative">
              <span className="absolute left-0 top-0 text-sm text-rose-500">
                {formState.errors[field.name]?.message}
              </span>
            </div>
          )}
        </label>
      ))}
      <button type="submit" className="mt-4 rounded-lg bg-slate-900 py-2">
        Log In
      </button>
    </form>
  );
}
