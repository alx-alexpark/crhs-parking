import { fetcher } from '@/app/util';
import useSWR from 'swr';
import { highlightSpots } from './map-data';
import { ParkingMap, ParkingMapProps } from './parking-map';

export function MarkedParkingMap(props: ParkingMapProps) {
  if (props.highlightSpots) {
    return <ParkingMap {...props} />;
  }

  const { data } = useSWR('/api/v1/getParkingAvailability', fetcher);

  const reserved = data?.unavailableSpots.map((spot: any) => spot.spotNum);

  return (
    <ParkingMap {...props} highlightSpots={{ ...highlightSpots, reserved }} />
  );
}
