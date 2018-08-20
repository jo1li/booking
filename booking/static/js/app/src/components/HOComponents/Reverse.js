import React from 'react';

const Directives = ({
  If,
  children
}) => {

 return If ? React.Children.toArray(children).reverse() : children;
}

export default Directives;
