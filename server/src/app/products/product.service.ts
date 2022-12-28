import {v4 as uuidv4} from "uuid";
import path from "path";
import fileUpload, {UploadedFile} from "express-fileupload";
import {HttpException} from "@/app/common/errors/exceptions";
import {ProductsModel} from "@/app/products/models/products.model";
import {
	ICharacteristic,
	IInfoForCreateProduct,
	IPriceHistory,
	IProductImage,
	IProductSubcategory
} from "@/app/products/product.interfaces";
import {CategoriesModel} from "@/app/categories/models/categories.model";
import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";
import {ProductsImagesModel} from "@/app/products/models/products-images.model";
import {TempImagesModel} from "@/app/products/models/temp-images.model";


class ProductService {
	
	async getAllProducts() {
		const products = await ProductsModel.query().withGraphFetched('product_images');
		if (!products.length) {
			return HttpException.internalServErr('Unsuccessful selecting data from table')
		}
		return products
	}
	
	async createNewProduct(body: IInfoForCreateProduct, files: fileUpload.FileArray | null | undefined) {
		const {
			category,
			subcategory,
			productTitle,
			productDescription,
			price,
			characteristics
		} = body;
		console.log(body.characteristics.length)
		if (!category || !subcategory || !productTitle || !productDescription || !price || characteristics.length < 3) {
			return HttpException.badRequest('Missing required fields')
		}
		
		const modifyCharacteristicsObject = (JSON.parse(characteristics) as ICharacteristic[])
			.map(item => {
					const {
						characteristic_description,
						characteristic_title,
						...rest
					} = item
					return {characteristic_description, characteristic_title}
				}
			)
		
		let images: IProductImage[] = [];
		if (files) {
			for (const img in files) {
				
				const fileName = `${uuidv4()}.jpg`
				await (files[img] as UploadedFile)
					.mv(path.resolve(__dirname, "..", "..", "static", fileName))
				images = [...images, {image_title: fileName, size: (files[img] as UploadedFile).size, original_title: (files[img] as UploadedFile).name}]
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
	
	async removeOneProduct(id: string) {
		if (!id) {
			return HttpException.badRequest("Missing product id")
		}
		const product = await ProductsModel.query().findById(id)
		if (product && Object.keys(product).length) {
			await product.$relatedQuery('price_history').del();
			await product.$relatedQuery('product_images').del();
			await product.$relatedQuery('product_characteristics').del();
			await product.$relatedQuery('product_subcategory').del();
			await product.$relatedQuery('comments').del();
			await product.$relatedQuery('feedbacks').del();
			await product.$relatedQuery('favorite_products').del();
			await product.$relatedQuery('views').del();
			await product.$query().del()
		} else {
			return HttpException.notFound(`Product not found`);
		}
		return 'Product was successfully deleted'
	}
	
	async getProductById(id: number) {
		if (!id) {
			return HttpException.badRequest("Missing product id")
		}
		const product = await ProductsModel.query().findById(id)
		if (!product) {
			return HttpException.internalServErr(`Unsuccessful selecting data into table`);
		}
		const priceHistory = await product.$relatedQuery('price_history');
		const productImages = await product.$relatedQuery('product_images');
		const productCharacteristics = await product.$relatedQuery('product_characteristics');
		const productSubcategory = await product.$relatedQuery('subcategories') as SubcategoryModel[]
		const subCatId = productSubcategory[0].category
		const productCategory = await CategoriesModel.query().where('categories.category_id', '=', subCatId)
		
		const prod = {
			...product,
			price_history: priceHistory,
			product_images: productImages,
			product_characteristics: productCharacteristics,
			product_subcategory: productSubcategory,
			category: productCategory,
		}
		
		return prod
	}
	
	async uploadImage(id: number, file: fileUpload.FileArray | null | undefined) {
		if (!id || !file) {
			return HttpException.badRequest("Missing product id or file")
		}
		if (Object.keys(file).length > 1) {
			return HttpException.badRequest("Upload one file")
		}
		
		for (const img in file) {
			const fileName = `${uuidv4()}.jpg`
			await (file[img] as UploadedFile).mv(path.resolve(__dirname, "..", "..", "static", fileName))
			
			const image = await ProductsImagesModel.query().insert({
				product: id,
				size: (file[img] as UploadedFile).size,
				original_title: (file[img] as UploadedFile).name,
				image_title: fileName
			})
			if (!Object.keys(image).length) {
				return HttpException.internalServErr(`Unsuccessful inserting data into table`)
			}
			
			return image
		}
	}
	
	async removeImage(id: number) {
		if (!id) {
			return HttpException.badRequest("Missing image id")
		}
		const removed = await ProductsImagesModel.query().del().where({image_id: id})
		return {removed}
	}
	
	async uploadTempImages(file: fileUpload.FileArray | null | undefined) {
		if (!file) {
			return HttpException.badRequest("Missing file")
		}
		if (Object.keys(file).length > 1) {
			return HttpException.badRequest("Upload one file")
		}
		
		for (const img in file) {
			const fileName = `${uuidv4()}.jpg`
			await (file[img] as UploadedFile).mv(path.resolve(__dirname, "..", "..", "static", fileName))
			
			const image = await TempImagesModel.query().insert({
				size: (file[img] as UploadedFile).size,
				original_title: (file[img] as UploadedFile).name,
				image_title: fileName
			})
			if (!Object.keys(image).length) {
				return HttpException.internalServErr(`Unsuccessful inserting data into table`)
			}
			
			return image
		}
	}
	
	async updateOneProduct(id: string) {
		if (!id) {
			return HttpException.badRequest("Missing product id")
		}
	}
	
}

export default new ProductService();
