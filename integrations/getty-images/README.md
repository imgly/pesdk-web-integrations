# Getty Images Library SDK

The Getty Images Library SDK lets your users easily search, license and edit stock photos from Getty's creative and editorial libraries.

Users can find and license images through an easy to use search interface without leaving your application or website. 
Export the licensed images to your application for further processing whether you are powering content creation or graphic design.

## Prerequisite

You need to use your backend endpoint that provides an [OAuth token](https://developer.gettyimages.com/docs/oauth-2.0/) for the Getty Images API.

## Getting Started

### Install the Package

```shell
yarn add @pesdk/getty-images-integration @pesdk/getty-images photoeditorsdk react react-dom
```
or 
```shell
npm install --save @pesdk/getty-images-integration @pesdk/getty-images photoeditorsdk react react-dom
```

### Add the container to your application

```html
<div id="editor" style="position: relative, width: 100vw, height: 100vh" />
```

### Initialize the Getty Images Library SDK

```typescript
import { PhotoEditorSDKUI } from '@pesdk/getty-images-integration';

await PhotoEditorSDKUI.init({
  gettyAPIKey: "<YOUR_GETTY_API_KEY>",
  gettyTokenURL: `${window.location.href}/token`,
  container: "#editor",
  assetBaseUrl: "https://cdn.img.ly/packages/imgly/photoeditorsdk/5.17.3/assets",
});
```

## Examples

[Getty Images Library SDK example](https://github.com/imgly/pesdk-web-integrations/tree/main/integrations/getty-images/example)

## PhotoEditor SDK Documentation
Visit our [docs](https://img.ly/docs/pesdk/)

## License
Please see [LICENSE](https://github.com/imgly/pesdk-web-integrations/tree/main/integrations/getty-images/LICENSE.md) for licensing details.

## Support and License
Use our [service desk](https://img.ly/support) for bug reports or support requests.
