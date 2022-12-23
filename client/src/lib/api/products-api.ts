import {authAxios, defaultAxios} from "lib/api/axios-instances";
import {ApiUrls} from "lib/enums/api-urls";

class ProductsApi{

  async getAllProducts(){
    const {data} = await defaultAxios.get(ApiUrls.allProducts)
    return data
  }

  async removeOneProduct(id:number){
    return authAxios.delete(`${ApiUrls.productById}${id}`)
  }
}

export default new ProductsApi();