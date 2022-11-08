import React from 'react';

import {
  createGettyImagesToolbar,
  createGettyImagesExportButton,
  SortOrder,
  GettyImagesMetaInformation,
  OnError,
  OnConfirm,
  ImageSize,
  DisplaySizeName,
  SearchImagesEndpoint,
} from '@pesdk/getty-images';
import {
  Configuration,
  ExportFormat,
  Tool,
  AdvancedTransformControlBarItem,
  CustomWindowContainerProps,
  deepmergeAll,
} from 'photoeditorsdk/no-polyfills';
import { GettyIcon } from './components/GettyIcon';
import { AdvancedToolControlBar } from './components/AdvancedToolControlBar';
import { getMeasurements } from './utils/getMeasurements';
import { IntegrationGettyConfiguration } from './types';

const CustomWindowContainer: React.FC<CustomWindowContainerProps> = ({
  tool,
  children,
}) => (
  <>
    {children}
    {tool === Tool.CUSTOM && <GettyImagesMetaInformation />}
  </>
);

const defaultOnConfirm: OnConfirm = onLicense => {
  onLicense();
};

const defaultOnError: OnError = num => {
  console.log(`Caught error ${num}`);
};

const defaultFetchToken = (gettyTokenURL: string) => () => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  };

  /**
   * For testing purpose you can get the token via API from https://api.gettyimages.com/oauth2/token
   * and use Promise.resolve to return the valid token
   */

  return fetch(gettyTokenURL, requestOptions)
    .then(response => response.json())
    .then(r => r.access_token);
};

export const getSDKConfig = ({
  gettyAPIKey,
  gettyTokenURL,
  fetchToken,
  onError,
  onConfirm,
  searchParams,
  container,
  imageSize = ImageSize.Large,
  displaySize = DisplaySizeName.High,
  endpoint = SearchImagesEndpoint.Creative,
  ...externalConfig
}: IntegrationGettyConfiguration) => {
  if (!fetchToken && !gettyTokenURL) {
    console.warn(
      'The client is not able to access the Getty API if gettyTokenURL or fetchToken is not provided.',
    );
  }

  const GettyToolbar = createGettyImagesToolbar({
    apiKey: gettyAPIKey,
    fetchToken: fetchToken || defaultFetchToken(gettyTokenURL || ''),
    searchParams: {
      sort_order: SortOrder.BestMatch,
      orientations: [],
      phrase: 'Adventure',
      ...searchParams,
    },
    showFilters: true,
    displaySize,
    onError: onError || defaultOnError,
    endpoint,
  });

  const GettyExportBtn = createGettyImagesExportButton({
    onConfirm: onConfirm || defaultOnConfirm,
    imageSize,
  });

  const license = window.atob(import.meta.env.VITE_APP_PESDK_LICENSE);

  const [columns, measurements, customMeasurements] =
    getMeasurements(container);

  const config: Configuration = {
    container,
    license,
    assetBaseUrl:
      'https://cdn.img.ly/packages/imgly/photoeditorsdk/latest/assets',
    image: '',
    defaultTool: Tool.CUSTOM,
    tools: [Tool.CUSTOM, Tool.TRANSFORM],
    [Tool.CUSTOM]: {
      icon: GettyIcon,
      toolControlBar: GettyToolbar,
      measurements: customMeasurements,
    },
    transform: {
      advancedUIToolControlBarOrder: [
        AdvancedTransformControlBarItem.ResetTransformButton,
        AdvancedTransformControlBarItem.Separator,
        AdvancedTransformControlBarItem.Items,
      ],
    },
    export: {
      image: {
        enableDownload: false,
        exportType: ExportFormat.DATA_URL,
      },
    },
    custom: {
      components: {
        buttons: {
          mainCanvasActionExport: GettyExportBtn,
        },
        windowContainer: CustomWindowContainer,
        advancedUIToolControlBar: props => (
          <AdvancedToolControlBar {...props} columns={columns} />
        ),
      },
      languages: {
        en: {
          customTool: {
            title: 'Getty Images',
            placeholder: 'Search the world’s best images',
          },
          mainCanvasActions: {
            buttonExport: 'License Image',
          },
        },
      },
      measurements,
    },
  };

  const mergedConfig: Configuration = deepmergeAll([config, externalConfig]);

  // Tool.CUSTOM has to be present in the configuration for integration to work
  if (!mergedConfig.tools) {
    mergedConfig.tools = [Tool.CUSTOM];
  } else {
    const customInTools: boolean = mergedConfig.tools.some(value => {
      // test if Tool.CUSTOM is part of the tools array
      if (typeof value === 'string' && value === Tool.CUSTOM) {
        return true;
      }
      // test if Tool.CUSTOM is part of a category in the tools array
      if (Array.isArray(value) && value.includes(Tool.CUSTOM)) {
        return true;
      }
      return false;
    });

    if (!customInTools) {
      mergedConfig.tools = [Tool.CUSTOM, ...mergedConfig.tools];
    }
  }

  return mergedConfig;
};
