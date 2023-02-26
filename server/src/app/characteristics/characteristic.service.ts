import { knexInstance } from "../../database/connectingDb";
import { IInsertCharacteristic } from "../products/product.interfaces";
import { CharacteristicsModel } from "./models/characteristics.model";
import { ProductCharacteristicModel } from "./models/product-characteristics.model";

export default class CharacteristicService {
  async getAllCharacteristics() {
    return CharacteristicsModel.query();
  }

  async removeProductCharacteristics(id: number) {
    return ProductCharacteristicModel.query().del().where("product", id);
  }

  async batchInsertCharacteristics(characteristics: IInsertCharacteristic[]) {
    return knexInstance("product_characteristics").insert(characteristics);
  }

  //singleton
  private static instance: CharacteristicService;
  private constructor() {}
  public static getInstance(): CharacteristicService {
    if (!CharacteristicService.instance) {
      CharacteristicService.instance = new CharacteristicService();
    }
    return CharacteristicService.instance;
  }
}
