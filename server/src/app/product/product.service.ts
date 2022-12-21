import {HttpException} from "@/app/common/errors/exceptions";
import {ProductsModel} from "@/app/product/models/products.model";
import {ICharacteristic, IInfoForCreateProduct, IPriceHistory, IProductImage, IProductSubcategory} from "@/app/product/product.interfaces";
import fileUpload, {UploadedFile} from "express-fileupload";
import path from "path";
import {v4 as uuidv4} from "uuid";


class ProductService {

  async createNewProduct(body: IInfoForCreateProduct, files: fileUpload.FileArray | null | undefined) {
    const {
      category,
      subcategory,
      productTitle,
      productDescription,
      price,
      characteristics
    } = body;

    if (!category || !subcategory || !productTitle || !productDescription || !price || characteristics.length < 2) {
      return HttpException.badRequest('Missing required fields')
    }

    const modifyCharacteristicsObject = (JSON.parse(characteristics) as ICharacteristic[]).map(item => {
        const {characteristic_description, characteristic_title, ...rest} = item
        return {characteristic_description, characteristic_title}
      }
    )
    let images: IProductImage[] = [];
    if (files) {
      for (const img in files) {
        const fileName = `${uuidv4()}.jpg`
        await (files[img] as UploadedFile).mv(path.resolve(__dirname, "..", "..", "static", fileName))
        images = [...images, {image_title: fileName}]
      }
    }

    const price_history: IPriceHistory = {price_at_timestamp: +price}
    const product_subcategory: IProductSubcategory = {subcategory: +subcategory}


    const prod = await ProductsModel.query().insertGraph({
      product_title: productTitle,
      product_description: productDescription,
      price: +price,
      product_characteristics: modifyCharacteristicsObject,
      product_images: images,
      price_history: [price_history],
      product_subcategory: [product_subcategory]
    })


    if (!prod) {
      return HttpException.internalServErr(`Unsuccessful inserting data into table`);
    }

    return 'Data successfully inserted'

  }

}

export default new ProductService();
