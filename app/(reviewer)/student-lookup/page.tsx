'use client';

import { useState } from 'react';

import { StatusCard } from '@/components/StatusCard/status-card';
import { UserType } from '@/models/User';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import Card from '@/components/Card/card';
import { ParkingSpotRequestType } from '@/models/ParkingSpotRequest';
import styles from './student-lookup.module.scss';

interface UserValues {
  user: UserType;
  form: ParkingSpotRequestType;
}

interface QueryParams {
  sticker?: string;
  spot?: string;
}

async function fetchUserData({ sticker, spot }: QueryParams) {
  // TODO: Return user data and latest accepted parking request

  const user = {};

  const form = {};

  return { user, form } as UserValues;
}

export default function StudentLookup() {
  const [userData, setUserData] = useState<UserValues | null>(null);

  const [parkingSticker, setParkingSticker] = useState('');
  const [parkingSpot, setParkingSpot] = useState('');

  const searchUser = async (params: QueryParams) => {
    setUserData(await fetchUserData(params));
  };

  function generateFromValues(values: Object) {
    return Object.entries(values).map(([label, value], index) => {
      const id = label.toLocaleLowerCase().replace(' ', '-');
      const descId = id + '-desc';

      return (
        <div className={styles.formLine} key={index}>
          <p id={descId}>
            {value || (
              <strong style={{ color: 'var(--color-error)' }}>
                Missing value
              </strong>
            )}
          </p>
        </div>
      );
    });
  }

  return (
    <>
      <h1>Student Lookup</h1>

      <div>
        <Card>
          <p>Look up by parking sticker</p>

          <label htmlFor="parking-sticker">Parking Sticker</label>
          <input
            type="text"
            id="parking-sticker"
            value={parkingSticker}
            onChange={(e) => setParkingSticker(e.target.value)}
          />

          <button onClick={() => searchUser({ sticker: parkingSticker })}>
            Search <ArrowRightIcon />
          </button>
        </Card>

        <Card>
          <p>Look up by parking spot</p>

          <label htmlFor="parking-spot">Parking Spot</label>
          <input
            type="text"
            id="parking-spot"
            value={parkingSpot}
            onChange={(e) => setParkingSpot(e.target.value)}
          />

          <button onClick={() => searchUser({ spot: parkingSpot })}>
            Search <ArrowRightIcon />
          </button>
        </Card>
      </div>

      {/* TODO: show this while data is being fetched */}
      {!userData && (
        <StatusCard status="info">Searching for student...</StatusCard>
      )}

      {userData && (
        <>
          <hr />

          <Card>
            {userData && (
              <>
                <section>
                  <h3 className={styles.sectionTitle}>Student details</h3>
                  {/* {generateFromValues()} */}
                </section>

                <section>
                  <h3 className={styles.sectionTitle}>Vehicle details</h3>
                  {/* {generateFromValues()} */}
                </section>
              </>
            )}
          </Card>
        </>
      )}
    </>
  );
}
