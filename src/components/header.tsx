type Props = {
  title: string;
};
const Header = (props: Props) => {
  return (
    <header>
      <h1 className="pb-4">{props.title}</h1>
    </header>
  );
};

export default Header;
