import * as React from 'react';
import { render } from '@testing-library/react';

import { Index } from '..';

describe('<Index  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Index />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
