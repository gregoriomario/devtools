import Content from '../../layout/Content';

const ganteng = '../../images/ganteng.jpeg';

export type ImageType = {
  buffer: string;
  mimeType: string;
  name: string;
};

type Size = 'lg' | 'md' | 'sm' | 'xs' | 'full';

type Rounded = `rounded-${Size}`;

type ImageProps = {
  src: string | ImageType;
  className?: string;
  rounded?: Rounded;
  over?: number;
};

const Image = ({
  src = ganteng,
  className = '',
  rounded = 'rounded-lg',
  over = 0,
}: ImageProps): JSX.Element => {
  return (
    <Content className={`relative overflow-hidden ${rounded} ${className} `}>
      {!!over && (
        <div className="absolute flex justify-center items-center text-xl font-semibold bg-black bg-opacity-70 z-10 w-full h-full">
          <p>+ {over}</p>
        </div>
      )}
      {typeof src === 'string' ? (
        <img
          className="absolute w-full h-full object-cover"
          src={src}
          alt={src}
        />
      ) : (
        <img
          className="absolute w-full h-full object-cover"
          src={`data:${src.mimeType};base64,${src.buffer}`}
          alt={src.name}
        />
      )}
    </Content>
  );
};

Image.defaultProps = {
  className: '',
  rounded: 'rounded-lg',
  over: 0,
};

export default Image;
