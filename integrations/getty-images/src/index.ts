import type { EditorApi } from 'photoeditorsdk';
import { PhotoEditorSDKUI as PESDK } from 'photoeditorsdk';
import { getSDKConfig } from './getSDKConfig';
import type { IntegrationGettyConfiguration } from './types';

export * from '@pesdk/getty-images';

export * from 'photoeditorsdk';

export const PhotoEditorSDKUI = {
  init: (
    integrationConfig: IntegrationGettyConfiguration,
  ): Promise<EditorApi> => {
    const config = getSDKConfig(integrationConfig);

    return PESDK.init(config);
  },
};
