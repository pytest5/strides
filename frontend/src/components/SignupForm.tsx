import { useForm, SubmitHandler } from "react-hook-form";
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
import authService from "@/services/authService";
import { CountrySelector } from "./CountrySelector";
import { useTriggerToast } from "@/hooks/use-trigger-toast";
import { capitalizeFirstLetter } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

async function action({ request }: { params?: string; request: Request }) {
  const formData = await request.formData();
  const { firstName } = Object.fromEntries(formData);
  await fakeAuthProvider.signin(firstName);
  return redirect("/admin");
}

export type FieldTypes = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
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
  country: z.number({ required_error: "Please select a country" }),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const triggerToast = useTriggerToast();
  const form = useForm<FieldTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  console.log(errors);

  const userSignUp = async (values) => {
    try {
      const token = await authService.signup(values);
      // localStorage.setItem("jwt", JSON.stringify(token));
      navigate("/");
      triggerToast("signup", {
        data: capitalizeFirstLetter(values.username),
        duration: 4000,
      });
    } catch (e) {
      if (e instanceof Error) {
        if (
          e.message ===
          'duplicate key value violates unique constraint "users_email_key"'
        ) {
          setError("email", {
            type: "custom",
            message: "Email is already registered.",
          });
        } else {
          setError("root.signupError", {
            type: "custom",
            message: e.message,
          });
        }
      }
    }
  };

  const mutation = useMutation({
    mutationFn: userSignUp,
  });

  const onSubmit: SubmitHandler<FieldTypes> = async (values) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <CountrySelector field={field} form={form}></CountrySelector>
          )}
        />
        {errors?.root && (
          <div className="text-[0.8rem] font-medium text-destructive">
            {errors.root?.signupError.message}
          </div>
        )}
        {mutation.isPending ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Create Account</Button>
        )}
      </form>
    </Form>
  );
}

SignupForm.action = action;
