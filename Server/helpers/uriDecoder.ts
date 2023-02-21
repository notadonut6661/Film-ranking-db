import { getNumberOfCharacterMentionInString } from "../utils/getNumberOfCharacterMentionInString";
import { uriParamsType } from "data/uriParams.interface";
/**
 * 
 * @param uriParams is an array containing all the parts of uri (part is a term that defines string in uri splitted by / sign)   
 */


export class uriDecoder {
  private uriParams: uriParamsType[];

  constructor(_uriParams: uriParamsType[]) {
    this.uriParams = _uriParams;
  }

  /** 
 * @returns Splitted URI without first character slash
 */
  private getSplittedUri(uri: string): Array<string> {
    return uri.replace(/^\//, '').split('/');
  }

  private getQuantityOfKeyValuePairsInRowRequestParams(rowRequestParams: string): number {
    return Array.from(rowRequestParams.matchAll(/\?=/g)).length ?? 0;
  }




  private getKeyValuePairsAsObject(keyValuePairs: Array<string>): Record<string, string> {
    const result: Record<string, string> = {}

    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('?=');

      result[key] = value;
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

      let elType = typeof '';

      try {
        elType = typeof JSON.parse(`${el}`);
      } catch {
        elType = el instanceof Object ? "object" : "string";
      }

      if (elType !== this.uriParams[i].type) {
        throw new Error('Request param\'s type is wrong');
      }

      organizedDecodedURI[this.uriParams[i].name] = el;
    });


    return organizedDecodedURI;
  }

  /**
   * @returns If this.uriParams is undefined in constructor it returns array with path parts, and with object if it has ?= params, but if it is then it return object with named path parts and sub-object with params
   */
  public Decode(uri: string): Record<string, string | Record<string, string>> {
    const decodedURI: Array<string | Record<string, string>> = this.getSplittedUri(uri).map(el => {
      if (!this.getQuantityOfKeyValuePairsInRowRequestParams(el)) {
        return el;
      }

      this.ValidateURIParams(el);

      // FIXME Magic char
      return this.getKeyValuePairsAsObject(el.split('&'));
    });

    return this.organizeDecodedURI(decodedURI);
  }

}
