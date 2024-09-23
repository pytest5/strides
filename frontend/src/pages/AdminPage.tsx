import React from "react";
import { useLoaderData } from "react-router-dom";

export default function AdminPage() {
  const user = useLoaderData();
  return (
    <div>
      <h1>AdminPage</h1>
      {/* {user} */}
    </div>
  );
}

// export const AdminPage: React.FC<> = () => {
//   return <div>AdminPage</div>;
// };
