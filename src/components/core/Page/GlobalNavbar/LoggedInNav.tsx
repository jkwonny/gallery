import { useCallback, useMemo } from 'react';
import { navigate } from '@reach/router';
import { useAuthActions } from 'contexts/auth/AuthContext';
import TextButton from 'components/core/Button/TextButton';
import Dropdown from 'components/core/Dropdown/Dropdown';
import Spacer from 'components/core/Spacer/Spacer';
import CopyToClipboard from 'components/CopyToClipboard/CopyToClipboard';
import {
  useAuthenticatedUser,
  useAuthenticatedUserAddress,
} from 'hooks/api/users/useUser';
import { useModal } from 'contexts/modal/ModalContext';
import EditUserInfoModal from 'scenes/UserGalleryPage/EditUserInfoModal';
import ManageWalletsModal from 'scenes/Modals/ManageWalletsModal';
import { truncateAddress } from 'utils/wallet';
import { MULTI_WALLET_ENABLED } from 'utils/featureFlag';
import NavElement from './NavElement';

function LoggedInNav() {
  const { logOut } = useAuthActions();
  const user = useAuthenticatedUser();
  const userAddress = useAuthenticatedUserAddress();
  const { showModal } = useModal();

  const truncatedUserAddress = useMemo(() => truncateAddress(userAddress), [userAddress]);

  const handleGalleryRedirect = useCallback(() => {
    const authenticatedUserIsOnTheirOwnPage
      = window.location.pathname.slice(1) === user.username;
    if (authenticatedUserIsOnTheirOwnPage) {
      return;
    }

    void navigate(`/${user.username}`);
  }, [user.username]);

  const handleManageWalletsClick = useCallback(() => {
    showModal(<ManageWalletsModal />);
  }, [showModal]);

  const handleEditNameClick = useCallback(() => {
    showModal(<EditUserInfoModal />);
  }, [showModal]);

  const handleEditGalleryClick = useCallback(() => {
    void navigate('/edit');
  }, []);

  return (
    <>
      <NavElement>
        <TextButton onClick={handleGalleryRedirect} text="My Gallery" />
      </NavElement>
      <Spacer width={24} />
      <NavElement>
        <Dropdown mainText="Account">
          <CopyToClipboard textToCopy={userAddress}>
            <TextButton
              text={truncatedUserAddress}
              disableTextTransform
              underlineOnHover
            />
          </CopyToClipboard>
          <Spacer height={12} />
          {MULTI_WALLET_ENABLED && <>
            <TextButton
              text="Manage Wallets"
              onClick={handleManageWalletsClick}
              underlineOnHover
            />
            <Spacer height={12} />
          </>}
          <TextButton
            text="Edit Gallery"
            onClick={handleEditGalleryClick}
            underlineOnHover
          />
          <Spacer height={12} />
          <TextButton
            text="Edit name & Bio"
            onClick={handleEditNameClick}
            underlineOnHover
          />
          <Spacer height={12} />
          <TextButton text="Sign Out" onClick={logOut} underlineOnHover />
        </Dropdown>
      </NavElement>
    </>
  );
}

export default LoggedInNav;
