import { ReactElement } from 'react';
import styled, { css, keyframes } from 'styled-components';
import colors from 'components/core/colors';
import transitions from 'components/core/transitions';

type Props = {
  isActive: boolean;
  hideModal: () => void;
  content: ReactElement;
};

function AnimatedModal({ isActive, hideModal, content }: Props) {
  return (
    <_ToggleFade isActive={isActive}>
      <Overlay onClick={hideModal} />
      <StyledContentContainer>
        <_ToggleTranslate isActive={isActive}>
          <StyledContent>
            <StyledClose onClick={hideModal}>&#x2715;</StyledClose>
            {content}
          </StyledContent>
        </_ToggleTranslate>
      </StyledContentContainer>
    </_ToggleFade>
  );
}

const fadeIn = keyframes`
    from { opacity: 0 };
    to { opacity: 1 };
`;

const fadeOut = keyframes`
    from { opacity: 1 };
    to { opacity: 0 };
`;

const _ToggleFade = styled.div<{ isActive: boolean }>`
  // keeps modal on top over other elements with z-index https://stackoverflow.com/questions/50883309/how-come-css-animations-change-z-index
  position: relative;
  z-index: 10;
  animation: ${({ isActive }) =>
    css`
      ${isActive ? fadeIn : fadeOut} ${transitions.cubic}
    `};
`;

const TRANSLATE_PIXELS = 10;

const translateUp = keyframes`
    from { transform: translateY(${TRANSLATE_PIXELS}px) };
    to { transform: translateY(0px) };
`;

const translateDown = keyframes`
    from { transform: translateY(0px) };
    to { transform: translateY(${TRANSLATE_PIXELS}px) };
`;

const _ToggleTranslate = styled.div<{ isActive: boolean }>`
  animation: ${({ isActive }) =>
    css`
      ${isActive ? translateUp : translateDown} ${transitions.cubic}
    `};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: white;
  opacity: 0.8;

  // should appear above rest of site
  z-index: 1;

  // fixes unusual opacity transition bug: https://stackoverflow.com/a/22648685
  -webkit-backface-visibility: hidden;
`;

const StyledContentContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // should appear above the overlay
  z-index: 2;

  border: 1px solid ${colors.gray50};
`;

const StyledContent = styled.div`
  position: relative;
  padding: 40px;
  background: white;
`;

const StyledClose = styled.span`
  position: absolute;
  right: 30px;
  top: 28px;
  padding: 10px;
  cursor: pointer;
`;

export default AnimatedModal;
