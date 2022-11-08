import {
  DisplaySizeName,
  ImageSize,
  OnConfirm,
  OnError,
  SearchImagesEndpoint,
  SearchImagesParams,
} from '@pesdk/getty-images';
import { Configuration } from 'photoeditorsdk';

export interface IntegrationGettyConfiguration extends Configuration {
  /**
   * Public getty images api key
   */
  gettyAPIKey: string;
  /**
   * URL that returns OAuth token
   */
  gettyTokenURL?: string;
  /**
   * Promise that returns OAuth token
   */
  fetchToken?: () => Promise<string>;
  /**
   * Configure image search params
   * Typescript types https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/api/searchImages.ts
   * Getty API https://api.gettyimages.com/swagger/index.html#Images
   */
  searchParams?: SearchImagesParams;
  /**
   * Image size to generate editor preview, defaults to: DisplaySizeName.High = 'high_res_comp'
   */
  displaySize?: DisplaySizeName;
  /**
   * Image size to generate final output, defaults to: ImageSize.Large = 'large'
   */
  imageSize?: ImageSize;
  /**
   * Set the default endpoint for the image search. If no value is set, all images will be searched on initialization
   */
  endpoint?: SearchImagesEndpoint;
  /**
   * Handle errors occurred during API call
   * https://github.com/imgly/pesdk-web-plugins/tree/main/plugins/getty-images/src/types.ts
   */
  onError?: OnError;
  /**
   * Function to be called before licensing an image
   * {function} callback to license an image
   * {GettyImage} image data object
   * {function} callback to trigger the licensing of the image
   * {function} callback to trigger an export for the currently loaded image
   */
  onConfirm?: OnConfirm;
}
