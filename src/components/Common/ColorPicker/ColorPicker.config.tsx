import { IColorTile } from '@models';

const textLimeBolder = '#D3F1A7';
const textRedBolder = '#FFD5D2';
const textOrangeBolder = '#FEDEC8';
const textYellowBolder = '#F8E6A0';
const textGreenBolder = '#BAF3DB';
const textTealBolder = '#C6EDFB';
const textBlueBolder = '#CCE0FF';
const textPurpleBolder = '#DFD8FD';
const textMagentaBolder = '#FDD0EC';
const textGrayBolder = '#DEE4EA';
const textInverse = '#1D2125';
const backgroundLimeSubtler = '#37471F';
const backgroundLimeSubtlerHovered = '#4C6B1F';
const backgroundLimeSubtle = '#4C6B1F';
const backgroundLimeSubtleHovered = '#37471F';
const backgroundLimeBolder = '#94C748';
const backgroundLimeBolderHovered = '#B3DF72';
const backgroundRedSubtler = '#5D1F1A';
const backgroundRedSubtlerHovered = '#AE2E24';
const backgroundRedSubtle = '#AE2E24';
const backgroundRedSubtleHovered = '#5D1F1A';
const backgroundRedBolder = '#F87168';
const backgroundRedBolderHovered = '#FD9891';
const backgroundOrangeSubtler = '#702E00';
const backgroundOrangeSubtlerHovered = '#A54800';
const backgroundOrangeSubtle = '#A54800';
const backgroundOrangeSubtleHovered = '#702E00';
const backgroundOrangeBolder = '#FEA362';
const backgroundOrangeBolderHovered = '#FEC195';
const backgroundYellowSubtler = '#533F04';
const backgroundYellowSubtlerHovered = '#7F5F01';
const backgroundYellowSubtle = '#7F5F01';
const backgroundYellowSubtleHovered = '#533F04';
const backgroundYellowBolder = '#E2B203';
const backgroundYellowBolderHovered = '#F5CD47';
const backgroundGreenSubtler = '#164B35';
const backgroundGreenSubtlerHovered = '#216E4E';
const backgroundGreenSubtle = '#216E4E';
const backgroundGreenSubtleHovered = '#164B35';
const backgroundGreenBolder = '#4BCE97';
const backgroundGreenBolderHovered = '#7EE2B8';
const backgroundTealSubtler = '#164555';
const backgroundTealSubtlerHovered = '#206A83';
const backgroundTealSubtle = '#206A83';
const backgroundTealSubtleHovered = '#164555';
const backgroundTealBolder = '#6CC3E0';
const backgroundTealBolderHovered = '#9DD9EE';
const backgroundBlueSubtler = '#09326C';
const backgroundBlueSubtlerHovered = '#0055CC';
const backgroundBlueSubtle = '#0055CC';
const backgroundBlueSubtleHovered = '#09326C';
const backgroundBlueBolder = '#579DFF';
const backgroundBlueBolderHovered = '#85B8FF';
const backgroundPurpleSubtler = '#352C63';
const backgroundPurpleSubtlerHovered = '#5E4DB2';
const backgroundPurpleSubtle = '#5E4DB2';
const backgroundPurpleSubtleHovered = '#352C63';
const backgroundPurpleBolder = '#9F8FEF';
const backgroundPurpleBolderHovered = '#B8ACF6';
const backgroundMagentaSubtler = '#50253F';
const backgroundMagentaSubtlerHovered = '#943D73';
const backgroundMagentaSubtle = '#943D73';
const backgroundMagentaSubtleHovered = '#50253F';
const backgroundMagentaBolder = '#E774BB';
const backgroundMagentaBolderHovered = '#F797D2';
const backgroundGraySubtler = '#454F59';
const backgroundGraySubtlerHovered = '#596773';
const backgroundGraySubtle = '#596773';
const backgroundGraySubtleHovered = '#454F59';
const backgroundGrayBolder = '#8C9BAB';
const backgroundGrayBolderHovered = '#9FADBC';

