import { ICharacteristics } from "lib/interfaces/characteristics/characteristic";

export interface IParameters {
  characteristics: ICharacteristics[];
  parameter_id: number;
  parameter_title: string;
  subcategory: number;
}
