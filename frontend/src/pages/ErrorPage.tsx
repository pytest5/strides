import { Link, useRouteError } from "react-router-dom";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">Oops!</CardTitle>
          </div>
          <CardDescription>
            Sorry, an unexpected error has occurred.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            {error.statusText || error.message || "Unknown error"}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          {/* <Button asChild className="">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
