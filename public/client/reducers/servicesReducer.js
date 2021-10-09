import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  services: [],
}

function servicesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_SERVICES:
      const { items } = payload.data;
      let services = [];
      items.forEach(service => {
        const { metadata, spec, status } = service;
        // if this isn't a kubernetes service, push it into services array
        if (metadata.name !== 'kubernetes' ) {
          services.push({
            metadata: {
              creationTime: metadata.creationTimestamp,
              name: metadata.name,
              namespace: metadata.namespace,
              // where are the strings on the next two lines coming from? 
              managedBy: metadata.labels['app.kubernetes.io/managed-by'],
              app: metadata.labels['k8s-app'],
              prometheus: metadata.labels.prometheus,
              uid: metadata.uid,
            },
            spec: { ...spec },
            status: { ...status },
          });
        }
      });
      return { ...state, services };
      
    default:
      return state;
  }
}

export default servicesReducer;