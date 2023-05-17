import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import CSImage from '../images/city_skyline.jpg';


export default function Login() {
  return <>
  <Box sx={{width: '100%', display: 'inline-flex', alignItems:'center'}}>
    <Box sx={{width: '55%', borderStyle: 'none'}}>
      <ImageList sx={{width: '100%', height:'99vh', overflow:"hidden", marginTop: 0, marginBottom:0}}>
        <img src={CSImage}/>
      </ImageList>
    </Box>
    <Box sx={{width: '45%', borderStyle: 'none'}}>
        <Box className="container" sx={{display: 'flex', backgroundColor: 'gainsboro', margin: 'auto', width: '80%', height: '400px', borderRadius: "10px", alignItems: 'center', justifyContent: 'center'}}>
          test
        </Box>
    </Box>
  </Box>
  </>;
}
