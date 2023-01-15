import {ICharacteristicsWithParameters} from "lib/interfaces/characteristics/characteristic";
import React, {FC} from "react";

interface Props {
  characteristics: ICharacteristicsWithParameters[];
}

const ProductShotCharacteristics: FC<Props> = ({characteristics}) => {
  const parameters = new Set(characteristics.map(item => item.parameters.parameter_title))
  const modifyParams = [...parameters].map(parameter => {
    return {
      parameter: parameter,
      characteristics: characteristics
      .filter(item => item.parameters.parameter_title === parameter)
      .map(item => item.characteristic_title)
    }
  })
  console.log(modifyParams)
  return (
    <div>
      {
        modifyParams.map(item => (
          <div>
            <span>{item.parameter}</span>
            <span>{item.characteristics.join(', ')}</span>
          </div>
        ))
      }
    </div>
  );
};

export default ProductShotCharacteristics;