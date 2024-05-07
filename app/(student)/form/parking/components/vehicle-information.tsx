import { TextInput } from '@/components';
import { FieldArray } from 'formik';
import ParkingRequestPage from '.';

import { MinusCircledIcon } from '@radix-ui/react-icons';
import styles from './vehicle-information.module.scss';

export function VehicleInformation({ formik }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Vehicle information</h1>

        <FieldArray
          name="vehicles"
          render={(arrayHelpers) => (
            <>
              {formik.values.vehicles.map((vehicle, index) => (
                <>
                  {index > 0 && <hr />}

                  <fieldset key={index}>
                    <div>
                      <legend>Vehicle information</legend>
                      {index > 0 && (
                        <button
                          type="button"
                          className={styles.vehicleButton}
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          <MinusCircledIcon />
                        </button>
                      )}
                    </div>

                    <TextInput
                      id={'vehicle-make' + index}
                      name={`vehicles.${index}.make`}
                      label="Car manufacturer"
                      value={vehicle?.make}
                    />

                    <TextInput
                      id={'vehicle-model' + index}
                      name={`vehicles.${index}.model`}
                      label="Vehicle model"
                      value={vehicle?.model}
                    />

                    <TextInput
                      id={'vehicle-year' + index}
                      name={`vehicles.${index}.year`}
                      label="Release year"
                      type="number"
                      value={vehicle?.year}
                    />

                    <TextInput
                      id={'vehicle-color' + index}
                      name={`vehicles.${index}.color`}
                      label="Vehicle color"
                      value={vehicle?.color}
                    />

                    <TextInput
                      id={'license-plate' + index}
                      name={`vehicles.${index}.licensePlate`}
                      label="License plate"
                      value={vehicle?.licensePlate}
                    />
                  </fieldset>
                </>
              ))}

              <button type="button" onClick={() => arrayHelpers.push({})}>
                Register another vehicle
              </button>
            </>
          )}
        />
      </section>
    </>
  );
}
