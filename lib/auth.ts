export function verifyLogin(code: string) {
  if (code === "140578") {
    return {
      id: 1,
      name: "Admin",
      role: "admin"
    };
  }

  return null;
}
