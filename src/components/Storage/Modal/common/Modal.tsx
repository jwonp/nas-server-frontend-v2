type ModalProps = {
  children: React.ReactNode;
};
const Modal = ({ children }: ModalProps) => {
  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-screen opacity-60 bg-slate-900 z-10"></div>
      <div className="fixed left-0 top-0 w-full h-screen z-20">
        <div className="flex">
          <div className="mx-auto w-2/5 max-lg:w-screen">
            <div className="flex w-full h-screen">
              <div
                className="my-auto w-full h-4/5 max-lg:h-screen  "
                aria-description="layout">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
