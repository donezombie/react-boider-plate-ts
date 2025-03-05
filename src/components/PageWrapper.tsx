const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="component:PageWrapper content-container">{children}</div>
  );
};

export default PageWrapper;
