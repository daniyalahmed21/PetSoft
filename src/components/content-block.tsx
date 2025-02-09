import { cn } from "@/lib/utils";

const ContentBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentBlock;
