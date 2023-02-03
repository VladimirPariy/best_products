import { Router } from "express";
import CharacteristicController from "../characteristics/characteristic.controller";

export const createCharacteristicsRouter = (): Router => {
  const characteristicsRouter = Router();

  characteristicsRouter.get("/", CharacteristicController.getAllCharacteristics);

  return characteristicsRouter;
};
