type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  noBg?: boolean;
};

function Button({ children, className = "", noBg, ...props }: ButtonProps) {
  const base = noBg
    ? "cursor-pointer flex items-center gap-2 rounded-md p-2"
    : "cursor-pointer flex items-center gap-2 bg-transparent hover:bg-white/10 active:bg-white/15 rounded-md p-2";

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
