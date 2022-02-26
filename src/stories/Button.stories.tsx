import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from 'components/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'submit',
  children: 'Primary',
  onClick: () => {
    alert('Primary');
  },
};
