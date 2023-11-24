import Link from "next/link";

export function GetStarted() {
  return (
    <>
      <section>
        <h1>Get Started</h1>
        <p>Before getting started, you’ll need to have the following documents ready.</p>
        <ul>
          <li>Payment receipt from <Link href="https://katyisd.revtrak.net/high-schools/cinco-ranch-high-school/crhs-parking/">Pay N’ Go</Link></li>
          <li>Valid driver’s license</li>
          <li>
            Current proof of insurance for the vehicle being registered (must be
            registered under your name)
          </li>
        </ul>
        <p>Only students in grades 10, 11, or 12 can purchase a parking spot.</p>
      </section>

      <section>
        <h3>New for the 2023-2024 school year</h3>
        <p>You can now only pick the quadrant you want to park in instead of picking specific spot.</p>
      </section>
    </>
  );
}
