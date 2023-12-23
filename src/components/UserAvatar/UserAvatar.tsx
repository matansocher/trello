import Avatar from '@mui/material/Avatar';
import { matan } from '@assets';
import { IUser } from '@models';
import './UserAvatar.scss';

export enum UserAvatarSize {
  S = 'small',
  M = 'medium',
  L = 'large',
}

interface IUserAvatarProps {
  user: IUser | null;
  onClick?: Function | null;
  size?: UserAvatarSize;
}

function UserAvatar({ user, onClick = null, size = UserAvatarSize.S }: IUserAvatarProps) {

  const getStyleObj = () => {
    const style: any = { ...getSizeAttributes(size) };
    if (onClick) {
      style.cursor = 'pointer';
    }
    return style;
  }

  const getSizeAttributes = (size: UserAvatarSize): any => {
    switch (size) {
      case UserAvatarSize.S:
        return { width: '26px', height: '26px', fontSize: '14px' };
      case UserAvatarSize.M:
        return { width: '40px', height: '40px', fontSize: '20px' };
      case UserAvatarSize.L:
        return { width: '100px', height: '100px', fontSize: '50px' };
      default:
        return getSizeAttributes(UserAvatarSize.S);
    }
  }

  const renderAvatar = () => {
    const styles = getStyleObj();
    return <Avatar style={styles} alt='user avatar' src={user?.avatarUrl} />
  }

  const renderLetter = () => {
    const styles = getStyleObj();
    // const letter = user.firstName.charAt(0).toUpperCase();
    // return <Avatar style={styles} sx={{ width: 24, height: 24 }}>{letter}</Avatar>
    return <img src={matan} alt='matan' className='user-image' style={styles} />
  }

  return (
    <div className='avatar-wrapper'>
      { user?.avatarUrl ? renderAvatar() : renderLetter() }
    </div>
  )
}

export default UserAvatar;
