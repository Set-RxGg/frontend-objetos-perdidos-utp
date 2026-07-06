export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="mb-2 block text-sm font-medium" {...props}>
      {props.children}
    </label>
  );
}
