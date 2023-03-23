import CommonStyles from '.';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <CommonStyles.Box sx={{ pt: 2, pb: 2 }}>
          <CommonStyles.Typography>{children}</CommonStyles.Typography>
        </CommonStyles.Box>
      )}
    </div>
  );
}

export default TabPanel;
