type MainLayoutProps = {
  children: JSX.Element;
  theme?: 'light' | 'dark';
  title?: string;
};

const MainLayout = ({ title, children, theme = 'dark' }: MainLayoutProps) => {
  let CLASSES;
  switch (theme) {
    case 'light':
      CLASSES = 'bg-white';
      break;
    case 'dark':
      CLASSES = 'bg-gray-700 text-white';
      break;
    default:
      CLASSES = 'bg-gray-700 text-white';
  }
  return (
    <div
      className={`px-10 py-10 w-full max-h-screen overflow-hidden ${CLASSES}`}
    >
      <h1 className="mb-3 font-bold h-auto">{title}</h1>
      {children}
    </div>
  );
};

MainLayout.defaultProps = {
  title: '',
  theme: 'dark',
};

export default MainLayout;
