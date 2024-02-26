import ParkingRequestPage from '.';

export function VehicleInformation({ formik }: ParkingRequestPage) {
  return (
    <div>
      <section>
        <h1>Vehicle information</h1>

        <label htmlFor="vehicle-make">Vehicle brand</label>
        <input
          id="vehicle-make"
          name="vehicle.make"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.make}
        />

        <label htmlFor="vehicle-model">Vehicle model</label>
        <input
          id="vehicle-brand"
          name="vehicle.model"
          onChange={formik.handleChange}
          value={formik.values?.vehicle?.model}
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
    </div>
  );
}
