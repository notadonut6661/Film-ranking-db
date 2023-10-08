import { getNumberOfCharacterMentionInString } from "../utils/getNumberOfCharacterMentionInString";
import { uriParamsType } from "../data/interfaces/uriParams.interface";
import { config } from "dotenv";
import 'dotenv/config';

/**
 * 
 * @param uriParams is an array containing all the parts of uri (part is a term that defines string in uri splitted by "/" sign)   
 */

config();

export class UriDecoder {
  private readonly uriParams: uriParamsType[];

  constructor(_uriParams: uriParamsType[]) {
    this.uriParams = _uriParams;
  }

  /** 
 * @returns Splitted URI without first character slash
 */
  private getSplittedUri(uri: string): Array<string> {
    return uri.replace(/^\//, '').split('/');
  }

  private getTypeOfElementInQuery(el: unknown) {
    let elType = typeof '';

    try {
      elType = typeof JSON.parse(`${el}`);
    } catch {
      elType = el instanceof Object ? "object" : "string";
    }

    return elType;
  }

  private getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams: string): number {
    return Array.from(rowRequestParams.matchAll(/\?=/g)).length ?? 0;
  }

  // FIXME Ich sicher nicht über zweite Parameter
  private getKeyValuePairsAsObject(keyValuePairs: Array<string>, queryInSplittedPathId: number): Record<string, string> | never {
    const result: Record<string, string> = {};  
    const currentQueryElement = this.uriParams[queryInSplittedPathId].type;
    const queryRequiredLength = Object.keys(currentQueryElement).length;  
    let minimalQueryLength = queryRequiredLength;
    
    keyValuePairs.forEach((pair, i) => {
      const [key, value] = pair.split('?=');
      let isElOptional: boolean;

      if (typeof currentQueryElement !== 'object') return;  
      console.log(keyValuePairs, currentQueryElement, queryRequiredLength, key, currentQueryElement.Required   )
      if (keyValuePairs.length < minimalQueryLength) {
        throw new Error("");
      }
      
      if (!Object.prototype.hasOwnProperty.call(currentQueryElement.Required, key) && !Object.prototype.hasOwnProperty.call(currentQueryElement?.Optional ||  {}, key)) {
        throw Error("I FUCKING HATE YOU")
      } else {
        isElOptional = Object.prototype.hasOwnProperty.call(currentQueryElement.Optional ?? {}, key);
      }

      if (isElOptional && (currentQueryElement.Optional === undefined || currentQueryElement.Optional[key].type === this.getTypeOfElementInQuery(value))) {
        throw new Error("KURWA");
      }

      if (currentQueryElement.Required[key] !== this.getTypeOfElementInQuery(value)) {
        throw new Error("KURWA 123");
      }
      
      result[key] = value;
      minimalQueryLength = isElOptional ? minimalQueryLength+1 : minimalQueryLength;
    });

    return result;
  }

  private ValidateURIParams(rowRequestParams: string): void {
    const keyValuePairInElementQuantity = this.getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams);
    const totalQEMarksQuantity = (getNumberOfCharacterMentionInString(rowRequestParams, '?') + getNumberOfCharacterMentionInString(rowRequestParams, '='));

    if ((totalQEMarksQuantity / 2) !== keyValuePairInElementQuantity) {
      throw new Error('Not needed question or equal marks in request');
    }
  }


  private organizeDecodedURI(decodedURI: Array<string | Record<string, string>>): Record<string, string | Record<string, string>> {
    const organizedDecodedURI: Record<string, string | Record<string, string>> = {};

    if (this.uriParams.length !== decodedURI.length) {
      throw new Error('Decoded URI length is different from expected');
    }

    decodedURI.forEach((el, i) => {
      if (!this.uriParams) return;

      const elType = this.getTypeOfElementInQuery(el);

      if (elType !== this.uriParams[i].type && elType !== "object") {
        throw new Error('Request param\'s type is wrong');
      }

      organizedDecodedURI[this.uriParams[i].name] = el;
    });


    return organizedDecodedURI;
  }

  /**
   * @returns If this.uriParams is undefined in constructor it returns array with path parts, and with object if it has ?= params, but if it's then the method returns an object with named path parts and sub-object with params
   */
  public Decode(uri: string): Record<string, string | Record<string, string>> {

    const decodedURI: Array<string | Record<string, string>> = this.getSplittedUri(uri).map((el, index) => {

      if (!this.getQuantityOfKeyValuePairsInRowRequestParams(el)) {
        return el;
      }

      this.ValidateURIParams(el);

      return this.getKeyValuePairsAsObject(el.split(process.env.QUERY_SEPARATOR), index);
    });

    return this.organizeDecodedURI(decodedURI);
  }

}
