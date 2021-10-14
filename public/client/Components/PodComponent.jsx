import React from 'react';

// TODOS:
// what does rendering of a Pod look like? 
// Does clicking on the pod have any impact / open a modal with more info / etc?

function PodComponent (props) {
  // console.log('props of each podcomponent: ', props)
  return (
      <div className= "pod-component">
          {props.name}
      </div>
  );
};

export default PodComponent;