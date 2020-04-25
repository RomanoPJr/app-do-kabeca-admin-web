export const getError = (error) => {
  const { response, error: rootError } = error;
  return response && response.data ? response.data.error : rootError;
};
