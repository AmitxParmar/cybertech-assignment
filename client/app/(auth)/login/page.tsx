"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Credentials = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const form = useForm<Credentials>();
  const login = useLogin();
  const router = useRouter();
  const { mutate: loginUser, status, error } = login;

  // check if the api call is loading
  const isPending = status === "pending";

  // handle login and credential verification
  const handleSubmit = (data: Credentials) => {
    loginUser(data, {
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        toast.error("Error Loggin In!", { description: error.message });
      },
    });
  };

  return (
    <div className="container flex mx-auto items-center justify-center min-h-[calc(100vh-3.5rem)] py-6 px-4 flex-col">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {status === "error" && error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error.message || "Login failed. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        value={field.value || ""}
                        required
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
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        {...field}
                        value={field.value || ""}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Test credentials below login component */}
      <div className="mt-4 text-center">
        <p className="text-red-600 text-sm font-semibold">
          Test Login: <br />
          Email: test1@test.com <br />
          Password: test1@test.com
        </p>
      </div>
    </div>
  );
}
