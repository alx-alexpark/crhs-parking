import { ErrorMessage, Field } from 'formik';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  value?: any;
  label: string | null;
}
export function TextInput({ id, name, label, ...props }: TextInputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <Field id={id} name={name} {...props} />
      <ErrorMessage name={name} component="div" />
    </>
  );
}
