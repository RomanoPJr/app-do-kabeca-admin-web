const send = type => {
  return {
    type
  };
};

const success = (type, payload = {}) => {
  return {
    type,
    payload
  };
};

const failure = (type, error) => {
  return {
    type,
    payload: error
  };
};

const setState = (type, payload) => {
  return {
    type,
    payload
  };
};

export default {
  send,
  success,
  failure,
  setState
};
