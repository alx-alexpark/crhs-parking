import ParkingRequestPage from '.';

export function VehicleInformation({ formik }: ParkingRequestPage) {
  return (
    <>
      <section>
        <h1>Vehicle information</h1>

        <label htmlFor="vehicle-make">Car manufacturer</label>
        <input
          id="vehicle-make"
          name="vehicle.make"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.make}
        />

        <label htmlFor="vehicle-model">Vehicle model</label>
        <input
          id="vehicle-model"
          name="vehicle.model"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.model}
        />

        <label htmlFor="vehicle-year">Release year</label>
        <input
          id="vehicle-year"
          name="vehicle.year"
          type="number"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.year ?? undefined}
        />

        <label htmlFor="vehicle-color">Vehicle color</label>
        <input
          id="vehicle-color"
          name="vehicle.color"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.color}
        />

        <label htmlFor="license-plate">License plate</label>
        <input
          id="license-plate"
          name="vehicle.licensePlate"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.licensePlate}
        />
      </section>
    </>
  );
}
