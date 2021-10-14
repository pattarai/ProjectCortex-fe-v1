import * as React from 'react';
import { render } from '@testing-library/react';

import { Contact } from '..';

describe('<Contact  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Contact />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
