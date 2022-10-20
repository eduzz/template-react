// https://ant.design/docs/react/replace-moment#Use-date-fns
import generatePicker from 'antd/lib/date-picker/generatePicker';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import 'antd/lib/date-picker/style/index';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker.RangePicker;
