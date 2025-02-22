import { CarIcon, AddIcon } from '../ReusableComponents/Icon';
import Button from '../ReusableComponents/Button';
import Link from 'next/link';

function CreateAd() {


  return (
    <div>

      <div className="flex flex-col flex-grow items-center justify-center gap-[16px] bg-white dark:bg-[#1e1e1e] grid-flow-row">
        <div className="flex flex-col items-center gap-[12px] justify-center">
          <CarIcon className="text-dark dark:text-white w-[60px] h-[45px]" />
          <div className="flex flex-col items-center gap-[2px]">
            <h2 className="text-base font-bold">No ads Created yet.</h2>
            <span className="text-[#686666] text-center">
              It seems like you haven&apos;t set up any advertisements.
            </span>
          </div>
        </div>


        <Link href="/create-ad">
          <Button className="bg-[#4F8AFF] hover:bg-[#367ace] w-[200px] h-[44px] text-white rounded-[23px] flex items-center justify-center gap-2 transition duration-300 ease-in-out">
            Create Ad <AddIcon className="w-6 h-6" />
          </Button>
        </Link>

      </div>

    </div>
  );
}

export default CreateAd;
