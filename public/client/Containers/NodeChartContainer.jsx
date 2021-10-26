import * as React from 'react';
import Stack from '@mui/material/Stack';
import NodeCpuComponent from '../Components/NodeCpuComponent.jsx'
import NodeMemoryComponent from '../Components/NodeMemoryComponent.jsx';
import NodeCpuSaturationComponent from '../Components/NodeCpuSaturationComponent.jsx';
import NodeWriteToDiskComponent from '../Components/NodeWriteToDiskComponent.jsx';

export default function PodChartContainer() {

  const charts = {

  }

  return (
    <div>
      <Stack
        spacing={2}
        sx={{display:"flex", 
        justifyContent:'space-evenly'}}
      >
        <NodeCpuComponent />
        <NodeMemoryComponent />
        <NodeCpuSaturationComponent />
        <NodeWriteToDiskComponent />
      </Stack>
    </div>
  );
}