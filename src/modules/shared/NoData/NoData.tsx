import { Box, Typography } from "@mui/material"
import noData from "../../../assets/hand-drawn-no-data-concept_52683-127823.avif"

export default function NoData() {
  return (
    <Box sx={{marginTop:20}}>
      <img alt="nodata" src={noData} width={500} />
      <Typography variant="h5" sx={{textAlign:"center"}}>No Data</Typography>
    </Box>
  )
}
