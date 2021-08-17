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

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/product/" + params.shopId + "/" + params.productId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByShop, remove };
