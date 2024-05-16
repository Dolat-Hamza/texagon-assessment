const baseUrl = "https://dummyjson.com"

export async function getProducts() {
    var RequestOptions = {
        method: "GET", redirect: "follow",
    }
    try {
        const response = await fetch(`${baseUrl}/products`, RequestOptions)
        return {
            responseCode: response.status, result: await response.json(),
        };
    } catch (error) {
        console.log("error", error);
        return {
            responseCode: null, result: null, error: error,
        };
    }


}

export async function getProductByLimit(limit) {
    var RequestOptions = {
        method: "GET", redirect: "follow",
    }
    try {
        const response = await fetch(`${baseUrl}/products?limit=${limit}`, RequestOptions)
        return {
            responseCode: response.status, result: await response.json(),
        };
    } catch (error) {
        console.log("error", error);
        return {
            responseCode: null, result: null, error: error,
        };
    }
}