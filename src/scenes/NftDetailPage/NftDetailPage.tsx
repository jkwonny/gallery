import { useCallback } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import breakpoints, { pageGutter } from 'components/core/breakpoints';
import ActionText from 'components/core/ActionText/ActionText';

import useNft from 'hooks/api/nfts/useNft';
import Page from 'components/core/Page/Page';
import ShimmerProvider from 'contexts/shimmer/ShimmerContext';
import { useGalleryNavigationActions } from 'contexts/navigation/GalleryNavigationContext';
import GalleryRedirect from 'scenes/_Router/GalleryRedirect';
import NftDetailAsset from './NftDetailAsset';
import NftDetailText from './NftDetailText';

type Props = {
  collectionId: string;
  nftId: string;
};

function NftDetailPage({
  nftId,
}: RouteComponentProps<Props>) {
  const { getVisitedPagesLength } = useGalleryNavigationActions();

  const handleBackClick = useCallback(() => {
    const visitedPagesLength = getVisitedPagesLength();

    // if the user arrived on the page via direct link, send them to the
    // owner's profile page (since there is no "previous page")
    if (visitedPagesLength === 1) {
      // NOTE: this scheme will have to change if we no longer have the
      // username included in the URL
      const username = window.location.pathname.split('/')[1];
      void navigate(`/${username}`);
      return;
    }

    // otherwise, simply send them back to where they came from. this ensures scroll
    // position is maintained when going back (see: GalleryNavigationContext.tsx)
    void navigate(-1);
  }, [getVisitedPagesLength]);

  const nft = useNft({ id: nftId ?? '' });

  if (!nft) {
    return <GalleryRedirect to="/404" />;
  }

  return (
    <StyledNftDetailPage centered>
      <StyledBackLink>
        <ActionText onClick={handleBackClick}>← Back to gallery</ActionText>
      </StyledBackLink>
      <StyledBody>
        {/* {prevNftId && (
          <NavigationHandle
            direction={Directions.LEFT}
            nftId={prevNftId}
          ></NavigationHandle>
        )} */}
        <StyledContentContainer>
          <ShimmerProvider>
            <NftDetailAsset nft={nft} />
          </ShimmerProvider>
          <NftDetailText nft={nft} />
        </StyledContentContainer>
        {/* {nextNftId && (
          <NavigationHandle
            direction={Directions.RIGHT}
            nftId={nextNftId}
          ></NavigationHandle>
        )} */}
      </StyledBody>
    </StyledNftDetailPage>
  );
}

const StyledBody = styled.div`
  display: flex;

  @media only screen and ${breakpoints.mobile} {
    width: 100%;
  }

  @media only screen and ${breakpoints.tablet} {
    width: auto;
  }
`;

// mimics a navbar element on the top left corner
const StyledBackLink = styled.div`
  height: 80px;
  display: flex;
  align-items: center;

  position: absolute;
  left: 0;
  top: 0;

  padding: 0 ${pageGutter.mobile}px;

  @media only screen and ${breakpoints.tablet} {
    padding: 0 ${pageGutter.tablet}px;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media only screen and ${breakpoints.tablet} {
    flex-direction: row;
    width: initial;
  }
`;

const StyledNftDetailPage = styled(Page)`
  @media only screen and ${breakpoints.mobile} {
    margin-top: 64px;
    margin-left: ${pageGutter.mobile}px;
    margin-right: ${pageGutter.mobile}px;
  }

  @media only screen and ${breakpoints.tablet} {
    margin-top: 0px;
    margin-left: ${pageGutter.tablet}px;
    margin-right: ${pageGutter.tablet}px;
  }

  @media only screen and ${breakpoints.desktop} {
    margin: 0px;
  }
`;

export default NftDetailPage;
