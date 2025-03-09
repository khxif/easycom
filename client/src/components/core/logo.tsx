import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-1">
      <Image
        src="/logo.png"
        alt="Logo"
        width={80}
        height={40}
        className="dark:invert object-cover"
      />
      <h2>Easycom</h2>
    </Link>
  );
}
