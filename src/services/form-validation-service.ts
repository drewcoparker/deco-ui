export class FormValidationService {
  /**
   * Validates a text value.
   *
   * @param value - The text value to validate.
   * @returns A string indicating the validation result. If the value is empty, it returns 'Please enter a value', otherwise it returns an empty string.
   */
  validateText(value: string): string {
    if (!value) {
      return 'Please enter a value';
    }

    return '';
  }

  /**
   * Validates a number value.
   *
   * @param value - The value to be validated.
   * @returns A string indicating the validation result. If the value is empty, it returns 'Please enter a number'.
   */
  validateNumber(value: string): string {
    if (!value) {
      return 'Please enter a number';
    }

    return '';
  }

  /**
   * Validates an email address.
   *
   * @param value - The email address to validate.
   * @returns An error message if the email is invalid, otherwise an empty string.
   */
  validateEmail(value: string): string {
    if (!value) {
      return 'Please enter an email';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email';
    }

    return '';
  }

  /**
   * Validates the input value based on the specified type.
   *
   * @param type - The type of input to validate.
   * @param value - The value to validate.
   * @returns A string indicating the validation result.
   */
  validateInput(type: string, value: string): string {
    switch (type) {
      case 'text':
        return this.validateText(value);
      case 'number':
        return this.validateNumber(value);
      case 'email':
        return this.validateEmail(value);
      default:
        return 'Invalid type';
    }
  }

  /**
   * Handles the validity of an input based on its type and value.
   * @param type - The type of the input.
   * @param value - The value of the input.
   * @param internals - The ElementInternals object associated with the input element.
   * @returns The error message, if any.
   */
  handleInputValidity(type: string, value: string, internals: ElementInternals): string {
    const errorMessage = this.validateInput(type, value);

    if (errorMessage) {
      internals.setValidity({ customError: true }, errorMessage);
    } else {
      internals.setValidity({});
    }

    return errorMessage;
  }
}
