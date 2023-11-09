interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  return <div className="component:DefaultLayout">{props.children}</div>;
};

export default DefaultLayout;
