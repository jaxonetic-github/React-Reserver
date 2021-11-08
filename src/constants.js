

export function handleAuthenticationError(err, setError) {
  let returnMsg=null;
  const { status, message } = parseAuthenticationError(err);
  const errorType = message || status;
  switch (errorType) {
    case "invalid username":
       returnMsg = "Invalid email address." ;
      break;
    case "invalid username/password":
    case "invalid password":
    case "401":

      returnMsg =  "Incorrect password.";
      break;
    case "name already in use":
    case "409":
      setError((err) => ({ ...err, errorMsg: "Email is already registered." }));
      returnMsg = "Email is already registered." ;
      break;
    case "password must be between 6 and 128 characters":
    case "400":
      setError((err) => ({
        ...err,
        errorMsg: "Password must be between 6 and 128 characters."
      }));
      returnMsg = "Password must be between 6 and 128 characters.";
      break;
    default:
    returnMsg='See Logs';
      break;
  }
  return returnMsg ;
}

export function parseAuthenticationError(err) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}