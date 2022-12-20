import {HttpException} from "@/app/common/errors/exceptions";
import {ProductsImagesModel} from "@/app/product/models/products-images.model";
import {PriceHistoryModel} from "@/app/product/models/price-history.model";
import {ProductsModel} from "@/app/product/models/products.model";
import {ProductSubcategoryModal} from "@/app/categories/models/subcatigories.model";
import fileUpload, {UploadedFile} from "express-fileupload";
import path from "path";
import {v4 as uuidv4} from "uuid";

interface IInfoForCreateProduct {
  category: string
  subcategory: string
  productTitle: string
  productDescription: string
  price: string
  characteristics: string
}


class ProductService {

  async createNewProduct(body: IInfoForCreateProduct, files: fileUpload.FileArray | null | undefined) {
    const {category, subcategory, productTitle, productDescription, price, characteristics} = body;
    if (!category || !subcategory || !productTitle || !productDescription || !price || !characteristics) {
      return HttpException.badRequest('Missing required fields')
    }
    const product = await ProductsModel.query().insert({product_title: productTitle, product_description: productDescription, price: +price});

    const productHistory = await PriceHistoryModel.query().insert({price_at_timestamp: +price, product: product.$id()});
    const productSubcategories = await ProductSubcategoryModal.query().insert({product: product.$id(), subcategory: +subcategory});

    if (files) {
      for (const img in files) {
        const fileName = `${uuidv4()}.jpg`
        await (files[img] as UploadedFile).mv(path.resolve(__dirname, "..", "..", "static", fileName))
        const productImage = await ProductsImagesModel.query().insert({product: product.$id(), image_title: fileName})
        if (!productImage) return HttpException.internalServErr(`Unsuccessful inserting data into the table "products_image"`);
      }
    }
    if (!product || !productHistory || !productSubcategories) {
      return HttpException.internalServErr(`Unsuccessful inserting data into table`);
    }

    return 'Data successfully inserted'

  }

}

export default new ProductService();
