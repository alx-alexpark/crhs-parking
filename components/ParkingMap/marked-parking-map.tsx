import { fetcher } from '@/app/util';
import useSWR from 'swr';
import { highlightSpots } from './map-data';
import { ParkingMap, ParkingMapProps } from './parking-map';

/**
 * A parking map that highlights reserved spots using data from the database.
 */
export function MarkedParkingMap(props: ParkingMapProps) {
  const { data } = useSWR('/api/v1/getParkingAvailability', fetcher);

  const reserved = data?.unavailableSpots.map((spot: any) => spot.spotNum);

  return (
    <ParkingMap {...props} highlightSpots={{ ...highlightSpots, reserved }} />
  );
}
