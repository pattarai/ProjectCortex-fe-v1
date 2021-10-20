import * as React from 'react';
import { render } from '@testing-library/react';

import { RankingCrew } from '..';

describe('<RankingCrew  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<RankingCrew />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
