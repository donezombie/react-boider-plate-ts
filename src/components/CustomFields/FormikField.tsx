import { Field } from "formik";
import * as React from "react";

type Props<TComponentProps> = {
  name: string;
  component: React.ComponentType<TComponentProps>;
} & Omit<TComponentProps, "name" | "component" | "field" | "form">;

class FormikField<T> extends React.PureComponent<Props<T>> {
  render() {
    const { name, component, ...props } = this.props;
    return <Field name={name} component={component} {...props} />;
  }
}

export default FormikField;
