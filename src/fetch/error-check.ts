import errors from '../errors';

/**
 * Generate error message for the response
 * @param response fetch response
 * @returns
 */
const generateErrorMessage = (response: Response) => {
  const { status } = response;

  if (status in errors) {
    return errors[status];
  }

  return status ? `${status}` : errors.UNKNOWN;
};

/**
 * Checking fetch errors
 * @param response fetch response
 */
export const errorChecker = (response: Response) => {
  const { ok } = response;

  if (!ok) {
    const message = generateErrorMessage(response);
    throw new Error(message);
  }
};
