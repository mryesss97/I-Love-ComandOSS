import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 h-screen bg-gray-100 dark:bg-gray-900">
      check out the
      <button>
        record
      </button>
    </div>
  );
}
