export function verifyLogin(input: string) {
  if (input === "140578") {
    return {
      user: "Андрей",
      token: "fake-jwt"
    };
  }

  if (input.startsWith("+")) {
    return {
      user: "User",
      token: "sms-jwt"
    };
  }

  return null;
}
