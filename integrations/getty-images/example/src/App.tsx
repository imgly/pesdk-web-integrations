import React, { useEffect, useState } from 'react';
import {
  PhotoEditorSDKUI,
  EditorApi,
  UIEvent,
} from '@pesdk/getty-images-integration';

export const App: React.FC = () => {
  const [editor, setEditor] = useState<EditorApi>();
  useEffect(() => {
    const initEditor = async () => {
      const editor = await PhotoEditorSDKUI.init({
        gettyAPIKey: import.meta.env.VITE_APP_API_KEY,
        gettyTokenURL: 'http://localhost:9191/token',
        container: '#editor',
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

  return <div id="editor" />;
};
