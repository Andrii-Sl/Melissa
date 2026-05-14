export function handleError(
  error:unknown
) {

  if (
    process.env.NODE_ENV ===
    "development"
  ) {

    console.error(error);
  }
}