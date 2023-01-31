import { CharacteristicsModel } from "./models/characteristics.model";

class CharacteristicService {
  async getAllCharacteristics() {
    return CharacteristicsModel.query();
  }
}

export default new CharacteristicService();
