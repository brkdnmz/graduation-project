// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import type { HTMLInputTypeAttribute } from "react";
// import { useForm, type Path } from "react-hook-form";
// import type { z } from "zod";

// type GenericFormProps<FormFields extends Record<string, string>> = {
//   zodFormSchema: z.Schema
//   inputFields: {
//     name: Extract<keyof FormFields, string>;
//     label: string;
//     type: HTMLInputTypeAttribute;
//   }[];
//   onSubmit: () => void;
// };

// export function GenericForm<FormFields extends Record<string, string>>({
//   zodFormSchema,
//   inputFields,
//   onSubmit,
// }: GenericFormProps<FormFields>) {
//   const { formState, register, handleSubmit } = useForm<FormFields>({
//     resolver: zodResolver(zodFormSchema),
//   });

//   return (
//     <div className="divide-y divide-slate-600 rounded-lg border-2 border-slate-900 bg-slate-800 p-4">
//       <form
//         className="flex flex-col justify-center gap-3 pb-3"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         {inputFields.map((field) => (
//           <label key={field.name} className="mb-3">
//             <span className="mb-1 inline-block">{field.label}</span>
//             <input
//               type={field.type}
//               {...register(field.name)}
//               className="w-full rounded-lg bg-slate-300 bg-opacity-20 p-1"
//             />
//             {formState.errors[field.name] && (
//               <div className="relative">
//                 <span className="absolute left-0 top-0 text-sm text-rose-500">
//                   {formState.errors[field.name]?.message}
//                 </span>
//               </div>
//             )}
//           </label>
//         ))}
//         <button type="submit" className="mt-4 rounded-lg bg-slate-900 py-2">
//           Log In
//         </button>
//       </form>

//       <div className="pt-2 text-center text-muted-foreground">
//         {"Don't have an account? "}
//         <Link href="/auth/signup" className="text-blue-400">
//           Sign up
//         </Link>
//         .
//       </div>
//     </div>
//   );
// }
