import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

const IndeterminateCheckbox = (
  props: CheckboxProps & { indeterminate?: boolean }
) => {
  return (
    <div style={{ width: 60 }}>
      <Checkbox {...props} />
    </div>
  );
};

export default IndeterminateCheckbox;
