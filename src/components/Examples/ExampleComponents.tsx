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
import { Link } from "react-router-dom";
import { useGetTodos } from "@/modules/todos";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import { cloneDeep } from "lodash";
import Loading from "../ui/loading";
import AsyncSelectField from "../customFieldsFormik/AsyncSelectField";
import * as Yup from "yup";
import DialogForm from "../dialogs/DialogForm";

const ExampleComponents = () => {
  const [openConfirm, toggleConfirm, shouldRenderConfirm] = useToggleDialog();
  const [openExample, toggleExample, shouldRenderExample] = useToggleDialog();
  const [
    openExampleComponents,
    toggleExampleComponents,
    shouldRenderExampleComponents,
  ] = useToggleDialog();

  const { filters, setFilters } = useFiltersHandler({
    page: 1,
    rowsPerPage: 15,
  });
  const { data, isPending } = useGetTodos({ filters });

  const renderExampleTodos = () => {
    if (isPending) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    return (
      <div>
        {(data || []).map((el) => {
          return (
            <div key={el.id}>
              {el.id} - {el.title}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        radioInput: "1",
        date: new Date(),
        toggle: true,
        agree: true,
        gender: { label: "Male", value: "m" },
        genderAsync: [
          { label: "Male", value: "m" },
          { label: "Female", value: "female" },
        ],
      }}
      onSubmit={() => {}}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required field!"),
        password: Yup.string().required("Password is required field!"),
        radioInput: Yup.string().required("Radio input is required field!"),
        date: Yup.date().required("Date is required field!"),
        toggle: Yup.boolean().required("Toggle is required field!"),
        agree: Yup.boolean().required("Agree is required field!"),
      })}
    >
      {({ values, errors }) => {
        return (
          <Form className="flex flex-col gap-8 rounded-md border p-3">
            <div className="button-example ">
              <p className="mb-2 text-2xl font-semibold">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">Button Size lg</Button>
                <Button size="sm">Button Size sm</Button>

                <Button>Button Primary</Button>
                <Button variant={"secondary"}>Button Secondary</Button>
                <Button variant={"destructive"}>Button Destructive</Button>
                <Button variant={"outline"}>Button Outline</Button>
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

                <Link to="/" className="is-link">
                  Link
                </Link>
              </div>
            </div>

            <div className="form-example">
              <p className="mb-2 text-2xl font-semibold">Form</p>
              <code className="mb-4 block">
                {JSON.stringify({ values, errors })}
              </code>

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
                  isClearable
                  placeholder="Select gender"
                  label="Gender"
                />

                <FormikField
                  component={AsyncSelectField}
                  name="genderAsync"
                  label="Gender (Async)"
                  required
                  isClearable
                  isMulti
                  loadOptions={(inputValue) => {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        resolve([
                          { label: "Male", value: "m" },
                          { label: "Female", value: "female" },
                          { label: "Other", value: "other" },
                        ]);
                      }, 1000);
                    });
                  }}
                  placeholder="Select Async Gender"
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
                  name="password"
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

              <div className="mt-4">
                <Button type="submit">Submit</Button>
              </div>
            </div>

            <div className="dialogs-example flex flex-col gap-2">
              <p className="mb-2 text-2xl font-semibold">Dialogs</p>
              {shouldRenderExampleComponents && (
                <DialogForm
                  isOpen={openExampleComponents}
                  toggle={toggleExampleComponents}
                />
              )}

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
                <Button onClick={toggleExampleComponents}>
                  Open form dialog
                </Button>
              </div>
              <div>
                <Button onClick={toggleConfirm}>Open confirm dialog</Button>
              </div>
              <div>
                <Button onClick={toggleExample}>Open example dialog</Button>
              </div>
            </div>

            <div>
              {renderExampleTodos()}

              <div className="mt-2 flex gap-3">
                <Button
                  variant="secondary"
                  disabled={filters.page <= 1}
                  onClick={() => {
                    setFilters((prev) => {
                      const next = cloneDeep(prev);
                      next.page = next.page - 1;
                      return next;
                    });
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    setFilters((prev) => {
                      const next = cloneDeep(prev);
                      next.page = next.page + 1;
                      return next;
                    });
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExampleComponents;
