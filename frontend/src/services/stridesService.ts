import { AddStrideFormDataType } from "@/pages/AddStridesPage";
import { EditStrideFormType } from "@/pages/AdminPage";

type TokenType = string;

export type Location = {
  latitude: number;
  longitude: number;
};

export const submitStride = async (
  data: AddStrideFormDataType,
  token: TokenType,
  location: Location
) => {
  try {
    const response = await fetch("/api/strides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data, location }),
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

interface removeStrideProps {
  strideId: number;
  jwtToken: string;
}

export const removeStride = async ({
  strideId,
  jwtToken,
}: removeStrideProps) => {
  try {
    const response = await fetch("/api/strides", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ strideId }),
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

interface EditStrideProps {
  strideData: EditStrideFormType;
  jwtToken: string;
}

export const editStride = async ({ strideData, jwtToken }: EditStrideProps) => {
  try {
    const response = await fetch("/api/strides", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ strideData }),
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
