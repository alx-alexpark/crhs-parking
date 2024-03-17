'use client';

import { ArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';

import axios from 'axios';
import useSWR from 'swr';
import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { FileInput, Tooltip } from '@/components';
import { useState } from 'react';
import styles from '../form.module.scss';

// TODO: Error messages try to be friendly, but they may be too vague
const AboutMeSchema = Yup.object().shape({
  // TODO: yup-phone?
  phone: Yup.string()
    .max(16, 'Invalid phone number')
    .required('Phone number is required'),
  // studentId: Yup.string()
  //   .matches(/[a-z]\d{7}/i, 'Did you mistype your ID?')
  //   .required('Student ID is required'),
  grade: Yup.number()
    .min(10, 'Freshmen cannot park on campus')
    .max(12, 'High school graduates cannot request a parking spot!'),
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ParkingRequestPage() {
  const { data, error, isLoading } = useSWR(
    '/api/v1/student/userProfile',
    fetcher
  );

  const [insuranceFile, setInsuranceFile] = useState<File>();
  const [licenseFile, setLicenseFile] = useState<File>();

  return (
    <main className={styles.container}>
      {error && <div>There was an error loading your data.</div>}
      {isLoading && <div>Please wait.</div>}

      {!isLoading && (
        <Formik
          className={styles.formPage}
          initialValues={data}
          onSubmit={(values: any) => {
            axios
              .put('/api/v1/student/userProfile', values)
              .then((res) => {
                console.log(res);
                // redirect to home
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          validationSchema={AboutMeSchema}
          // reset form when initial values change
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="phone">Phone number</label>
              <Field type="tel" name="phone" id="phone" />
              <ErrorMessage name="phone" component="div" />

              {/* TODO: derive from email */}
              {/* <Field type="text" name="studentId" /> */}
              {/* <ErrorMessage name="studentId" component="div" /> */}

              <label htmlFor="grade">
                Grade level{' '}
                <Tooltip content="Students may not park on campus as a freshman">
                  <InfoCircledIcon />
                </Tooltip>
              </label>
              <div role="group" id="grade">
                <label>
                  <Field type="radio" name="grade" value="10" />
                  10
                </label>
                <label>
                  <Field type="radio" name="grade" value="11" />
                  11
                </label>
                <label>
                  <Field type="radio" name="grade" value="12" />
                  12
                </label>
              </div>
              <ErrorMessage name="grade" component="div" />

              <section>
                <h2>Driver information</h2>
                <FileInput
                  id="license-photo"
                  name="student.driversLicense"
                  accept="image/*"
                  setFile={async (h: File) => {
                    setLicenseFile(h);
                    let { data } = await axios.post("/api/v1/student/getPresignedUrl", {
                      name: h?.name,
                      type: h?.type,
                    });

                    console.log(data);

                    let uploadResp = await axios.put(data.url, h.stream, {
                      headers: {
                        "Content-type": h.type,
                        "Access-Control-Allow-Origin": "*",
                      },
                    });

                    console.log(uploadResp.data);

                  }}
                />

                <label htmlFor="insurance-photo">
                  Photo of vehicle's insurance
                </label>
                <FileInput
                  id="insurance-photo"
                  name="vehicle.proofOfInsurance"
                  accept="image/*"
                  setFile={(h: File) => {setInsuranceFile(h)}}
                />
              </section>

              <button type="submit" disabled={isSubmitting}>
                Submit <ArrowRightIcon />
              </button>
            </Form>
          )}
        </Formik>
      )}
    </main>
  );
}
