import { useState } from "react";
import { ChevronLeft, BadgeCheck, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/components/UserProvider";
import { DialogLogoutButton } from "@/components/DialogLogoutButton";
import { Link } from "react-router-dom";
import { UserAvatar } from "@/components/UserAvatar";

const sidebarItems = [
  "Profile",
  "Account",
  "Appearance",
  "Notifications",
  "Display",
];

export default function ProfilePage() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("Profile");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("I own a computer.");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddUrl = () => {
    setUrls([...urls, ""]);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  return (
    <div className="bg-background h-full font-sans">
      {/* Desktop View */}
      <div className="hidden sm:block py-10 px-12 border-2 h-full ">
        <div className="flex items-center gap-2 mb-2">
          <Link to="../">
            <ChevronLeft className="text-muted-foreground" strokeWidth={1.2} />
          </Link>
          <h1 className="text-3xl font-bold ">Settings</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Manage your account settings and set e-mail preferences.
        </p>
        <div className="flex gap-8">
          <aside className="w-1/4 flex flex-col justify-between">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === item
                      ? "bg-muted"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
            <DialogLogoutButton
              className="border-none w-full shadow-none justify-start"
              text="Logout"
            />
          </aside>
          <main className="flex-1 flex flex-col gap-6 ">
            <div>
              <h2 className="text-2xl font-bold">Profile</h2>
              <p className="text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
                </p>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  You can manage verified email addresses in your email
                  settings.
                </p>
              </div>
              <div>
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  You can @mention other users and organizations to link to
                  them.
                </p>
              </div>
            </div>
            <Button>Update profile</Button>
          </main>
        </div>
      </div>
      {/* Mobile View */}
      <div className="h-full sm:hidden bg-background font-sans text-foreground">
        <header className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center p-4">
            <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link to="../">
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
        </header>

        <main className="p-4">
          <div className="grid grid-cols-[auto_1fr] grid-rows-2 mt-8 mb-9 gap-x-4 gap-y-0">
            <UserAvatar className="row-span-2" />
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium">{user?.username}</h2>
              {user.role === "admin" && (
                <BadgeCheck size={24} strokeWidth={0.8} />
              )}
            </div>
            <div className="row-span-1">{user.email}</div>
          </div>

          <section className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Account Settings
            </h3>
            <SettingsItem
              text="Edit profile"
              icon={<ChevronRight className="h-5 w-5" />}
            />
            <SettingsItem
              text="Change password"
              icon={<ChevronRight className="h-5 w-5" />}
            />
            <SettingsItem
              text="Add a payment method"
              icon={<Plus className="h-5 w-5" />}
            />
          </section>

          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              More
            </h3>
            <SettingsItem
              text="About us"
              icon={<ChevronRight className="h-5 w-5" />}
            />
            <SettingsItem
              text="Privacy policy"
              icon={<ChevronRight className="h-5 w-5" />}
            />
            <DialogLogoutButton
              className="pl-0 border-none w-full shadow-none justify-start"
              text="Logout"
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function SettingsItem({ text, onClick, variant }) {
  return (
    <button
      className="flex items-center justify-between w-full py-2 text-sm"
      onClick={onClick}
    >
      <span>{text}</span>
      {variant !== "ghost" ? <ChevronRight className="w-5 h-5" /> : ""}
    </button>
  );
}
