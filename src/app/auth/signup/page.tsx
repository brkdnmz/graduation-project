"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import type { HTMLInputTypeAttribute } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

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

const inputFields: {
  name: keyof SignupForm;
  label: string;
  type: HTMLInputTypeAttribute;
}[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "username", label: "Username", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm password", type: "password" },
];

export default function Signup() {
  const { formState, register, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
  });
  const createUser = api.auth.signUp.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      // TODO: Change to `mutate`
      await createUser.mutateAsync({
        email: data.email,
        password: data.password,
        username: data.username,
      });
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
        Sign Up
      </button>
    </form>
  );
}
