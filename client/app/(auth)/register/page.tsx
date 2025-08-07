"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/hooks/useAuth";
import { toast } from "sonner";

type RegisterFields = {
  name: string;
  email: string;
  password: string;
  bio?: string;
};

export default function RegisterPage() {
  const form = useForm<RegisterFields>();
  const register = useRegister();
  const router = useRouter();

  const { mutate: registerUser, status, error } = register;
  const isPending = status === "pending";

  const handleSubmit = (data: RegisterFields) => {
    registerUser(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        bio: data.bio || undefined,
      },
      {
        onSuccess: () => {
          router.push("/login");
          toast.success("Account created! Please sign in.");
        },
        onError: (error) => {
          toast.error("Registration failed!", { description: error.message });
        },
      }
    );
  };

  return (
    <div className="container flex mx-auto items-center justify-center min-h-[calc(100vh-3.5rem)] py-6 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Join our community and start connecting
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
                    {error.message || "Registration failed. Please try again."}
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Full Name</Label>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
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
                        minLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        {...field}
                        value={field.value || ""}
                        className="min-h-[80px]"
                        maxLength={200}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {field.value?.length || 0}/200 characters
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
