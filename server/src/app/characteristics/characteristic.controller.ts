import { Response, Request } from "express";
import CharacteristicService from "../characteristics/characteristic.service";

export default class CharacteristicController {
  private static instance: CharacteristicController;

  private constructor() {}

  public static getInstance(): CharacteristicController {
    if (!CharacteristicController.instance) {
      CharacteristicController.instance = new CharacteristicController();
    }
    return CharacteristicController.instance;
  }

  async getAllCharacteristics(req: Request, res: Response) {
    const data =
      await CharacteristicService.getInstance().getAllCharacteristics();
    res.status(200).send(data);
  }
}
