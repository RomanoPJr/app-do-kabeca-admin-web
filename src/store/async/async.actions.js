export const request = type => {
  return {
    type
  };
};
export const requestSuccess = (type, payload = {}) => {
  return {
    type,
    payload
  };
};
export const requestFailure = (type, error) => {
  return {
    type,
    payload: error
  };
};
export const setState = (type, payload) => {
  return {
    type,
    payload
  };
};
