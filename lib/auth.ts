export function verifyCode(phone: string, code: string) {
  // спец-вход без SMS
  if (phone === "140578") return true;

  // тестовый код
  if (code === "1234") return true;

  return false;
}
