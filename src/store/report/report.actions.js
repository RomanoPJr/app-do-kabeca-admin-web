import axios from "../../axios";

const endpoint = "/report";

const artilharia = async payload => {
  const { data } = await axios().get(`${endpoint}/artilharia`, {
    params: {
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize,
      dateStart: payload.dateStart,
      dateEnd: payload.dateEnd
    }
  });

  return data;
};

const jogadores = async payload => {
  const { data } = await axios().get(`${endpoint}/jogadores`, {
    params: {
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize
    }
  });

  return data;
};

const financeiro = async payload => {
  const { data } = await axios().get(`${endpoint}/financeiro`, {
    params: {
      pageNumber: payload.pageNumber,
      pageSize: payload.pageSize,
      dateStart: payload.dateStart,
      dateEnd: payload.dateEnd
    }
  });

  return data;
};
export default {
  artilharia,
  jogadores,
  financeiro
};
