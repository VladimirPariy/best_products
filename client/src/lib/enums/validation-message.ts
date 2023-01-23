export enum ValidationMessage {
  required = "Field is required",
  invalidEmail = "Email is invalid",
  invalidPassword = "Password cannot be shorter than 5 characters",
  invalidConfirmPassword = "Confirm password doesn't match",
  onlyLatinLetter = "Password can contain only Latin letters",
  invalidPhone = "Phone is invalid",
  invalidComment = "Review cannot be shorter than 5 characters and longer than 255 characters",
  invalidCharacteristics = "The product must have at least one or more characteristics",
  invalidImages = "The product must have at least one or more images",
}
