import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  CallMadeOutlined as CallMadeOutlinedIcon,
  MoreVertOutlined as MoreVertOutlinedIcon,
} from '@mui/icons-material';
import { DropdownMenu, ModalWrapper, PlacePicker } from '@components';
import { useCurrentCard } from '@context';
import { ILocation, IModalStyles } from '@models';
import { firebaseService } from '@services';
import './CardLocation.scss';

const placePickerModalStyles: IModalStyles = {
  width: 350,
  height: 450,
};

interface ICardLocationProps {

}

function CardLocation({  }: ICardLocationProps) {
  const { currentCard: card } = useCurrentCard();
  const [locationPlaceModalOpen, setLocationPlaceModalOpen] = useState(false);
  const { name, description, fullName, lat, lng } = card.location as ILocation;

  const handleChangeLocationClick = () => {
    setLocationPlaceModalOpen(true);
  }

  const handleRemoveClick = () => {
    firebaseService.deleteFieldFromCard(card, 'location');
  }

  const handleSaveLocationClick = (location: ILocation) => {
    firebaseService.updateCardLocation(card, location);
    setLocationPlaceModalOpen(false);
  }

  const getDropdownMenuItems = () => {
    return [
      { label: 'Change Location', icon: <EditOutlinedIcon fontSize='small' />, onClick: () => handleChangeLocationClick() },
      { label: 'Remove', icon: <DeleteOutlineOutlinedIcon fontSize='small' />, onClick: () => handleRemoveClick() },
    ]
  }

  return (
    <div className='card-location'>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map zoom={15} center={{ lat, lng }} gestureHandling={'greedy'} disableDefaultUI={true}>
          <Marker position={{ lat, lng }} clickable={false} title={fullName} />
        </Map>
      </APIProvider>

      <div className='card-location__footer'>
        <div className='card-location__footer__left'>
          <p className='main'>{name}</p>
          <p className='secondary'>{description}</p>
        </div>
        <div className='card-location__footer__right'>
          <a className='link' href={`https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`} target="_blank" rel="noreferrer">
            <CallMadeOutlinedIcon />
          </a>
          <DropdownMenu menuHeader='' menuIcon={<MoreVertOutlinedIcon/>} menuItems={getDropdownMenuItems()}/>
        </div>
      </div>

      <ModalWrapper modalOpen={locationPlaceModalOpen} closeModal={() => setLocationPlaceModalOpen(false)} modalStyle={placePickerModalStyles}>
        <PlacePicker isOpen={locationPlaceModalOpen} setIsOpen={setLocationPlaceModalOpen} handleSave={handleSaveLocationClick} />
      </ModalWrapper>
    </div>
  )
}

export default CardLocation;
