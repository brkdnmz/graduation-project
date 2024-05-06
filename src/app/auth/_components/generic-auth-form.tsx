import { zodResolver } from "@hookform/resolvers/zod";
import type { HTMLInputTypeAttribute } from "react";
import {
  useForm,
  type Path,
  type PathValue,
  type SubmitHandler,
} from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type GenericAuthFormProps<FormFields extends Record<string, string>> = {
  zodFormSchema: z.Schema;
  inputFields: {
    name: Path<FormFields>;
    label: string;
    type: HTMLInputTypeAttribute;
  }[];
  onSubmit: SubmitHandler<FormFields>;
  submitButtonText: string;
  footer: React.ReactNode;
};

export function GenericAuthForm<FormFields extends Record<string, string>>({
  zodFormSchema,
  inputFields,
  onSubmit,
  submitButtonText,
  footer,
}: GenericAuthFormProps<FormFields>) {
  const form = useForm<FormFields>({
    resolver: zodResolver(zodFormSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-center gap-4 rounded-xl bg-slate-900 p-4 text-slate-300"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {inputFields.map((inputField) => (
            <FormField
              key={inputField.name}
              control={form.control}
              name={inputField.name}
              defaultValue={"" as PathValue<FormFields, Path<FormFields>>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{inputField.label}</FormLabel>
                  <FormControl>
                    <Input {...field} type={inputField.type} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="mt-4 rounded-lg py-2 text-slate-300"
            variant="secondary"
          >
            {submitButtonText}
          </Button>
          <div className="pt-2 text-center text-muted-foreground">{footer}</div>
        </form>
      </Form>
    </>
  );
}
