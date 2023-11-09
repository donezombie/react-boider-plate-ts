import { FieldInputProps, FormikProps } from "formik";

export interface AdditionalFormikProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}
