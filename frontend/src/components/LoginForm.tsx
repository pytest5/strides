import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fakeAuthProvider } from "@/components/fakeAuthProvider";
import { redirect, useNavigate } from "react-router-dom";
import authService from "../services/authService.ts";
import { useUser } from "./UserProvider.tsx";
import { useTriggerToast } from "@/hooks/use-trigger-toast.ts";
import fetchCountries from "@/utils/fetchCountries.ts";

async function action({
  params,
  request,
}: {
  params?: string;
  request: Request;
}) {
  const formData = await request.formData();
  const { firstName } = Object.fromEntries(formData);
  await fakeAuthProvider.signin(firstName);
  return redirect("/admin");
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field has to be filled.",
    })
    .email("This is not a valid email.")
    .max(50),
  password: z
    .string()
    .min(2, {
      message: "Password must be at least 2 characters.",
    })
    .max(50),
});

export default function LoginForm() {
  const countries = fetchCountries();
  const triggerToast = useTriggerToast();
  const { setUser, user, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  // 1. Define  form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  console.log("hi", errors);

  // 2. Define submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const jwt = await authService.login(values);
      localStorage.setItem("jwt", jwt);
      const user = JSON.parse(atob(jwt.split(".")[1]));
      setUser(user);
      setIsLoggedIn(true);
      navigate("/");
      triggerToast("login", user?.username);
    } catch (e) {
      console.error("Login error:", e); // Log the actual error
      setError("root", {
        type: "manual",
        message: "Invalid login details.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>This is your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {errors.root && (
          <div className="text-destructive font-medium text-[0.8rem]">
            {errors.root.message}
          </div>
        )}
      </form>
    </Form>
  );
}

LoginForm.action = action;
