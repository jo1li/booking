import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/buttons.js');
  require('../src/stories/forms.js')
  // etc
}

configure(loadStories, module);