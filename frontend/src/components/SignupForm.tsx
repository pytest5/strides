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

function checkIfUniqueEmail() {
  return true;
} // TODO

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
  /*   .refine(async (e) => {
      // Where checkIfEmailIsValid makes a request to the backend
      // to see if the email is valid.
      return await checkIfUniqueEmail();
    }, "This email is already in our database"), */
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = await authService.signup(values);
    localStorage.setItem("jwt", JSON.stringify(token));
    navigate("/");
    triggerToast("signup", { data: capitalizeFirstLetter(values.username) });
  }

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
                <Input placeholder="password" {...field} />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

SignupForm.action = action;

// type FormValues = {
//   firstName: string;
//   lastName?: string;
//   email?: string;
//   password: string;
// };

// export default function AdminLoginPage() {
//   const submit = useSubmit();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const onSubmit: SubmitHandler<FormValues> = (data) =>
//     submit(data, {
//       method: "post",
//       action: "/admin-login",
//     });

//   return (
//     <>
//       <h1>{watch("firstName") && `Hello ${watch("firstName")}`}</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           className="border-solid border-2 border-gray-400 rounded-md"
//           {...register("firstName", { required: "First name is required" })}
//         ></input>
//         {errors.firstName && (
//           <p style={{ color: "red" }}>{errors.firstName.message}</p>
//         )}
//         <input
//           {...register("password", { required: "Password is required" })}
//         ></input>
//         {errors.password && (
//           <p style={{ color: "red" }}>{errors.password.message}</p>
//         )}
//         <input type="submit"></input>
//       </form>
//     </>
//   );
// }
