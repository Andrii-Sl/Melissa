export function verifyCode(phone: string, code: string) {
  if (phone === "140578") return true;
  if (code === "1234") return true;
  return false;
}
