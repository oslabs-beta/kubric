import * as React from 'react';
import Stack from '@mui/material/Stack';
import PodCpuComponent from '../Components/PodCpuComponent.jsx'
import PodMemoryComponent from '../Components/PodMemoryComponent.jsx';
import PodWriteToDiskComponent from '../Components/PodWriteToDiskComponent.jsx';
import PodLogsComponent from '../Components/PodLogsComponent.jsx';

export default function PodChartContainer() {

  return (
    <Stack
      spacing={2}
      sx={{display:"flex", 
      justifyContent:'space-evenly'}}
    >
      <PodCpuComponent yLabel={"Per Pod(Usage Second Rate)"}/>
      <PodMemoryComponent yLabel={"Per Pod(MB)"}/>
      <PodWriteToDiskComponent yLabel={"Per Pod(MBps)"}/>
      <PodLogsComponent yLabel={"Per Pod(MB)"}/>
      
    </Stack>
  );
}