const create = async (params, credentials, product) => {
  try {
    let response = await fetch("/api/products/by/" + params.shopId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByShop = async (params, signal) => {
  try {
    let response = await fetch("/api/products/by/" + params.shopId, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByShop };
