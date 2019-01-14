import { AppStyle } from 'decorators/withStyles';

const styles: AppStyle = theme => ({
  root: {
    background: theme.palette.primary.main,
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: '320px',
    height: '400px',
    maxWidth: 'calc(100% - 30px)',
    textAlign: 'center'
  },
  card: {
    minHeight: 0
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20
  },
  logoImage: {
    maxWidth: 230
  }
});

export default styles;