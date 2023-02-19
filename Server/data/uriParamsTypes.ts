import { RequestTypes } from './requestTypes.interface';
import uriParamsTypeJSON from './requests.json';

export const uriParamsType = uriParamsTypeJSON as Record<string, RequestTypes>;
