import {
  AdvancedUIToolControlBar,
  CustomAdvancedToolControlBarProps,
  Tool,
} from 'photoeditorsdk/no-polyfills';
import React from 'react';

// @types/styled-components@4.4.x will produce an error that is only fixed in @types/styled-components@5.x
// @ts-ignore
import styled from 'styled-components';

const CustomAdvancedUIToolControlBar = styled(AdvancedUIToolControlBar)<{
  columns: number;
}>`
  * button {
    margin-right: 8px;
  }
  * button:nth-child(${(props: any) => props.columns}n) {
    margin-right: 0px;
  }
`;

interface Props extends CustomAdvancedToolControlBarProps {
  columns: number;
}

export const AdvancedToolControlBar: React.FC<Props> = ({
  columns,
  tool,
  reverse,
  children,
}) => {
  if (tool === Tool.CUSTOM) {
    return (
      <CustomAdvancedUIToolControlBar
        tool={tool}
        reverse={reverse}
        columns={columns}
      >
        {children}
      </CustomAdvancedUIToolControlBar>
    );
  }

  return (
    <AdvancedUIToolControlBar tool={tool} reverse={reverse}>
      {children}
    </AdvancedUIToolControlBar>
  );
};
