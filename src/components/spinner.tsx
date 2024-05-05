import { Loader2 } from "lucide-react";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size }: SpinnerProps) {
  return <Loader2 className="animate-spin" size={size ?? 100} />;
}
