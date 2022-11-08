import React, { useEffect, useState } from 'react';
import {
  PhotoEditorSDKUI,
  EditorApi,
  UIEvent,
  DisplaySizeName,
  ImageSize,
  ImageFormat,
  ExportFormat,
} from '@pesdk/getty-images-integration';

export const Export: React.FC = () => {
  const [editor, setEditor] = useState<EditorApi>();
  useEffect(() => {
    const initEditor = async () => {
      const editor = await PhotoEditorSDKUI.init({
        gettyAPIKey: import.meta.env.VITE_APP_API_KEY,
        gettyTokenURL: 'http://localhost:9191/token',
        /**
         * image size for editor preview
         * can be one of the following values:
         * 'thumb',
         * 'preview',
         * 'comp',
         * 'mid_res_comp',
         * 'high_res_comp'
         */
        displaySize: DisplaySizeName.Comp,
        /**
         * image size to generate final output
         * can be one of the following values:
         * 'x_small',
         * 'small',
         * 'medium',
         * 'large',
         * 'x_large',
         * 'xx_large',
         */
        imageSize: ImageSize.Large,
        onConfirm: async (onExportLicensedImage, image, onLicense, onClick) => {
          // default
          onExportLicensedImage();
          // use onExportLicenseImage if you want to download the image and load it into the image editor
          // this function will return the URL for the licensed image
          // const uri = await onExportLicensedImage();

          // use onLicense if you want to license the image and return the URL
          // this function will not load the image into the editor
          // const uri = await onLicense();

          // calling onClick will trigger the export event that can be used to save a serialization
          // onClick();
        },
        export: {
          image: {
            enableDownload: false,
            format: ImageFormat.JPEG,
            exportType: ExportFormat.DATA_URL,
          },
        },
      });
      setEditor(editor);
    };
    initEditor();
  }, []);

  useEffect(() => {
    if (!editor) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editor.on(UIEvent.EXPORT, async img => {
      alert('Image exported!');
    });
  }, [editor]);

  return <div className="editor" />;
};
