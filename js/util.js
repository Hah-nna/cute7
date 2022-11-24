export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
<<<<<<< HEAD
export const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
=======
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4

export const getYYYYMMDD = (now) => new Date(now).toISOString().split("T")[0];
