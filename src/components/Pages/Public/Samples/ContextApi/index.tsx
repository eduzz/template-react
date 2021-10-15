import { CardContent, Divider } from '@mui/material';

import Grid from '@eduzz/houston-ui/Grid';
import Typography from '@eduzz/houston-ui/Typography';

import AutoComplete from './AutoComplete';
import AutoCompleteFixed from './AutoCompleteFixed';
import AutoCompleteRedux from './AutoCompleteRedux';

const ContextApi = () => {
  return (
    <div>
      <AutoComplete />

      <Divider />

      <CardContent>
        <Typography size='medium' marginBottom>
          Redux:
        </Typography>
      </CardContent>

      <Grid.Container>
        <Grid.Row>
          <Grid.Column xs={true}>
            <AutoCompleteRedux />
          </Grid.Column>
          {/* <Grid.Column xs={true}>
            <AutoCompleteRedux />
          </Grid.Column> */}
        </Grid.Row>
      </Grid.Container>

      <Divider />

      <CardContent>
        <Typography size='medium' marginBottom>
          Otimizado:
        </Typography>
      </CardContent>

      <AutoCompleteFixed />
    </div>
  );
};

export default ContextApi;
