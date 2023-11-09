import { FastField, Field } from "formik";
import * as React from "react";

type Props<TComponentProps> = {
  name: string;
  isFastField?: boolean;
  component: React.ComponentType<TComponentProps>;
} & Omit<TComponentProps, "name" | "component" | "field" | "form">;

class FormikField<T> extends React.PureComponent<Props<T>> {
  render() {
    const WrapperComponent = this.props.isFastField ? FastField : Field;
    const { name, component, ...props } = this.props;
    return <WrapperComponent name={name} component={component} {...props} />;
  }
}

export default FormikField;
