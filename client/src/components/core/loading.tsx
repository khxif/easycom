import { InfinitySpin } from 'react-loader-spinner';

export function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
}
