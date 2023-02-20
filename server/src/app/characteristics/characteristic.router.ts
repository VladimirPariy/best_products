import { Router } from "express";
import CharacteristicController from "../characteristics/characteristic.controller";

export const createCharacteristicsRouter = (): Router => {
  const characteristicsRouter = Router();

  const instanceCharacteristicController = CharacteristicController.getInstance();

  characteristicsRouter.get("/", instanceCharacteristicController.getAllCharacteristics);

  return characteristicsRouter;
};
