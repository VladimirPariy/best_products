import { CharacteristicsModel } from "@/app/characteristics/models/characteristics.model";

class CharacteristicService {
  async getAllCharacteristics() {
    return CharacteristicsModel.query();
  }
}

export default new CharacteristicService();
