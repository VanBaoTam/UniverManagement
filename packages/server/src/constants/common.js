export const DATE_FORMAT = "DD-MM-YYYY";
export const TIMEZONE = "Asia/Ho_Chi_Minh";
const USERNAME_FORMAT = /^[a-zA-Z0-9_]{4,30}$/;
const PASSWORD_FORMAT = /^.{6,50}$/;
const NAME_FORMAT = /^[\p{L}0-9_ .]{4,30}$/u;

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,30}$/;
const ID_FORMAT = /^\d+$/;
const PHONE_FORMAT = /^(0[1-9][0-9]{8}|84[1-9][0-9]{7})$/;
export function CredentialsValidation(type, value) {
  switch (type) {
    case "name": {
      return NAME_FORMAT.test(value);
    }
    case "email": {
      return EMAIL_FORMAT.test(value);
    }
    case "password": {
      return PASSWORD_FORMAT.test(value);
    }
    case "username": {
      return USERNAME_FORMAT.test(value);
    }
    case "id": {
      return ID_FORMAT.test(value);
    }
    case "phone": {
      return PHONE_FORMAT.test(value);
    }
  }
}
