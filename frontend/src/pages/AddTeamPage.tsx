import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/UserProvider";
import { submitTeam } from "@/services/teamService";
import { useTriggerToast } from "@/hooks/use-trigger-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

export type AddTeamFormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  ispublic: z.boolean().default(true),
});

type Team = {
  id: string;
  name: string;
  location: string;
  ispublic: boolean;
};

export default function AddTeamPage() {
  const { jwtToken } = useUser();

  const queryClient = useQueryClient();
  const triggerToast = useTriggerToast();

  const mutation = useMutation({
    mutationFn: ({ values, jwtToken }) => {
      return submitTeam(values, jwtToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["fetchPublicTeams"],
          // exact: true,
          refetchType: "active",
        },
        { throwOnError: true, cancelRefetch: true }
      );
      queryClient.invalidateQueries(
        {
          queryKey: ["fetchMyTeams"],
          // exact: true, HOLY REMOVE THIS FOR PARTIAL MATCHING TO WORK
          // https://tanstack.com/query/latest/docs/framework/react/guides/filters
          refetchType: "active",
        },
        { throwOnError: true, cancelRefetch: true }
      );
      triggerToast("submit");
      form.reset();
    },
    onError: (e) => {
      form.setError("root", {
        type: "manual",
        message: `Unable to add team. ${e.message}`,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ispublic: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      values,
      jwtToken,
    });
  }

  if (mutation.isPending) {
    console.log("pending");
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle>Add a Team</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ispublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Public Team</FormLabel>
                      <FormDescription>
                        Make this team visible to everyone
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button type="submit" variant="outline" asChild>
                  <Link to="/teams">Back</Link>
                </Button>
                <Button type="submit" className="ml-auto">
                  Add Team
                </Button>
              </div>
              {form.formState?.errors?.root && (
                <div className="text-sm text-destructive">
                  {form.formState?.errors?.root.message}
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
