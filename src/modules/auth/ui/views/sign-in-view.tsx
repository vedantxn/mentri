"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OctagonAlertIcon, Mail } from "lucide-react";

import { FaGoogle, FaYoutube } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
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
      {/* Background Image - Not Blurred */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-image.png')" }}
      />

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img src="/logo-white.svg" alt="logo" className="h-8 w-8 fill-white hover:rotate-180 transition-all duration-200" />
          <span className="text-lg font-semibold text-white hover:text-white">Mentri.ai</span>
        </div>
        
        {/* Social Links - Top Right */}
        <div className="flex items-center gap-2">
          {/* Email */}
          <a
            href="mailto:vedantxn@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
          >
            <HiOutlineMail className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* X/Twitter */}
          <a
            href="https://twitter.com/vedantxn"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
          >
            <FaXTwitter className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/vedantxn"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
          >
            <FaLinkedinIn className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@vedantxn"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
          >
            <FaYoutube className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* Featured GitHub Button */}
          <a
            href="https://github.com/vedantxn/mentri"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-4 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:from-white/20 hover:to-white/10 hover:shadow-xl"
          >
            <SiGithub className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-semibold text-white">Star on GitHub</span>
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>
      </div>

      {/* Compact Glassmorphism Sign In Card - LEFT ALIGNED */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] items-center justify-start px-8 md:px-16 lg:px-24">
        <Card className="w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-8">
            {/* Header - Better Copy */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-3xl font-bold text-white">
                Your Personal AI
              </h1>
              <p className="text-sm text-gray-300 italic">
                Create, customize, and connect with AI characters that inspire and guide you
              </p>
            </div>

            {!showEmailForm ? (
              <>
                {/* Social Login Buttons - Clean White Design */}
                <div className="flex flex-col gap-2.5">
                  <Button
                    disabled={pending}
                    onClick={() => onSocial("google")}
                    variant="outline"
                    className="group h-11 w-full rounded-xl border-0 bg-white text-sm font-medium text-gray-900 shadow-md transition-all duration-200 hover:bg-primary/30 hover:text-white hover:shadow-lg disabled:opacity-50"
                    type="button"
                  >
                    <FaGoogle className="mr-2 h-5 w-5" />
                    Continue with Google
                  </Button>

                  <Button
                    disabled={pending}
                    onClick={() => onSocial("github")}
                    variant="outline"
                    className="group h-11 w-full rounded-xl border-0 bg-white text-sm font-medium text-gray-900 shadow-md transition-all duration-200 hover:bg-primary/30 hover:text-white hover:shadow-lg disabled:opacity-50"
                    type="button"
                  >
                    <SiGithub className="mr-2 h-5 w-5" />
                    Continue with Github
                  </Button>
                </div>

                {/* OR Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 text-gray-500">OR</span>
                  </div>
                </div>

                {/* Email Button - Glassmorphism */}
                <Button
                  onClick={() => setShowEmailForm(true)}
                  variant="outline"
                  className="h-11 w-full rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-gray-200 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:text-white hover:bg-white/10 hover:shadow-lg"
                  type="button"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with email (Coming Soon)
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
                {/* Email Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3.5"
                  >
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
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-sm text-gray-300">
                              Password
                            </FormLabel>
                            <Link
                              href="/forgot-password"
                              className="text-xs text-primary transition-colors hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
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
                      {pending ? "Signing in..." : "Sign in"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      variant="ghost"
                      className="w-full rounded-xl text-sm text-gray-400 transition-colors duration-200 hover:bg-white/5 hover:text-gray-300"
                    >
                      Back to social login
                    </Button>
                  </form>
                </Form>

                <p className="mt-5 text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-primary transition-colors hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* "Where Greatness Awaits" Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-10">

          <div
            className="rounded-full px-5 py-2 text-sm text-white font-semibold"
          >
            -Where Greatness Awaits
          </div>
      </div>
    </div>
  );
};
