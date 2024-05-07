import { TextInput } from '@/components';
import ParkingRequestPage from '.';

export function VehicleInformation({ formik }: ParkingRequestPage) {
  const { vehicle } = formik.values;

  return (
    <>
      <section>
        <h1>Vehicle information</h1>

        <TextInput
          id={'vehicle-make'}
          name={`vehicle.make`}
          label="Car manufacturer"
          value={vehicle?.make}
        />

        <TextInput
          id={'vehicle-model'}
          name={`vehicle.model`}
          label="Vehicle model"
          value={vehicle?.model}
        />

        <TextInput
          id={'vehicle-year'}
          name={`vehicle.year`}
          label="Release year"
          type="number"
          value={vehicle?.year}
        />

        <TextInput
          id={'vehicle-color'}
          name={`vehicle.color`}
          label="Vehicle color"
          value={vehicle?.color}
        />

        <TextInput
          id={'license-plate'}
          name={`vehicle.licensePlate`}
          label="License plate"
          value={vehicle?.licensePlate}
        />
      </section>
    </>
  );
}
