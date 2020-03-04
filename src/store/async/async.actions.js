export const fetchRequest = type => {
  return {
    type
  };
};
export const fetchSuccess = (type, payload = {}) => {
  return {
    type,
    payload
  };
};
export const fetchFailure = (type, error) => {
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
