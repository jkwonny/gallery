import styled from 'styled-components';
import NftPreviewLabel from 'components/NftPreview/NftPreviewLabel';
import transitions from 'components/core/transitions';
import { getMediaTypeForAssetUrl, getResizedNftImageUrlWithFallback } from 'utils/nft';
import { NftMediaType } from 'components/core/enums';
import { EditModeNft } from '../types';

type Props = {
  editModeNft: EditModeNft;
  setNodeRef: (node: HTMLElement | null) => void;
};

function StagedNftImage({ editModeNft, setNodeRef, ...props }: Props) {
  const nft = editModeNft.nft;
  const srcUrl = getResizedNftImageUrlWithFallback(nft);

  const isVideo = getMediaTypeForAssetUrl(editModeNft.nft.image_url) === NftMediaType.VIDEO;

  // TODO:
  // 1) can grab image still from video: https://stackoverflow.com/questions/40143958/javascript-generate-video-thumbnail-from-video-url/53836300
  // 2) OR simply use custom indexer when that's ready
  return isVideo ? <VideoContainer ref={setNodeRef} {...props}>
    <StyledGridVideo src={srcUrl} />
    <StyledNftPreviewLabel nft={nft} />
  </VideoContainer> : <StyledGridImage srcUrl={srcUrl} ref={setNodeRef} {...props}>
    <StyledNftPreviewLabel nft={nft} />
  </StyledGridImage>;
}

const VideoContainer = styled.div`
  // TODO handle non square videos
  height: 280px;
  width: 280px;
  position: relative;
`;

const StyledGridVideo = styled.video`
  width: 100%;
`;

const StyledGridImage = styled.div<{ srcUrl: string }>`
  background-image: ${({ srcUrl }) => `url(${srcUrl})`}};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  // TODO handle non square images
  height: 280px;
  width: 280px;
  position: relative;
`;

const StyledNftPreviewLabel = styled(NftPreviewLabel)`
  opacity: 0;
  transition: opacity ${transitions.cubic};
`;

// Potentially useful links:
// https://github.com/clauderic/dnd-kit/blob/6f762a4d8d0ea047c9e9ba324448d4aca258c6a0/stories/components/Item/Item.tsx
// https://github.com/clauderic/dnd-kit/blob/54c877875cf7ec6d4367ca11ce216cc3eb6475d2/stories/2%20-%20Presets/Sortable/Sortable.tsx#L201
// https://github.com/clauderic/dnd-kit/blob/6f762a4d8d0ea047c9e9ba324448d4aca258c6a0/stories/components/Item/Item.module.css#L43

export default StagedNftImage;
