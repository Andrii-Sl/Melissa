import { supabase } from "@/lib/supabase";

export async function getClientPhone() {

  try {

    /* LOCAL STORAGE */

    const localPhone =
      localStorage.getItem(
        "client_phone"
      );

    if (localPhone?.trim()) {

      return localPhone.trim();
    }

    /* COOKIE */

    const cookiePhone =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(
            "client_phone="
          )
        )
        ?.split("=")[1];

    if (cookiePhone?.trim()) {

      localStorage.setItem(
        "client_phone",
        cookiePhone.trim()
      );

      return cookiePhone.trim();
    }

    /* SUPABASE SESSION */

    const {
      data:{ session },
    } =
      await supabase.auth.getSession();

    const sessionPhone =
      session?.user?.phone || "";

    if (sessionPhone?.trim()) {

      localStorage.setItem(
        "client_phone",
        sessionPhone.trim()
      );

      return sessionPhone.trim();
    }

    return "";

  } catch (error) {

    console.error(error);

    return "";
  }
}