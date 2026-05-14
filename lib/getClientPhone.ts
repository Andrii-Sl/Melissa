import { supabase } from "@/lib/supabase";

export async function getClientPhone() {

  try {

    /* LOCAL STORAGE */

    const localPhone =
      localStorage.getItem(
        "client_phone"
      );

    if (localPhone)
      return localPhone;

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

    if (cookiePhone)
      return cookiePhone;

    /* SUPABASE SESSION */

    const {
      data:{ session },
    } =
      await supabase.auth.getSession();

    return (
      session?.user?.phone || ""
    );

  } catch (error) {

    console.error(error);

    return "";
  }
}