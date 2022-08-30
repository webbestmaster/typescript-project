/* eslint-disable import/no-default-export */
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './button';

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type ButtonTemplateType = ComponentStory<typeof Button>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: ButtonTemplateType = Button.bind({});
Primary.args = {
    label: 'Button',
    primary: true,
};

export const Secondary: ButtonTemplateType = Button.bind({});
Secondary.args = {
    label: 'Button',
};

export const Large: ButtonTemplateType = Button.bind({});
Large.args = {
    label: 'Button',
    size: 'large',
};

export const Small: ButtonTemplateType = Button.bind({});
Small.args = {
    label: 'Button',
    size: 'small',
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const componentMetaButton: ComponentMeta<typeof Button> = {
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: {control: 'color'},
    },
    component: Button,
    title: 'Example/Button',
};

export default componentMetaButton;
