
import notfound from "../../../assets/oops-404-error-with-broken-robot-concept-illustration_114360-1932.avif"
import { Box, Typography } from "@mui/material"

export default function NotFound() {
  return (
   <>
   <Box display={'flex'} sx={{justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
        <img width={550} src={notfound} alt="notfound" />
        <Typography variant="h1" fontWeight={'bold'}>Not Found</Typography>
   </Box>
   </>
  )
}
