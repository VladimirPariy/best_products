import { CharacteristicsModel } from "./models/characteristics.model";

export default class CharacteristicService {
  async getAllCharacteristics() {
    return CharacteristicsModel.query();
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