export const TILES: IColorTile[] = [
  { id: 'pattern-green-subtler', backgroundColor: backgroundGreenSubtler, hoverColor: backgroundGreenSubtlerHovered, textColor: textGreenBolder },
  { id: 'pattern-yellow-subtler', backgroundColor: backgroundYellowSubtler, hoverColor: backgroundYellowSubtlerHovered, textColor: textYellowBolder },
  { id: 'pattern-orange-subtler', backgroundColor: backgroundOrangeSubtler, hoverColor: backgroundOrangeSubtlerHovered, textColor: textOrangeBolder },
  { id: 'pattern-red-subtler', backgroundColor: backgroundRedSubtler, hoverColor: backgroundRedSubtlerHovered, textColor: textRedBolder },
  { id: 'pattern-purple-subtler', backgroundColor: backgroundPurpleSubtler, hoverColor: backgroundPurpleSubtlerHovered, textColor: textPurpleBolder },

  { id: 'pattern-green-subtle', backgroundColor: backgroundGreenSubtle, hoverColor: backgroundGreenSubtleHovered, textColor: textGreenBolder },
  { id: 'pattern-yellow-subtle', backgroundColor: backgroundYellowSubtle, hoverColor: backgroundYellowSubtleHovered, textColor: textYellowBolder },
  { id: 'pattern-orange-subtle', backgroundColor: backgroundOrangeSubtle, hoverColor: backgroundOrangeSubtleHovered, textColor: textOrangeBolder },
  { id: 'pattern-red-subtle', backgroundColor: backgroundRedSubtle, hoverColor: backgroundRedSubtleHovered, textColor: textRedBolder },
  { id: 'pattern-purple-subtle', backgroundColor: backgroundPurpleSubtle, hoverColor: backgroundPurpleSubtleHovered, textColor: textPurpleBolder },

  { id: 'pattern-green-bolder', backgroundColor: backgroundGreenBolder, hoverColor: backgroundGreenBolderHovered, textColor: textInverse },
  { id: 'pattern-yellow-bolder', backgroundColor: backgroundYellowBolder, hoverColor: backgroundYellowBolderHovered, textColor: textInverse },
  { id: 'pattern-orange-bolder', backgroundColor: backgroundOrangeBolder, hoverColor: backgroundOrangeBolderHovered, textColor: textInverse },
  { id: 'pattern-red-bolder', backgroundColor: backgroundRedBolder, hoverColor: backgroundRedBolderHovered, textColor: textInverse },
  { id: 'pattern-purple-bolder', backgroundColor: backgroundPurpleBolder, hoverColor: backgroundPurpleBolderHovered, textColor: textInverse },


  { id: 'pattern-blue-subtler', backgroundColor: backgroundBlueSubtler, hoverColor: backgroundBlueSubtlerHovered, textColor: textBlueBolder },
  { id: 'pattern-teal-subtler', backgroundColor: backgroundTealSubtler, hoverColor: backgroundTealSubtlerHovered, textColor: textTealBolder },
  { id: 'pattern-lime-subtler', backgroundColor: backgroundLimeSubtler, hoverColor: backgroundLimeSubtlerHovered, textColor: textLimeBolder },
  { id: 'pattern-magenta-subtler', backgroundColor: backgroundMagentaSubtler, hoverColor: backgroundMagentaSubtlerHovered, textColor: textMagentaBolder },
  { id: 'pattern-gray-subtler', backgroundColor: backgroundGraySubtler, hoverColor: backgroundGraySubtlerHovered, textColor: textGrayBolder },

  { id: 'pattern-blue-subtle', backgroundColor: backgroundBlueSubtle, hoverColor: backgroundBlueSubtleHovered, textColor: textBlueBolder },
  { id: 'pattern-teal-subtle', backgroundColor: backgroundTealSubtle, hoverColor: backgroundTealSubtleHovered, textColor: textTealBolder },
  { id: 'pattern-lime-subtle', backgroundColor: backgroundLimeSubtle, hoverColor: backgroundLimeSubtleHovered, textColor: textLimeBolder },
  { id: 'pattern-magenta-subtle', backgroundColor: backgroundMagentaSubtle, hoverColor: backgroundMagentaSubtleHovered, textColor: textMagentaBolder },
  { id: 'pattern-gray-subtle', backgroundColor: backgroundGraySubtle, hoverColor: backgroundGraySubtleHovered, textColor: textGrayBolder },

  { id: 'pattern-blue-bolder', backgroundColor: backgroundBlueBolder, hoverColor: backgroundBlueBolderHovered, textColor: textInverse },
  { id: 'pattern-teal-bolder', backgroundColor: backgroundTealBolder, hoverColor: backgroundTealBolderHovered, textColor: textInverse },
  { id: 'pattern-lime-bolder', backgroundColor: backgroundLimeBolder, hoverColor: backgroundLimeBolderHovered, textColor: textInverse },
  { id: 'pattern-magenta-bolder', backgroundColor: backgroundMagentaBolder, hoverColor: backgroundMagentaBolderHovered, textColor: textInverse },
  { id: 'pattern-gray-bolder', backgroundColor: backgroundGrayBolder, hoverColor: backgroundGrayBolderHovered, textColor: textInverse },
];
