import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ZingChart from 'zingchart-react';
import PodCpuComponent from '../Components/PodCpuComponent.jsx'
import PodMemoryComponent from '../Components/PodMemoryComponent.jsx';
import { makeStyles } from '@mui/styles';
import PodWriteToDiskComponent from '../Components/PodWriteToDiskComponent.jsx';

export default function PodChartContainer() {
  const charts = {

  }
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{display:"flex", 
      flexDirection:"row",
      justifyContent:'space-evenly'}}
    >
      <PodCpuComponent />
      <PodMemoryComponent />
      <PodWriteToDiskComponent/>
      
    </Stack>
  );
}