import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useCallback, useRef } from 'react';
import { Button, FileTrigger, Text } from 'react-aria-components';
import Cropper from 'react-easy-crop';
import { twJoin } from 'tailwind-merge';
import Profile from '~/assets/images/user-profile.png';
import { postUploadAvatar } from '~/service/post-upload-avatar';

type UploadImageModalProps = {
  currentImageUrl: string;
  OnCloseModal: () => void;
  title: string;
  imageSize: { w: number; h: number };
  onUpload: (file: File) => void;
  isPending: boolean;
};

function getCroppedImg(imageSrc: string, crop: any): Promise<Blob> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg');
    };
  });
}

export default function UploadImageModal({
  currentImageUrl,
  OnCloseModal,
  title = 'آپلود عکس',
  imageSize = { w: 100, h: 100 },
  onUpload,
  isPending,
}: UploadImageModalProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedBlob, setCroppedBlob] = useState<null | Blob>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_ERROR_MESSAGE = 'متأسفانه، یک خطای غیرمنتظره رخ داده است. لطفا دوباره تلاش کنید.';

  const handleFileSelect = (files: FileList | null) => {
    // onSelect passes FileList
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setCroppedPreview(null);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
      setCroppedPreview(null);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const previewUrl = URL.createObjectURL(blob);
    setCroppedPreview(previewUrl);
    setCroppedBlob(blob);
  };

  const handleUpload = () => {
    if (!croppedBlob) return;
    const file = new File([croppedBlob], 'avatar.jpg', { type: 'image/jpeg' });
    onUpload(file);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base relative m-4 flex w-full max-w-sm flex-col items-center rounded-xl p-6 shadow-lg">
        <button className="text-red absolute top-2 right-2 text-xl" onClick={OnCloseModal} aria-label="بستن">
          ×
        </button>
        <h3 className="mb-4 text-lg font-bold">{title}</h3>
        {!imageSrc && (
          <div className="flex flex-col gap-2">
            <Image
              width={imageSize?.w}
              height={imageSize?.h}
              src={currentImageUrl?.trim() === '' ? Profile : currentImageUrl || Profile}
              alt="User Profile"
              className="border-lavender h-24 w-24 rounded-2xl border-4"
            />
            <FileTrigger onSelect={handleFileSelect}>
              {/* New: Wraps Button, uses onSelect instead of onChange */}
              <Button className="bg-blue text-crust block w-full cursor-pointer rounded px-2 py-2 text-center">
                انتخاب فایل
              </Button>
            </FileTrigger>
          </div>
        )}
        {imageSrc && !croppedPreview && (
          <div className="relative mb-4 h-80 w-80 bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        {croppedPreview && (
          <img
            src={croppedPreview}
            alt="پیش‌نمایش کراپ شده"
            className="border-lavender mb-4 h-24 w-24 rounded-2xl border-2 object-cover"
          />
        )}
        <div className="flex gap-2">
          {imageSrc && !croppedPreview && (
            <Button className="bg-blue text-crust rounded px-4 py-2" onClick={handleCrop}>
              کراپ
            </Button>
          )}
          {croppedPreview && (
            <div className="flex flex-col">
              <Button
                isDisabled={isPending}
                className={twJoin('bg-blue text-crust m-auto w-fit rounded px-4 py-2', isPending && 'opacity-10')}
                onClick={handleUpload}
              >
                {isPending ? 'در حال آپلود...' : 'آپلود'}
              </Button>{' '}
              <Text slot="description" className={twJoin('text-red text-label-xs block', error && 'mt-2')}>
                {error}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
