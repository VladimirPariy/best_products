import { IParameters } from "lib/interfaces/parameters.interface";

export interface ICharacteristics {
  characteristic_id: number;
  characteristic_title: string;
  parameter: number;
}

export interface ICharacteristicsWithParameters
  extends Omit<ICharacteristics, "parameter"> {
  parameters: Omit<IParameters, "subcategory" | "characteristics">;
}

export interface IFullCharacteristicsWithParameters extends ICharacteristics {
  parameters: Omit<IParameters, "characteristics">;
}
