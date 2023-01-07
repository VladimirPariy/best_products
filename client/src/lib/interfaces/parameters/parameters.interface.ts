interface ICharacteristicsDataFromServer {
  characteristic_id: number;
  characteristic_title: string;
  parameter: number;
}

export interface IParametersDataFromServer {
  characteristics: ICharacteristicsDataFromServer[];
  parameter_id: number;
  parameter_title: string;
  subcategory: number;
}
