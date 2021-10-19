import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ZingChart from 'zingchart-react';
import NodeCpuComponent from '../Components/NodeCpuComponent.jsx'
import NodeMemoryComponent from '../Components/NodeMemoryComponent.jsx';

export default function PodChartContainer() {

  const charts = {

  }

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <NodeCpuComponent style="width: 50%"/>
      <NodeMemoryComponent style="width: 50%"/>
      
    </Stack>
  );
}