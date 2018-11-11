# Selectors

Selectors are a thin abstraction between the redux store and your react component. Using selectors will provide a consistent interface for your components to use even if your store structure changes.

Selectors should be used anywhere the redux state is accessed and prepare data for components to use. Memoizing sheould be done in selectors and can be done easily with a library like [reselect](https://github.com/reduxjs/reselect) or lodash `_.memoize`.