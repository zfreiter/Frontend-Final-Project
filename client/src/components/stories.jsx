import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import pic from '../images/statistics.jpg';
import picTwo from '../images/businessman.jpg';
import picThree from '../images/dollar.jpg';
import picFour from '../images/shares.jpg';
import picFive from '../images/pexels_burak_the_weekender_186464.jpg';
import picSix from '../images/pexels_cottonbro-studio_3943748.jpg';
import picSeven from '../images/pexels_cottonbro_studio_3943716.jpg';
import picEight from '../images/pexels_pixabay_259132.jpg';
import picNine from '../images/pexels_pixabay_534219.jpg';
import picTen from '../images/pexels_pixabay_534229.jpg';
import picEleven from '../images/pexels_skitterphoto_9660.jpg';
const Stories = () => {
  const stories = useSelector((state) => state.auth.stories);
  const smallerSelection = stories.slice(0, 20);
  const pictures = [
    pic,
    picTwo,
    picThree,
    picFour,
    picFive,
    picSix,
    picSeven,
    picEight,
    picNine,
    picTen,
    picEleven,
    pic,
    picTwo,
    picThree,
    picFour,
    picFive,
    picSix,
    picSeven,
    picEight,
    picNine,
  ];

  return (
    <Box>
      <Box display={'flex'} width={'1365px'} borderRadius={1} mb={1} p={1} sx={{ boxShadow: 5 }}>
        <Typography variant='h5'>Todays top market stories</Typography>
      </Box>
      <Box display={'flex'} flexWrap={'wrap'} gap={1}>
        {smallerSelection.map((story, key) => (
          <Card key={key} sx={{ maxWidth: 450 }} elevation={5}>
            <CardContent>
              <CardMedia
                component='img'
                height='125'
                image={pictures[key]}
                alt='Placement picture'
              />

              <Typography sx={{ fontSize: 17 }} mt={1} fontWeight={700} gutterBottom>
                {story.newsTitle}
              </Typography>
              <Typography sx={{ fontSize: 11 }} fontWeight={700}>
                {story.shotDesc}
              </Typography>
              <Typography sx={{ fontSize: 10 }} mt={1}>
                {story.postedBy}
                {story.postedOn}
              </Typography>
            </CardContent>
            <CardActions sx={{ ml: 1, mb: 0 }}>
              <Link href={story.newsUrl} underline='hover' target='_blank'>
                Read more
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Stories;
