import { Loader2 } from "lucide-react";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size }: SpinnerProps) {
  return <Loader2 className="animate-spin text-slate-600" size={size ?? 100} />;
}
