import WayOutline from '@eduzz/houston-icons/WayOutline';
import styled, { css, IStyledProp } from '@eduzz/houston-styles';
import Typography from '@eduzz/houston-ui/Typography';

const NotFoundPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <WayOutline size={60} />
        <Typography size='sm'>Página não encontrada</Typography>
      </div>
    </div>
  );
};

export default styled(NotFoundPage)(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: ${theme.spacing.lg};

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `
);
