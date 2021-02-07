import React from 'react';

// core components
import Wizard from '@cmscomponents/Wizard/Wizard.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';

import Step1 from './WizardSteps/Step1.jsx';
import Step2 from './WizardSteps/Step2.jsx';
import Step3 from './WizardSteps/Step3.jsx';

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <ItemGrid xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              { stepName: 'About', stepComponent: Step1, stepId: 'about' },
              { stepName: 'Account', stepComponent: Step2, stepId: 'account' },
              { stepName: 'Address', stepComponent: Step3, stepId: 'address' },
            ]}
            title="Build Your Profile"
            subtitle="This information will let us know more about you."
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default WizardView;
