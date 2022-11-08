# Getty Library SDK

This plugin helps to integrate Getty Images API into PhotoEditor SDK.

## Prerequisite

You need to use your backend endpoint that provides an [OAuth token](https://developer.gettyimages.com/docs/oauth-2.0/) for the Getty Images API.

## Getting Started

### Install the Package

```shell
yarn add @pesdk/getty-images-integration
```
or 
```
npm install --save @pesdk/getty-images-integration
```

### Add the container to your application

```html
<div id="editor" style="position: relative, width: 100vw, height: 100vh" />
```

### Initialize the Getty Library SDK

```typescript
import { PhotoEditorSDKUI } from '@pesdk/getty-images-integration';

await PhotoEditorSDKUI.init({
  gettyAPIKey: "<YOUR_GETTY_API_KEY>",
  gettyTokenURL: `${window.location.href}/token`,
  container: "#editor",
});
```

## Examples

[Getty Library SDK example](https://github.com/imgly/pesdk-web-integrations/tree/main/integrations/getty-images/example)

## PhotoEditor SDK Documentation
Visit our [docs](https://img.ly/docs/pesdk/)

## License
Please see [LICENSE](https://github.com/imgly/pesdk-web-integrations/tree/main/integrations/getty-images/LICENSE.md) for licensing details.

## Support and License
Use our [service desk](https://img.ly/support) for bug reports or support requests.
