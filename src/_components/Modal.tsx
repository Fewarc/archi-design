import { cn } from "@/utils/styleUtils";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  className
}) => {
  return open && (
    <section className={cn("w-screen h-screen fixed flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 top-0 left-0", className)}>
      <div className="bg-white rounded-lg px-10 py-9 md:max-w-4xl">
        {children}
      </div>
    </section>
  );
}

export default Modal;