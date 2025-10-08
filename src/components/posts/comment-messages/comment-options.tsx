// 'use client';

// import { MenuTrigger, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components';
// import ThreeDotts from '@/assets/images/dots-horizontal.svg';
// import { useState } from 'react';

// type CommentOptionsProps = {
//   title: string;
//   onDelete?: () => void;
// };

// export function CommentOptions({ onDelete, title }: CommentOptionsProps) {
//   const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

//   return (
//     <>
//       <MenuTrigger>
//         <Button className="ms-auto rounded-md transition" aria-label="More options">
//           <ThreeDotts className="ms-auto" />
//         </Button>

//         <Popover className="z-50 rounded-lg border border-[#333] bg-[#1a1b2e] p-2 shadow-lg">
//           <ListBox className={'min-w-32 rounded-2xl bg-[#101122] px-6 py-3'}>
//             <ListBoxItem className="cursor-pointer text-end" onAction={() => setConfirmOpen(true)}>
//               {title}
//             </ListBoxItem>
//           </ListBox>
//         </Popover>
//       </MenuTrigger>

//       {confirmOpen && (
//         <Popover
//           isOpen={confirmOpen}
//           onOpenChange={setConfirmOpen}
//           className="absolute top-full right-0 z-[60] mt-2 w-[220px] rounded-lg border border-[#333] bg-[#1a1b2e] p-4 shadow-xl"
//         >
//           <p className="mb-3 text-center text-sm text-white">مطمئنی می‌خوای حذف کنی؟</p>
//           <div className="flex justify-between gap-2">
//             <Button
//               className="w-1/2 rounded-md bg-red-500 px-3 py-1 text-sm font-bold text-white hover:bg-red-600"
//               onPress={() => {
//                 onDelete?.();
//                 setConfirmOpen(false);
//               }}
//             >
//               بله
//             </Button>
//             <Button
//               className="w-1/2 rounded-md bg-gray-700 px-3 py-1 text-sm font-bold text-white hover:bg-gray-600"
//               onPress={() => setConfirmOpen(false)}
//             >
//               خیر
//             </Button>
//           </div>
//         </Popover>
//       )}
//     </>
//   );
// }

'use client';

import { MenuTrigger, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import ThreeDotts from '@/assets/images/dots-horizontal.svg';
import { useState } from 'react';

type CommentOptionsProps = {
  title: string;
  onDelete?: () => void;
};

export function CommentOptions({ onDelete, title }: CommentOptionsProps) {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  return (
    <>
      <MenuTrigger>
        <Button className="ms-auto rounded-md transition" aria-label="More options">
          <ThreeDotts className="ms-auto" />
        </Button>

        <Popover className="z-50 rounded-lg border border-[#333] bg-[#1a1b2e] p-2 shadow-lg">
          <ListBox className="min-w-32 rounded-2xl bg-[#101122] px-6 py-3">
            <ListBoxItem className="cursor-pointer text-end" onAction={() => setConfirmOpen(true)}>
              {title}
            </ListBoxItem>
          </ListBox>
        </Popover>
      </MenuTrigger>

      <Popover
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        className="absolute top-full right-0 z-[60] mt-2 w-[220px] rounded-lg border border-[#333] bg-[#1a1b2e] p-4 shadow-xl"
      >
        <p className="mb-3 text-center text-sm text-white">مطمئنی می‌خوای حذف کنی؟</p>
        <div className="flex justify-between gap-2">
          <Button
            className="w-1/2 rounded-md bg-red-500 px-3 py-1 text-sm font-bold text-white hover:bg-red-600"
            onPress={() => {
              onDelete?.();
              setConfirmOpen(false);
            }}
          >
            بله
          </Button>
          <Button
            className="w-1/2 rounded-md bg-gray-700 px-3 py-1 text-sm font-bold text-white hover:bg-gray-600"
            onPress={() => setConfirmOpen(false)}
          >
            خیر
          </Button>
        </div>
      </Popover>
    </>
  );
}
