import * as React from 'react';
import { render } from '@testing-library/react';

import { About } from '..';

describe('<About  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<About />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
