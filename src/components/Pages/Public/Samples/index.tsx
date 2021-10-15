import { Card } from '@mui/material';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';
import Typography from '@eduzz/houston-ui/Typography';

import ContextApi from './ContextApi';
import ReduxExample from './Redux';

const useStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(4)
  },
  card: {
    marginBottom: theme.spacing(4)
  }
}));

const SamplesPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Typography size='large' marginBottom>
        Redux
      </Typography>
      <Card className={styles.card}>
        <ReduxExample />
      </Card>

      <Typography size='large' marginBottom>
        Context API
      </Typography>
      <Card className={styles.card}>
        <ContextApi />
      </Card>
    </div>
  );
};

export default SamplesPage;
