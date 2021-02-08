import React from 'react';

// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import RegularCard from '@cmscomponents/Cards/RegularCard.jsx';
import Heading from '@cmscomponents/Heading/Heading.jsx';
import Timeline from '@cmscomponents/Timeline/Timeline.jsx';

import { stories } from '@cmsvariables/general.jsx';

class TimelinePage extends React.Component {
  render() {
    return (
      <div>
        <Heading title="Timeline" textAlign="center" />
        <GridContainer>
          <ItemGrid xs={12}>
            <RegularCard plainCard content={<Timeline stories={stories} />} />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

export default TimelinePage;
