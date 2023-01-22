import { Response, Request } from "express";
import CharacteristicService from "@/app/characteristics/characteristic.service";

class CharacteristicController {
  async getAllCharacteristics(req: Request, res: Response) {
    const data = await CharacteristicService.getAllCharacteristics();
    res.status(200).send(data);
  }
}

export default new CharacteristicController();
