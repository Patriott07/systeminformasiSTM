import Side from "../components/Side";

const AddBlog = () => {
  return (
    <div className="flex justify-between">
      <Side />
      <div
        class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{
          "--radio-dot-svg": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(17,20,24)' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`,
          fontFamily: `"Newsreader", "Noto Sans", sans-serif`,
        }}
      >
        <div class=" flex h-full grow flex-col bg-gray-100">
          <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#111418] px-10 py-3">
            <h1 className="ml-4 text-2xl font-bold px-3">Add Blog</h1>
            <div class="flex flex-1 justify-end gap-8">
              <div class="flex gap-2">
                <button class="bg-red-600 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <a href="data_blog" class="truncate">
                    Cancel
                  </a>
                </button>
              </div>
            </div>
          </header>
          <div class="px-40 flex flex-1 justify-center py-5">
            <div class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label class="flex flex-col min-w-40 flex-1">
                  <p class="text-[#111418] text-base font-medium leading-normal pb-2">
                    Title
                  </p>
                  <input
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-14 placeholder:text-[#637588] p-4 text-base font-normal leading-normal"
                    placeholder="Enter title here"
                  />
                </label>
              </div>
              <h3 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Contens
              </h3>
              <div class="flex items-center px-4 py-3 gap-3 @container h-full max-h-[520px]">
                <label class="flex flex-col min-w-40 h-full flex-1">
                  <div class="flex w-full flex-1 rounded-xl flex-col">
                    <div class="flex flex-1 flex-col">
                      <textarea
                        placeholder="Start writing your article here..."
                        class="form-input flex w-full min-w-0 flex-1 resize-none rounded-xl border bg-white focus:border-[#dce0e5] min-h-36 placeholder:text-[#bbc4ce] p-[15px] rounded text-base font-normal pt-4 pb-0"
                      ></textarea>
                    </div>
                  </div>
                </label>
              </div>
              <h3 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Cover photo
              </h3>
              <div class="flex px-4 py-3 justify-start">
                <input type="file" class="flex" />
              </div>
              <h3 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Tags
              </h3>
              <div class="flex gap-3 p-3 flex-wrap pr-4">
                <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
                  <p class="text-[#111418] text-sm font-medium leading-normal">
                    Metaverse
                  </p>
                </div>
                <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
                  <p class="text-[#111418] text-sm font-medium leading-normal">
                    NFT
                  </p>
                </div>
                <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pl-4 pr-4">
                  <p class="text-[#111418] text-sm font-medium leading-normal">
                    Virtual Reality
                  </p>
                </div>
              </div>
              <h3 class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Date
              </h3>
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label class="flex flex-col min-w-40 flex-1">
                  <input
                    type="date"
                    placeholder="bloggr.com/"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                    value=""
                  />
                </label>
              </div>
              <div class="flex px-4 py-3">
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span class="truncate">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
