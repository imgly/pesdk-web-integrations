import {
  AdvancedUIToolControlBar,
  CustomAdvancedToolControlBarProps,
  Tool,
} from 'photoeditorsdk';
import React from 'react';
import styled from 'styled-components';

const CustomAdvancedUIToolControlBar = styled(AdvancedUIToolControlBar)<{
  columns: number;
}>`
  * button {
    margin-right: 8px;
  }
  * button:nth-child(${props => props.columns}n) {
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
