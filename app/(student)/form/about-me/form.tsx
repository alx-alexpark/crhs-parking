import axios from 'axios';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';

import { FileInput, Tooltip } from '@/components';
import { ArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import ConfirmSubmit from '../_components/confirm-submit';
import styles from '../form.module.scss';

interface AboutMeFormProps {
  data: any;
}

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

export function AboutMeForm({ data }: AboutMeFormProps) {
  const [insuranceFile, setInsuranceFile] = useState<File>();
  const [licenseFile, setLicenseFile] = useState<File>();

  const initialData = useMemo(() => {
    if (!data) return {};

    return initialData;
  }, [data]);

  return (
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
      {({ submitForm, isSubmitting, setFieldValue }) => (
        <Form>
          <label htmlFor="phone">Student's phone number</label>
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

            <label htmlFor="licensee-photo">
              Photo of driver's license. Must not be a learner's permit.
            </label>
            <FileInput
              id="license-photo"
              name="student.driversLicense"
              accept="image/*"
              setFile={async (h: File) => {
                setLicenseFile(h);
                let { data } = await axios.post(
                  '/api/v1/student/getPresignedUrl',
                  {
                    name: h?.name,
                    type: h?.type,
                  }
                );

                console.log(data);

                let uploadResp = await axios.put(data.url, h.stream, {
                  headers: {
                    'Content-type': h.type,
                    'Access-Control-Allow-Origin': '*',
                  },
                });

                const url = uploadResp.data;
                console.log(url);
                setFieldValue('student.driversLicense', url);
                return url;
              }}
            />

            <label htmlFor="insurance-photo">
              Photo of vehicle's insurance
            </label>
            <FileInput
              id="insurance-photo"
              name="vehicle.proofOfInsurance"
              accept="image/*"
              setFile={async (h: File) => {
                setInsuranceFile(h);
                let { data } = await axios.post(
                  '/api/v1/student/getPresignedUrl',
                  {
                    name: h?.name,
                    type: h?.type,
                  }
                );

                console.log(data);

                let uploadResp = await axios.put(data.url, h.stream, {
                  headers: {
                    'Content-type': h.type,
                    'Access-Control-Allow-Origin': '*',
                  },
                });

                const url = uploadResp.data;
                console.log(url);
                setFieldValue('vehicle.proofOfInsurance', url);
                return url;
              }}
            />
          </section>

          <ConfirmSubmit onSubmit={submitForm}>
            <button type="button" disabled={isSubmitting}>
              Submit
            </button>
          </ConfirmSubmit>
        </Form>
      )}
    </Formik>
  );
}
