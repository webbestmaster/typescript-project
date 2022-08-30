/* eslint-disable import/no-default-export */
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Header} from './header';

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type HeaderTemplateType = ComponentStory<typeof Header>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const LoggedIn: HeaderTemplateType = Header.bind({});
LoggedIn.args = {
    user: {name: 'Jane Doe'},
};

export const LoggedOut: HeaderTemplateType = Header.bind({});
LoggedOut.args = {};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const componentMetaHeader: ComponentMeta<typeof Header> = {
    component: Header,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    title: 'Example/Header',
};

export default componentMetaHeader;
