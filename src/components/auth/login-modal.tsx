import { useRouter } from 'next/navigation';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null; // don't render if closed

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <Modal isDismissable className="bg-base w-96 rounded-2xl p-6 shadow-lg">
        <Dialog>
          <Heading slot="title" className="mb-2 text-xl font-semibold">
            ورود به حساب کاربری
          </Heading>
          <p className="mb-4 text-sm font-normal text-white">برای ادامه باید وارد حساب خودت بشی.</p>
          <div className="flex items-center justify-end gap-x-3">
            <button className="text-subtext-1 rounded-lg border bg-transparent px-4 py-2" onClick={onClose}>
              بیخیال
            </button>

            <button
              className="bg-crust rounded-lg px-4 py-3 text-white"
              onClick={() => {
                router.push('/login');
                onClose();
              }}
            >
              برو به صفحه ورود
            </button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
