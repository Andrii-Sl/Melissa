import { supabase } from "@/lib/supabase";

export async function getClientPhone() {

  try {

    if (
      typeof window ===
      "undefined"
    ) {

      return "";
    }

    /* LOCAL STORAGE */

    const localPhone =
      localStorage.getItem(
        "client_phone"
      );

    if (
      localPhone &&
      localPhone.trim()
    ) {

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

    if (
      cookiePhone &&
      cookiePhone.trim()
    ) {

      const normalizedPhone =
        decodeURIComponent(
          cookiePhone.trim()
        );

      localStorage.setItem(
        "client_phone",
        normalizedPhone
      );

      return normalizedPhone;
    }

    /* SUPABASE SESSION */

    const {
      data:{ session },
      error,
    } =
      await supabase.auth.getSession();

    if (error) {

      console.error(error);

      return "";
    }

    const sessionPhone =
      session?.user?.phone || "";

    if (
      sessionPhone &&
      sessionPhone.trim()
    ) {

      const normalizedPhone =
        sessionPhone.trim();

      localStorage.setItem(
        "client_phone",
        normalizedPhone
      );

      return normalizedPhone;
    }

    return "";

  } catch (error) {

    console.error(
      "getClientPhone error:",
      error
    );

    return "";
  }
}