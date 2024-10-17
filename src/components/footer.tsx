import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <Link href="/about-us">
            <span className="hover:underline mx-4">About Us</span>
          </Link>
          <Link href="/privacy-policy">
            <span className="hover:underline mx-4">Privacy Policy</span>
          </Link>
          <Link href="/terms-of-service">
            <span className="hover:underline mx-4">Terms of Service</span>
          </Link>
          <Link href="/contact-us">
            <span className="hover:underline mx-4">Contact Us</span>
          </Link>
          <Link href="/faq">
            <span className="hover:underline mx-4">FAQ</span>
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Freedom. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
