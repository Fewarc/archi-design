import { useMediaQuery } from "@/utils/hooks";
import { cn } from "@/utils/styleUtils";
import { ReactNode } from "react";
import Button from "./Button";
import { ArrowLeft, X } from "lucide-react";
import Modal from "./Modal";
import { ModalProps } from "@/utils/types";

interface ActionModalProps extends ModalProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  children,
  open,
  onClose,
  title,
  subtitle,
  className,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen w-screen translate-x-full bg-white px-4 pb-6 pt-16 transition-transform duration-300",
        {
          "translate-x-0 transform": open,
        },
        className,
      )}
    >
      <section className="relative mb-10 flex items-center justify-center">
        <Button
          variant="icon"
          onClick={() => onClose()}
          className="absolute left-0"
        >
          <ArrowLeft />
        </Button>
        <div className="w-full max-w-[85%] text-center">
          <h2 className="w-full text-center text-[24px] font-bold leading-[24px]">
            {title}
          </h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
      {children}
    </div>
  ) : (
    <Modal open={open}>
      <section className="relative mb-10 flex min-w-[644px]">
        <Button
          variant="icon"
          onClick={() => onClose()}
          className="absolute right-0"
        >
          <X />
        </Button>
        <div>
          <h2 className="mb-2 w-full text-left text-[24px] font-bold leading-[24px]">
            {title}
          </h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
      {children}
    </Modal>
  );
};

export default ActionModal;
