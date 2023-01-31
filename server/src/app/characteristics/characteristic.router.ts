import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import { checkRole } from "../common/middlewares/role-middleware";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import CharacteristicController from "../characteristics/characteristic.controller";

export const createCharacteristicsRouter = (): Router => {
  const characteristicsRouter = Router();

  characteristicsRouter.get(
    EndpointsList.CHARACTERISTICS,
    [checkRole("1"), authenticateJWT],
    CharacteristicController.getAllCharacteristics
  );

  return characteristicsRouter;
};
