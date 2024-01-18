import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Close as CloseIcon } from '@mui/icons-material';
import { Loader } from '@components';
import { LoaderSize } from '@constants';
import { ILocation } from '@models';
import './PlacePicker.scss';

interface IPlacePickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: (newValue: ILocation) => void;
}

function PlacePicker({ setIsOpen, handleSave }: IPlacePickerProps) {
  const [address, setAddress] = useState('');

  async function geocodePlaceId(placeId: string) {
    const { results } = await new google.maps.Geocoder().geocode({ placeId });
    if (!results?.length) return;
    return results[0];
  }

  const onSelectPlace = async (placeName: string, placeId: string, data: any) => {
    const geocodePlaceData = await geocodePlaceId(placeId) as any;
    const place = {
      id: placeId,
      name: data?.formattedSuggestion?.mainText,
      description: data?.formattedSuggestion?.secondaryText,
      fullName: placeName,
      lat: geocodePlaceData.geometry.location.lat(),
      lng: geocodePlaceData.geometry.location.lng(),
    } as ILocation;
    handleSave(place);
    setIsOpen(false);
  }

  return (
    <>
      <div id="map"></div>
      <div className='place-picker-wrapper'>

        <div className='place-picker-wrapper__header'>
          <div className='close' onClick={() => setIsOpen(false)}>
            <CloseIcon/>
          </div>
          <p>Choose location</p>
        </div>

        <div className='place-picker-wrapper__divider'></div>

        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={onSelectPlace}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
            <>
              <input {...getInputProps({placeholder: 'Search Places ...', className: 'location-search-input'})} />
              <div className='autocomplete-dropdown-container'>
                {loading && <div className='loader-wrapper'><Loader size={LoaderSize.M}/></div>}
                {suggestions.map((suggestion: any) => {
                  return (
                    <div key={suggestion.description} {...getSuggestionItemProps(suggestion, {className: 'suggestion-item'})}>
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      </div>
    </>
  )
}

export default PlacePicker;
