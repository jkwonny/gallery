import { WizardContext } from 'react-albus';
import styled from 'styled-components';
import { Heading, BodyRegular } from 'components/core/Text/Text';
import Button from 'components/core/Button/Button';
import colors from 'components/core/colors';
import Spacer from 'components/core/Spacer/Spacer';
import FullPageCenteredStep from 'flows/shared/components/FullPageCenteredStep/FullPageCenteredStep';
import { useCallback, useEffect } from 'react';
import Mixpanel from 'utils/mixpanel';
import { useWizardCallback } from 'contexts/wizard/WizardCallbackContext';

type ConfigProps = {
  onNext: () => void;
};

function useWizardConfig({ onNext }: ConfigProps) {
  const { setOnNext } = useWizardCallback();

  useEffect(() => {
    setOnNext(onNext);
  }, [setOnNext, onNext]);
}

function CreateFirstCollection({ next }: WizardContext) {
  const handleNextClick = useCallback(() => {
    Mixpanel.track('Start new collection');
    next();
  }, [next]);

  useWizardConfig({ onNext: handleNextClick });

  return (
    <FullPageCenteredStep withFooter>
      <Heading>Create your first collection</Heading>
      <Spacer height={8} />
      <StyledBodyText color={colors.gray50}>
        Organize your gallery with collections. Use them to group NFTs by
        creator, theme, or anything that feels right.
      </StyledBodyText>
      <Spacer height={24} />
      <StyledButton text="New Collection" onClick={handleNextClick} />
    </FullPageCenteredStep>
  );
}

const StyledBodyText = styled(BodyRegular)`
  max-width: 390px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 200px;
`;

export default CreateFirstCollection;
