import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ZingChart from 'zingchart-react';
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
        // direction="row"
        spacing={2}
        sx={{display:"flex", 
        // flexDirection:"row",
        justifyContent:'space-evenly'}}
      >
        <NodeCpuComponent />
        <NodeMemoryComponent />
        <NodeCpuSaturationComponent />
        <NodeWriteToDiskComponent />
        
      </Stack>

      {/* <Stack
        direction="row"
        spacing={2}
        sx={{display:"flex", 
        flexDirection:"row",
        justifyContent:'space-evenly'}}
      >
        <NodeCpuSaturationComponent />
        <NodeWriteToDiskComponent />
      
      </Stack> */}
    </div>
  );
}