"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, useReducedMotion } from "framer-motion";
import { Chrome, Github, Twitter } from "lucide-react";
import { useLoginUser } from "@/utils/api/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import z from "zod";

const socialProviders = [
  { name: "Google", icon: Chrome },
  { name: "Twitter", icon: Twitter },
  { name: "GitHub", icon: Github },
];

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be less than 20 characters long" });

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const router = useRouter();
  const login = useLoginUser();
  const shouldReduceMotion = useReducedMotion();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login.mutateAsync({
        email: data.email,
        password: data.password,
      });
      // Redirect or handle success if not handled by mutateAsync
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-background">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1],
        }}
        className="group w-full max-w-lg rounded-3xl overflow-hidden border border-border/60 bg-card/85 p-8 backdrop-blur-xl sm:p-10 relative shadow-xl"
        role="form"
        aria-labelledby="login-title"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"
        />
        
        <div className="mb-8 space-y-2 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Sign In
          </div>
          <h1
            id="login-title"
            className="text-2xl font-semibold text-foreground sm:text-3xl tracking-tight"
          >
            Access your workspace
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a social account or continue with email and password.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {socialProviders.map((provider) => (
            <Button
              key={provider.name}
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-full border-border/60 bg-card/70 text-sm text-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:border-primary/50"
              aria-label={`Continue with ${provider.name}`}
            >
              <provider.icon className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{provider.name}</span>
            </Button>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border/70" />
          <span className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-border/70" />
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-11 rounded-2xl border-border/60 bg-background/60 px-4 transition-all focus:ring-2 focus:ring-primary/20"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-[10px] text-destructive font-medium ml-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-11 rounded-2xl border-border/60 bg-background/60 px-4 transition-all focus:ring-2 focus:ring-primary/20"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-[10px] text-destructive font-medium ml-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <label className="flex items-center gap-2 cursor-pointer group/label">
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="group-hover/label:text-foreground transition-colors select-none">Remember me</span>
                </label>
              )}
            />
            <button
              type="button"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline transition-all"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={login.isPending}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-70 disabled:translate-y-0"
          >
            {login.isPending ? "Signing in..." : "Continue with Email"}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
          By continuing you agree to our <a href="#" className="underline hover:text-foreground">terms of service</a> and <a href="#" className="underline hover:text-foreground">privacy policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
