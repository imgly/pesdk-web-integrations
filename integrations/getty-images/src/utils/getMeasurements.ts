import {
  calculateAdvancedUIToolControlBarMeasurements,
  CustomMeasurements,
} from 'photoeditorsdk/no-polyfills';

const thumbSize = 112;
const thumbPadding = 8;
const padding = 24 * 2;
let columns = 2;

/**
 * This function will measure the available space for the editor and find a suitable width for the ToolControlBar.
 * @param container: id or class selector or HTMLDivElement
 * @returns
 * the number of columns,
 * an object of measurement values for the AdvancedToolControlBar and Cards,
 * an object of measurement values for the Tool.CUSTOM config
 */
export const getMeasurements = (
  container: string | HTMLDivElement,
): [
  number,
  CustomMeasurements,
  { advancedUIToolControlBar: { width: number } },
] => {
  if (document) {
    let element = null;
    // find the container by the id or class identifier
    if (typeof container === 'string') {
      if (container.startsWith('.')) {
        [element] = document.getElementsByClassName(container.slice(1));
      } else if (container.startsWith('#')) {
        element = document.getElementById(container.slice(1));
      }
    } else {
      element = container;
    }

    // select a greater number of columns if the space if available
    if (element && element.getBoundingClientRect) {
      const { width } = element.getBoundingClientRect();
      // test for 4 columns, there is only padding between three thumbnails
      if (width * 0.4 > 4 * thumbSize + 3 * thumbPadding + padding) {
        columns = 4;
        // test for 3 columns, there is only padding between two thumbnails
      } else if (width * 0.4 > 3 * thumbSize + 2 * thumbPadding + padding) {
        columns = 3;
      }
    }
  }

  const measurements = calculateAdvancedUIToolControlBarMeasurements(
    thumbSize * 2 + thumbPadding * 1 + padding,
  );

  const customMeasurements = {
    advancedUIToolControlBar: {
      width: thumbSize * columns + thumbPadding * (columns - 1) + padding + 4,
    },
  };

  return [columns, measurements, customMeasurements];
};
