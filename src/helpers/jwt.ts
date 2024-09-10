export default function decodeJWTToken<T>(token: string): T | undefined {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
  } catch (_err) {
    return undefined;
  }
}
