import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import SelectField from "../customFieldsFormik/SelectField";
import FormikField from "../customFieldsFormik/FormikField";
import InputField from "../customFieldsFormik/InputField";
import RadioField from "../customFieldsFormik/RadioField";
import DateTimePickerField from "../customFieldsFormik/DateTimePickerField";
import SwitchBoxField from "../customFieldsFormik/SwitchBoxField";
import CheckBoxField from "../customFieldsFormik/CheckBoxField";
import DialogConfirm from "../dialogs/DialogConfirm";
import DialogExample from "../dialogs/DialogExample";
import useToggleDialog from "@/hooks/useToggleDialog";

const ExampleComponents = () => {
  const [openConfirm, toggleConfirm, shouldRenderConfirm] = useToggleDialog();
  const [openExample, toggleExample, shouldRenderExample] = useToggleDialog();

  return (
    <Formik
      initialValues={{
        gender: "m",
      }}
      onSubmit={() => {}}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-8 rounded-md border p-3">
            <div className="button-example">
              <p className="mb-2 text-2xl font-semibold">Buttons</p>
              <div className="flex gap-3">
                <Button>Button Primary</Button>
                <Button variant={"outline"}>Button Outline</Button>
                <Button variant={"secondary"}>Button Secondary</Button>
                <Button isLoading={true}>Button Loading</Button>
                <Button variant={"ghost"}>Button Ghost</Button>
              </div>
            </div>

            <div className="typography-example">
              <p className="mb-2 text-2xl font-semibold">Typography</p>
              <div className="flex flex-col gap-3 pl-10">
                <p className="text-5xl">Typography 5xl</p>
                <p className="text-4xl">Typography 4xl</p>
                <p className="text-3xl">Typography 3xl</p>
                <p className="text-2xl">Typography 2xl</p>
                <p className="text-xl">Typography xl</p>
                <p className="text-lg">Typography lg</p>
                <p className="text-md">Typography md</p>
                <p className="text-sm">Typography sm</p>
              </div>
            </div>

            <div className="form-example">
              <p className="mb-2 text-2xl font-semibold">Form</p>
              <div className="flex max-w-md flex-col gap-4">
                <FormikField
                  component={SelectField}
                  name="gender"
                  options={[
                    {
                      label: "Male",
                      value: "m",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                  label="Gender"
                />

                <FormikField
                  component={InputField}
                  name="username"
                  label="Username"
                  placeholder="Enter your email"
                  required
                />

                <FormikField
                  component={InputField}
                  name="Password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <FormikField
                  component={RadioField}
                  name="radioInput"
                  label="Radio Input"
                  options={[
                    { label: "Radio 1", value: "1" },
                    { label: "Radio 2", value: "2" },
                    { label: "Radio 3", value: "3" },
                  ]}
                  required
                />

                <FormikField
                  component={DateTimePickerField}
                  name="date"
                  label="Date time picker"
                  required
                />

                <FormikField
                  component={SwitchBoxField}
                  name="toggle"
                  label="Toggler"
                />

                <FormikField
                  component={CheckBoxField}
                  name="agree"
                  label="Checkbox field"
                />
              </div>
            </div>

            <div className="dialogs-example flex flex-col gap-2">
              <p className="mb-2 text-2xl font-semibold">Dialogs</p>
              {shouldRenderConfirm && (
                <DialogConfirm
                  isOpen={openConfirm}
                  toggle={toggleConfirm}
                  title="Confirmation"
                  content="Are you sure you want do something?"
                  onSubmit={(_, { setSubmitting }) => {
                    setSubmitting(true);
                    setTimeout(() => {
                      toggleConfirm();
                    }, 2000);
                  }}
                />
              )}

              {shouldRenderExample && (
                <DialogExample isOpen={openExample} toggle={toggleExample} />
              )}

              <div>
                <Button onClick={toggleConfirm}>Open confirm dialog</Button>
              </div>
              <div>
                <Button onClick={toggleExample}>Open example dialog</Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExampleComponents;
