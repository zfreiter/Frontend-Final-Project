import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import pic from '../images/statistics.jpg';
import picTwo from '../images/businessman.jpg';
import picThree from '../images/dollar.jpg';
import picFour from '../images/shares.jpg';
const Stories = () => {
  const stories = useSelector((state) => state.auth.stories);
  const smallerSelection = stories; //.slice(0, 10);
  const pictures = [pic, picTwo, picThree, picFour];
  console.log(stories);
  return (
    <Box>
      <Typography variant='h5'>Todays top market stories</Typography>
      <Box display={'flex'} flexWrap={'wrap'} gap={1}>
        {smallerSelection.map((story, key) => (
          <Card key={key} sx={{ maxWidth: 300 }} elevation={5}>
            <CardContent
              sx={{
                backgroundImage: `url(${pictures[Math.floor(Math.random() * 4)]})`,
                backgroundColor: 'transparent',
                backgroundSize: 'cover',
              }}
            >
              <Typography sx={{ fontSize: 14 }} fontWeight={700} gutterBottom>
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
            <CardActions sx={{ ml: 1 }}>
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
