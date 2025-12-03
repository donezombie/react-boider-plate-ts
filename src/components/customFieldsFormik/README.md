# Custom Formik Fields

Use only for Formik forms. These components are designed to work seamlessly with Formik's `FormikField` wrapper.

## Available Components

- **InputField** - Text input field
- **SelectField** - Dropdown select with static options
- **AsyncSelectField** - Dropdown select with async/API-loaded options
- **CheckBoxField** - Checkbox input
- **RadioField** - Radio button group
- **SwitchBoxField** - Toggle switch
- **DateTimePickerField** - Date and time picker

## Usage Examples

### SelectField (Static Options)

```tsx
import FormikField from "@/components/customFieldsFormik/FormikField";
import SelectField from "@/components/customFieldsFormik/SelectField";

<FormikField
  component={SelectField}
  name="gender"
  options={[
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ]}
  label="Gender"
  placeholder="Select gender"
  required
/>

// With clearable option (shows X button to clear selection)
<FormikField
  component={SelectField}
  name="status"
  options={[
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
  ]}
  isClearable={true}
  label="Status"
  placeholder="Select status"
/>

// Multi-select mode (allows selecting multiple options)
<FormikField
  component={SelectField}
  name="tags"
  options={[
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ]}
  isMulti={true}
  isClearable={true}
  label="Select Tags"
  placeholder="Choose tags"
/>
```

### AsyncSelectField (Dynamic/API Options)

```tsx
import FormikField from "@/components/customFieldsFormik/FormikField";
import AsyncSelectField from "@/components/customFieldsFormik/AsyncSelectField";
import { SelectOption } from "@/interfaces/common";

// Example with API call
<FormikField
  component={AsyncSelectField}
  name="userId"
  loadOptions={async (inputValue?: string): Promise<SelectOption[]> => {
    // Make API call with optional search input
    const response = await fetch(`/api/users?search=${inputValue || ""}`);
    const data = await response.json();

    // Return array of SelectOption
    return data.map((user: any) => ({
      label: user.name,
      value: user.id,
    }));
  }}
  label="Select User"
  placeholder="Search and select a user"
  placeholderSearch="Search users..."
  required
/>

// With caching enabled (recommended for better performance)
<FormikField
  component={AsyncSelectField}
  name="categoryId"
  loadOptions={async (inputValue?: string): Promise<SelectOption[]> => {
    const response = await httpService.get("/api/categories", {
      params: { search: inputValue },
    });
    return response.data.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));
  }}
  cacheOptions={true}
  debounceMs={500}
  defaultOptions={[]}
  label="Category"
/>

// With clearable option (shows X button to clear selection)
<FormikField
  component={AsyncSelectField}
  name="userId"
  loadOptions={async (inputValue?: string): Promise<SelectOption[]> => {
    const response = await httpService.get("/api/users", {
      params: { search: inputValue },
    });
    return response.data.map((user: any) => ({
      label: user.name,
      value: user.id,
    }));
  }}
  isClearable={true}
  label="Select User"
  placeholder="Choose a user"
/>

// Multi-select mode (allows selecting multiple options)
<FormikField
  component={AsyncSelectField}
  name="categories"
  loadOptions={async (inputValue?: string): Promise<SelectOption[]> => {
    const response = await httpService.get("/api/categories", {
      params: { search: inputValue },
    });
    return response.data.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));
  }}
  isMulti={true}
  isClearable={true}
  label="Select Categories"
  placeholder="Choose categories"
/>
```

## SelectField Props

| Prop                  | Type                                                  | Default            | Description                                                                                                                                          |
| --------------------- | ----------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`             | `SelectOption[]`                                      | **Required**       | Array of select options                                                                                                                              |
| `isClearable`         | `boolean`                                             | `false`            | Show clear button (X icon) when a value is selected                                                                                                  |
| `isMulti`             | `boolean`                                             | `false`            | Enable multi-select mode. Value will be an array of selected options                                                                                 |
| `label`               | `string \| React.ReactNode`                           | -                  | Field label                                                                                                                                          |
| `required`            | `boolean`                                             | `false`            | Show required indicator                                                                                                                              |
| `placeholder`         | `string`                                              | -                  | Placeholder text for the select button                                                                                                               |
| `placeholderSearch`   | `string`                                              | `"Search item"`    | Placeholder for search input                                                                                                                         |
| `messageItemNotFound` | `string`                                              | `"No item found."` | Message when no options are found                                                                                                                    |
| `classNameLabel`      | `string`                                              | -                  | Custom class for label                                                                                                                               |
| `classNameContainer`  | `string`                                              | -                  | Custom class for container                                                                                                                           |
| `afterOnChange`       | `(e: SelectOption \| SelectOption[] \| null) => void` | -                  | Callback fired after value changes. Always receives SelectOption object(s) or null. In multi-select mode, receives an array of SelectOption objects. |

## AsyncSelectField Props

| Prop                  | Type                                                  | Default            | Description                                                                                                                                          |
| --------------------- | ----------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loadOptions`         | `(inputValue?: string) => Promise<SelectOption[]>`    | **Required**       | Async function that returns options. Receives optional search input value.                                                                           |
| `defaultOptions`      | `SelectOption[]`                                      | `[]`               | Initial options to display before loading                                                                                                            |
| `cacheOptions`        | `boolean`                                             | `false`            | Enable caching of loaded options by search value                                                                                                     |
| `debounceMs`          | `number`                                              | `300`              | Debounce delay in milliseconds for search input                                                                                                      |
| `isClearable`         | `boolean`                                             | `false`            | Show clear button (X icon) when a value is selected                                                                                                  |
| `isMulti`             | `boolean`                                             | `false`            | Enable multi-select mode. Value will be an array of selected options                                                                                 |
| `label`               | `string \| React.ReactNode`                           | -                  | Field label                                                                                                                                          |
| `required`            | `boolean`                                             | `false`            | Show required indicator                                                                                                                              |
| `placeholder`         | `string`                                              | -                  | Placeholder text for the select button                                                                                                               |
| `placeholderSearch`   | `string`                                              | `"Search item"`    | Placeholder for search input                                                                                                                         |
| `messageItemNotFound` | `string`                                              | `"No item found."` | Message when no options are found                                                                                                                    |
| `classNameLabel`      | `string`                                              | -                  | Custom class for label                                                                                                                               |
| `classNameContainer`  | `string`                                              | -                  | Custom class for container                                                                                                                           |
| `afterOnChange`       | `(e: SelectOption \| SelectOption[] \| null) => void` | -                  | Callback fired after value changes. Always receives SelectOption object(s) or null. In multi-select mode, receives an array of SelectOption objects. |

## Features

- **Automatic Loading**: Options are loaded when the dropdown opens
- **Search Support**: Search input is passed to `loadOptions` for filtering
- **Debouncing**: Search requests are debounced to reduce API calls
- **Caching**: Optional caching of results by search term
- **Loading State**: Shows loading indicator while fetching
- **Error Handling**: Displays error messages if loading fails
- **Clearable**: Optional clear button to reset the selected value
- **Multi-Select**: Support for selecting multiple options with badge display and individual item removal
- **Formik Integration**: Fully integrated with Formik validation and error handling
