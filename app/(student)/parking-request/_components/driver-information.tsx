import { FileInput } from "@/components/file-input";

export function DriverInformation() {
  return (
    <>
      <section>
        <h1>Driver information</h1>

        <label htmlFor="license-number">Driver's license number</label>
        <input id="license-number"></input>

        <label htmlFor="exp-date">Expiration date</label>
        <input id="exp-date" type="date"></input>

        <label htmlFor="license-photo">Photo of your driver's license</label>
        <FileInput id="license-photo" accept="image/*" />

        <label htmlFor="insurance-photo">Photo of vehicle's insurance</label>
        <FileInput id="insurance-photo" accept="image/*" />
      </section>
    </>
  );
}
