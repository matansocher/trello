import Avatar from '@mui/material/Avatar';
import { UserAvatarSize } from '@constants';
import { IUser } from '@models';
import './UserAvatar.scss';

interface IUserAvatarProps {
  user: IUser | null;
  size?: UserAvatarSize;
}

function UserAvatar({ user, size = UserAvatarSize.S }: IUserAvatarProps) {

  const getStyleObj = (): any => {
    return {
      // cursor: 'pointer',
      backgroundColor: '#1d579b',
      color: '#fff',
      ...getSizeStyle(),
    };
  }

  const getSizeStyle = (): any => {
    switch (size) {
      case UserAvatarSize.S:
        return { width: '26px', height: '26px', fontSize: '16px' };
      case UserAvatarSize.M:
        return { width: '40px', height: '40px', fontSize: '22px' };
      case UserAvatarSize.L:
        return { width: '100px', height: '100px', fontSize: '50px' };
    }
  }

  const renderAvatar = () => {
    return <Avatar style={getStyleObj()} alt='user avatar' src={user?.photoURL} />
  }

  const renderLetter = () => {
    const letter = user?.displayName?.charAt(0).toUpperCase();
    return <Avatar style={getStyleObj()} sx={{ width: 24, height: 24 }}>{letter}</Avatar>
  }

  return (
    <div className='avatar-wrapper'>
      { user?.photoURL ? renderAvatar() : renderLetter() }
    </div>
  )
}

export default UserAvatar;
