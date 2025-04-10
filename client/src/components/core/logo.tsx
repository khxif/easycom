import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  showText?: boolean;
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <Image
        src="/logo.png"
        alt="Logo"
        width={80}
        height={40}
        className="dark:invert object-cover size-8"
      />
      {showText ? <h2 className="font-medium text-lg hidden md:flex">Easycom</h2> : null}
    </Link>
  );
}
