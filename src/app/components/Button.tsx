type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  noBg?: boolean;
};

function Button({
  children,
  className = "",
  noBg = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer flex items-center gap-2 rounded-md p-2 transition 
      ${noBg}
        ?""
        : "bg-transparent hover:bg-white/10 active:bg-white/15"}${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
