import { Button } from "@/components/ui/button";
import { useUser } from "@/components/UserProvider";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { isLoggedIn } = useUser();
  return (
    <div className="flex flex-col min-h-full ">
      <main className="flex-1 flex justify-center items-center px-4 md:px-6">
        <div className="flex flex-col items-center gap-y-7 text-center max-w-md">
          <h1 className="text-4xl max-w-[330px] font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Welcome to Our Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Discover amazing features and insights. Sign up now or explore our
            public dashboard.
          </p>
          <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center">
            {!isLoggedIn ? (
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/strides">Add strides</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link to="/dashboard">View Public Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Yeet Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
