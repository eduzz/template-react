import { Card } from '@mui/material';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';
import Typography from '@eduzz/houston-ui/Typography';

import ContextApiExample from './ContextApi';
import ReduxExample from './Redux';
import RxJsExample from './RxJs';

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
        <ContextApiExample />
      </Card>

      <Typography size='large' marginBottom>
        RxJs
      </Typography>
      <Card className={styles.card}>
        <RxJsExample />
      </Card>
    </div>
  );
};

export default SamplesPage;
