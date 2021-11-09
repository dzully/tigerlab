export const instruments = (
  uri: string,
  handleResponse: Function,
  handleError?: Function
) => {
  setTimeout(async () => {
    let request: any;
    let response: any;
    let pagination: any;

    try {
      request = await fetch(uri);
      response = await request.json();
    } catch (error) {
      throw error;
    } finally {
      if (request?.ok && response) {
        handleResponse(response, pagination);
      } else if (handleError) {
        handleError(true, response);
      }
    }
  }, 1000);
};

export const instrumentsPost = (
  uri: string,
  postData: Object,
  handleResponse: Function,
  handleError?: Function
) => {
  setTimeout(async () => {
    let request: any;
    let response: any;

    try {
      request = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(postData),
      });
      response = await request.json();
    } catch (error) {
      throw error;
    } finally {
      if (request?.ok && response) {
        handleResponse(response);
      } else if (handleError) {
        handleError(true, response);
      }
    }
  }, 1000);
};
