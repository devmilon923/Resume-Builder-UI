"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@/utils/api/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCookies } from "next-client-cookies";
import z from "zod";
import { useRouter } from "next/navigation";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be less than 20 characters long" });
// .regex(/[a-z]/, {
//   message: "Password must contain at least one lowercase letter",
// })
// .regex(/[A-Z]/, {
//   message: "Password must contain at least one uppercase letter",
// })
// .regex(/[0-9]/, { message: "Password must contain at least one number" })
// .regex(/[^a-zA-Z0-9]/, {
//   message: "Password must contain at least one special character",
// });
const formSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export default function page() {
  const router = useRouter();
  const login = useLoginUser();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result: any = await login.mutateAsync(data);
    const role = result.data.role;
    if (role === "admin") {
      return router.push("/admin");
    } else if (role === "user") {
      return router.push("/user");
    }
  }

  return (
    <div className="max-w-md px-4 my-6 mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldContent>
                <Field data-invalid={fieldState.invalid ? "true" : "false"}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    {...field}
                    id={field.name}
                    placeholder="Enter your email"
                    type="text"
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              </FieldContent>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldContent>
                <Field data-invalid={fieldState.invalid ? "true" : "false"}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    placeholder="Enter your password"
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("password"); // Trigger validation on change
                    }}
                    id={field.name}
                    type="password"
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              </FieldContent>
            )}
          />
          <Button type="submit">Sign In</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
