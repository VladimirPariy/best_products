import { getCharacteristics } from "lib/api/characteristics-api";
import { getParameters } from "lib/api/parameters-api";
import { ICharacteristics } from "lib/interfaces/characteristic.interface";
import { IParameters } from "lib/interfaces/parameters.interface";
import { useEffect, useState } from "react";
import { clearProductControl } from "store/product-control/product-control-actions";
import { useAppDispatch } from "lib/interfaces/store.types";

export const useAllParameters = () => {
  const dispatch = useAppDispatch();
  const [allParameters, setAllParameters] = useState<IParameters[]>([]);
  const [allCharacteristics, SetAllCharacteristics] = useState<
    ICharacteristics[]
  >([]);

  useEffect(() => {
    const fetchParametersAndCharacteristics = async () => {
      setAllParameters(await getParameters());
      SetAllCharacteristics(await getCharacteristics());
    };
    fetchParametersAndCharacteristics();
    return () => {
      dispatch(clearProductControl());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { allParameters, allCharacteristics };
};
