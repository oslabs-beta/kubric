import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ZingChart from 'zingchart-react';
import PodCpuComponent from '../Components/PodCpuComponent.jsx'
import PodMemoryComponent from '../Components/PodMemoryComponent.jsx';

export default function PodChartContainer() {

  const charts = {

  }

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <PodCpuComponent style="width: 50%"/>
      <PodMemoryComponent style="width: 50%"/>
      
    </Stack>
  );
}