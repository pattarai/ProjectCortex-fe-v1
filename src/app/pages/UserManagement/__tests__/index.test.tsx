import * as React from 'react';
import { render } from '@testing-library/react';

import { UserManagement } from '..';

describe('<UserManagement  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserManagement />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
