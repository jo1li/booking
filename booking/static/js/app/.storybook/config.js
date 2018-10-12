import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/buttons.js');
  require('../src/stories/forms.js');
  require('../src/stories/cards.js');
  // etc
}

configure(loadStories, module);