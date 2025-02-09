import MoonLoader from 'react-spinners/MoonLoader';

export function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <MoonLoader size={25} color='#fff' />
    </div>
  );
}
