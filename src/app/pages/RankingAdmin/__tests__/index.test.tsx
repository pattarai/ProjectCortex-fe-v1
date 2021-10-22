import * as React from 'react';
import { render } from '@testing-library/react';

import { RankingAdmin } from '..';

describe('<RankingAdmin  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<RankingAdmin />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
