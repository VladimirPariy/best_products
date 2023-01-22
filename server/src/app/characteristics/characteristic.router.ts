import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import { checkRole } from "@/app/common/middlewares/role-middleware";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import CharacteristicController from "@/app/characteristics/characteristic.controller";

export const createCharacteristicsRouter = (): Router => {
  const characteristicsRouter = Router();

  characteristicsRouter.get(
    EndpointsList.CHARACTERISTICS,
    [checkRole("1"), authenticateJWT],
    CharacteristicController.getAllCharacteristics
  );

  return characteristicsRouter;
};
