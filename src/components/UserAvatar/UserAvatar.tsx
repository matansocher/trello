import Avatar from '@mui/material/Avatar';
import './UserAvatar.scss';

export enum UserAvatarSize {
  S = 'small',
  M = 'medium',
  L = 'large',
}

interface Props {
  user: any,
  onClick?: () => void | null,
  size?: UserAvatarSize,
}

function UserAvatar({ user, onClick = null, size = UserAvatarSize.S }: Props) {

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
        return getSizeAttributes(UserAvatarSize.M);
    }
  }

  const renderAvatar = () => {
    const styles = getStyleObj();
    return <Avatar style={styles} alt='user avatar' src={user.avatar} />
  }

  const renderLetter = () => {
    const styles = getStyleObj()
    const letter = user.name.charAt(0).toUpperCase();
    return <Avatar style={styles} sx={{ width: 24, height: 24 }}>{letter}</Avatar>
  }

  return (
    <div className='avatar-wrapper'>
      { user.avatar ? renderAvatar() : renderLetter() }
    </div>
  )
}

export default UserAvatar;
