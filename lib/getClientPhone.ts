import { supabase } from "@/lib/supabase";

function normalizePhone(
  value:string
) {

  return value
    .replace(/\s/g, "")
    .trim();
}

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

    if (localPhone) {

      return normalizePhone(
        localPhone
      );
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

    if (cookiePhone) {

      const normalizedPhone =
        normalizePhone(
          decodeURIComponent(
            cookiePhone
          )
        );

      localStorage.setItem(
        "client_phone",
        normalizedPhone
      );

      return normalizedPhone;
    }

    /* SESSION */

    const {
      data:{ session },
    } =
      await supabase.auth.getSession();

    const sessionPhone =
      session?.user?.phone;

    if (sessionPhone) {

      const normalizedPhone =
        normalizePhone(
          sessionPhone
        );

      localStorage.setItem(
        "client_phone",
        normalizedPhone
      );

      return normalizedPhone;
    }

    return "";

  } catch (error) {

    console.error(error);

    return "";
  }
}