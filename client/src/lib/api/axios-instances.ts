import axios from "axios";
import { ApiUrls } from "lib/enums/api-urls";

export const defaultAxios = axios.create({ baseURL: ApiUrls.BASE_URL });
