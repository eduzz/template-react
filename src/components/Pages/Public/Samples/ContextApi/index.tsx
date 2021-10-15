import { CardContent, Divider } from '@mui/material';

import Grid from '@eduzz/houston-ui/Grid';
import Typography from '@eduzz/houston-ui/Typography';

import AutoComplete from './AutoComplete';
import AutoCompleteFixed from './AutoCompleteFixed';
import AutoCompleteRedux from './AutoCompleteRedux';

const ContextApi = () => {
  return (
    <Grid.Container>
      <AutoComplete />

      <Divider />

      <Grid.Row>
        <Grid.Column xs={true}>
          <Typography size='medium' marginBottom>
            Redux:
          </Typography>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column xs={true}>
          <AutoCompleteRedux />
        </Grid.Column>
        {/* <Grid.Column xs={true}>
            <AutoCompleteRedux />
          </Grid.Column> */}
      </Grid.Row>

      <Divider />

      <CardContent>
        <Typography size='medium' marginBottom>
          Otimizado:
        </Typography>
      </CardContent>

      <Grid.Row>
        <Grid.Column xs={true}>
          <AutoCompleteFixed />
        </Grid.Column>
        {/* <Grid.Column xs={true}>
            <AutoCompleteFixed />
          </Grid.Column> */}
      </Grid.Row>
    </Grid.Container>
  );
};

export default ContextApi;
