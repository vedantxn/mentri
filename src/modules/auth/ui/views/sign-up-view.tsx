"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OctagonAlertIcon, Mail, User, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (error) => {
          setPending(false);
          setError(error.error.message);
        },
      }
    );
  };

  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          setPending(false);
          setError(error.error.message);
        },
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-image.png')" }}
      />

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-7 w-7" />
          <span className="text-lg font-semibold text-white">Meet.ai</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button 
              variant="ghost" 
              className="rounded-full bg-white/10 px-5 text-sm text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              variant="ghost" 
              className="text-sm text-white transition-colors duration-200 hover:text-white/80"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Glassmorphism Sign Up Card - LEFT ALIGNED */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] items-center justify-start px-8 md:px-16 lg:px-24">
        <Card className="w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-3xl font-bold leading-tight text-white">
                Create Your Account
              </h1>
              <p className="text-sm text-gray-400">
                Join us and start your journey today
              </p>
            </div>

            {!showEmailForm ? (
              <>
                {/* Social Sign Up Buttons */}
                <div className="flex flex-col gap-2.5">
                  <Button
                    disabled={pending}
                    onClick={() => onSocial("google")}
                    variant="outline"
                    className="group h-11 w-full rounded-xl border-0 bg-white text-sm font-medium text-gray-900 shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg disabled:opacity-50"
                    type="button"
                  >
                    Continue with Google
                  </Button>

                  <Button
                    disabled={pending}
                    onClick={() => onSocial("github")}
                    variant="outline"
                    className="group h-11 w-full rounded-xl border-0 bg-white text-sm font-medium text-gray-900 shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg disabled:opacity-50"
                    type="button"
                  >
                    Continue with Github
                  </Button>
                </div>

                {/* OR Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black/40 px-2 text-gray-500">OR</span>
                  </div>
                </div>

                {/* Email Button */}
                <Button
                  onClick={() => setShowEmailForm(true)}
                  variant="outline"
                  className="h-11 w-full rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-gray-200 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
                  type="button"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with email
                </Button>

                {/* Terms */}
                <p className="mt-5 text-center text-xs text-gray-500">
                  By continuing, you agree with the{" "}
                  <Link
                    href="/terms"
                    className="text-gray-400 underline transition-colors hover:text-gray-300"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-gray-400 underline transition-colors hover:text-gray-300"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </>
            ) : (
              <>
                {/* Email Sign Up Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3.5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="John Doe"
                              className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-gray-600 backdrop-blur-md transition-all duration-200 focus:border-white/20 focus:bg-white/10"
                              disabled={pending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@example.com"
                              className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-gray-600 backdrop-blur-md transition-all duration-200 focus:border-white/20 focus:bg-white/10"
                              disabled={pending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a strong password"
                              className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-gray-600 backdrop-blur-md transition-all duration-200 focus:border-white/20 focus:bg-white/10"
                              disabled={pending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Re-enter your password"
                              className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-gray-600 backdrop-blur-md transition-all duration-200 focus:border-white/20 focus:bg-white/10"
                              disabled={pending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!!error && (
                      <Alert variant="destructive" className="rounded-xl py-2.5">
                        <OctagonAlertIcon className="h-4 w-4" />
                        <AlertTitle className="ml-2 text-sm">{error}</AlertTitle>
                      </Alert>
                    )}

                    <Button
                      disabled={pending}
                      type="submit"
                      className="h-11 w-full rounded-xl bg-primary font-medium shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:brightness-110"
                    >
                      {pending ? "Creating account..." : "Create Account"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      variant="ghost"
                      className="w-full rounded-xl text-sm text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-300"
                    >
                      Back to social sign up
                    </Button>
                  </form>
                </Form>

                <p className="mt-5 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-primary transition-colors hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
