import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="bg-gray-900 flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/logo2.png"
            width={50}
            className="rounded-full"
            height={50}
            alt="logo"
          />
        </Link>
        <div>ICBS Consulting</div>
      </div>
    </header>    
  )
}

export default Header