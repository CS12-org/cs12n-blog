function SavedPost() {
  return (
    <section className="flex gap-x-5 w-full items-start">
      <main className="flex flex-col gap-2.5 w-full text-subtext-1 ">
        <div className=" bg-mantle flex items-center justify-between rtl text-right rounded-[10px]  w-full h-auto">
          <span className="font-Vazirmatn p-[10px] text-subtext-0 text-xs">
            در اینجا پست های ذخیره شده شما نمایش داده میشود. شما میتوانید تا سقف
            ۱۵ پست را ذخیره کنید تا بعدا مطالعه کنید. هر پست به مدت ۱۰ روز در
            لیست ذخیره های شما باقی می ماند. و پس از روز ۱۰ ام حذف میشود چرا که
            اگر میخواستید مطالعه کنید طی این ۱۰ روز مطالعه میکردید.
          </span>

          <button className="bg-crust w-[23px] h-[23px] flex items-center justify-center rounded hover:bg-mantle transition ml-[10px] mb-[25px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-red-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <header className="flex justify-between items-center">
          <h1 className="font-Vazirmatn text-xs mt-2 mb-1">( ۳ از ۱۵ )</h1>
        </header>
        <div className="flex items-center justify-between bg-crust p-4 rounded-[10px] w-full h-[59px]">

          <div className="text-sm text-right text-white">
            عنوان پستی که ذخیره شده
          </div>
          <div className="flex items-center gap-3">
            {/* Timer Icon (قبل) */}
            <div className="bg-gray-800 p-2 rounded-full">
              <div className="w-6 h-6 relative text-indigo-300">
                <svg
                  className="absolute inset-0 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="absolute text-xs inset-0 flex items-center justify-center font-bold">
                  10
                </span>
              </div>
            </div>
            {/* Bookmark Icon (بعد) */}
            <div className="bg-gray-800 p-2 rounded">
              <svg
                className="w-5 h-5 text-indigo-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4a2 2 0 0 0-2 2v14l8-3.5L20 20V6a2 2 0 0 0-2-2H6z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-crust p-4  rounded-[10px] w-full h-[59px]">
          <div className="text-sm text-right text-white">
            عنوان پستی که ذخیره شده
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-full">
              <div className="w-6 h-6 relative text-indigo-300">
                <svg
                  className="absolute inset-0 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="absolute text-xs inset-0 flex items-center justify-center font-bold">
                  10
                </span>
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <svg
                className="w-5 h-5 text-indigo-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4a2 2 0 0 0-2 2v14l8-3.5L20 20V6a2 2 0 0 0-2-2H6z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-crust p-4  rounded-[10px] w-full h-[59px]">
          <div className="text-sm text-right text-white">
            عنوان پستی که ذخیره شده
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-full">
              <div className="w-6 h-6 relative text-indigo-300">
                <svg
                  className="absolute inset-0 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="absolute text-xs inset-0 flex items-center justify-center font-bold">
                  10
                </span>
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <svg
                className="w-5 h-5 text-indigo-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4a2 2 0 0 0-2 2v14l8-3.5L20 20V6a2 2 0 0 0-2-2H6z" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default SavedPost;
