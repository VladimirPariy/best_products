import {IUserUpdatingFields} from "@/app/lib/interfaces/user-updating-fields.interface";
import {Request} from "express";

export const userUpdatingField = ({body}: Request) => {
  let infoFields = {} as IUserUpdatingFields;

  const fields = ['first_name', 'last_name', 'email', 'password', 'phone_number', 'is_get_update']

  for (const field in body) {
    if (fields.includes(field)) {
      infoFields = {...infoFields, [field]: body[field]}
    }
  }

  return infoFields
}