/* eslint-disable import/no-default-export */
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {within, userEvent} from '@storybook/testing-library';

import {Page} from './page';

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type PageTemplateType = ComponentStory<typeof Page>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const LoggedOut: PageTemplateType = Page.bind({});

export const LoggedIn: PageTemplateType = Page.bind({});

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
LoggedIn.play = async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {name: /log in/i});

    await userEvent.click(loginButton);
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const componentMetaPagePage: ComponentMeta<typeof Page> = {
    component: Page,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    title: 'Example/Page',
};

export default componentMetaPagePage;
