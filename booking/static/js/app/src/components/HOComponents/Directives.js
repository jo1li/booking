import React from 'react';

const Directives = WrappedComponent => ({
  showIf,
  ...otherProps,
}) => {

  if (!showIf) {
     return <div/>
  }

  return (
        <WrappedComponent
          {...otherProps}
        />
    )
  }

export default Directives;