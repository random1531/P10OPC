import { toast } from "sonner";

export async function UpdateUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const token = localStorage.getItem("token");
  const formData = { name, email };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URP_API}auth/profile`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if(result.success){

      toast.success(result.message)
    }else{
      toast.error(result.message)

    }
    return result;
  } catch (error) {
    return null;
  }
}


// connexion function

export async function LoginFunction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const formData = { email, password };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URP_API}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
    }
    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    console.log("Erreur lors de la connexion:", error);
  }
}

// register Function

export async function RegisterFunction({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const formData = { email, password, name };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URP_API}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    return data;
  } catch (error) {}
}
