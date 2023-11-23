const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const textError = {
  [HttpMethod.GET]: 'Не удалось получить данные с сервера.',
  [HttpMethod.POST]: 'Не удалось отправить данные на сервер.',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(textError[method]);
  }

  return response.json();
};


const loadPictures = async () => request(SERVER_URL + serverRoute.GET_DATA);

const sendPictures = async (pictureData) => request(SERVER_URL + serverRoute.SEND_DATA, HttpMethod.POST, pictureData);

export { loadPictures, sendPictures };
