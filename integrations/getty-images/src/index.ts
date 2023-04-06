import type { EditorApi } from 'photoeditorsdk/no-polyfills';
import { PhotoEditorSDKUI as PESDK } from 'photoeditorsdk/no-polyfills';
import { getSDKConfig } from './getSDKConfig';
import type { IntegrationGettyConfiguration } from './types';

export * from '@pesdk/getty-images';

export * from 'photoeditorsdk/no-polyfills';

export const PhotoEditorSDKUI = {
  init: (
    integrationConfig: IntegrationGettyConfiguration,
  ): Promise<EditorApi> => {
    const config = getSDKConfig(integrationConfig);

    return PESDK.init(config);
  },
};
