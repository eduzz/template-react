import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles/withStyles';

export default (theme: Theme): StyleRules<any> => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  created: {
    display: 'flex',
    flexDirection: 'column',
    justifyContentc: 'center',
    paddingLeft: '40px',
    color: '#7A8999',
    lineHeight: '120%',
  },
  smallText: {
    fontSize: '80%',
  },
  details: {
    display: 'block',
    padding: 0,
  },
  crtItem: {
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': { backgroundColor: 'rgba(0,0,0,.02)', },
  },
  crtIcon: {
    flexBasis: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  crtTitle: {
    flexBasis: 'calc(100% - 220px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10px',
  },
  crtActions: {
    flexBasis: '180px',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crtDropdown: {
    flexBasis: '100px',
    textAlign: 'right',
  },
  loader: {
    textAlign: 'center',
    padding: 20
  }
});