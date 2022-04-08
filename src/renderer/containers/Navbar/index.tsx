import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faClock,
  faCode,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Content from '../../layout/Content';

type NavbarProps = {
  className?: string;
};

type Property = {
  label: string;
  icon: IconDefinition;
  href: string;
};

const properties: Array<Property> = [
  {
    label: 'Time Converter',
    icon: faClock,
    href: '/',
  },
  {
    label: 'JSON to YAML',
    icon: faCode,
    href: '/json',
  },
  {
    label: 'Image Resize',
    icon: faImage,
    href: '/resize',
  },
];

const Navbar = ({ className }: NavbarProps): JSX.Element => {
  return (
    <Content
      className={`bg-slate-800 w-[300px] min-h-screen text-slate-300 px-3 py-10 ${className}`}
    >
      <h1 className="text-lg font-semibold pb-3">Menu</h1>
      <div>
        <ul>
          {properties.map((p) => {
            return (
              <Link
                to={p.href}
                key={p.label}
                className="rounded-lg py-2 px-2 hover:bg-slate-900 w-full text-sm flex items-center gap-x-2"
                role="button"
              >
                <FontAwesomeIcon icon={p.icon} />
                <span>{p.label}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </Content>
  );
};

Navbar.defaultProps = {
  className: '',
};

export default Navbar;
