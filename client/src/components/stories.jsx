import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
const Stories = () => {
  const stories = useSelector((state) => state.auth.stories);
  const smallerSelection = stories; //.slice(0, 10);

  return (
    <Box>
      <Typography variant='h5'>Todays top market stories</Typography>
      <Box display={'flex'} flexWrap={'wrap'} gap={1}>
        {smallerSelection.map((story, key) => (
          <Card key={key} sx={{ maxWidth: 300 }} elevation={5}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {story.newsTitle}
              </Typography>
              <Typography sx={{ fontSize: 11 }}>{story.shotDesc}</Typography>
              <Typography variant='subtitle2' mt={1}>
                {story.postedBy}
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
