import { AddTeamFormType } from "@/pages/AddTeamPage";

// export type Location = {
//   latitude: string;
//   longitude: string;
// } | null;

export const submitTeam = async (formData: AddTeamFormType, token: string) => {
  try {
    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting stride to DB", error.message);
    }
    throw new Error("Unknown error occurred");
  }
};

export const joinTeam = async (teamId: number, token: string) => {
  try {
    const response = await fetch("/api/teams/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamId }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error joining team", error.message);
    }
    throw new Error("Unknown error occurred");
  }
};

export const leaveTeam = async (teamId: number, token: string) => {
  try {
    const response = await fetch(`/api/teams/${teamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    if (response.status === 204) {
      return { message: "Successfully left the team" };
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error leaving team", error.message);
    }
    throw new Error(`Unknown error occurred ${error}`);
  }
};
