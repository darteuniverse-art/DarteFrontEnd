import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const MailIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z"
        stroke="#90A1B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z"
        stroke="#90A1B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z"
        stroke="#90A1B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z"
        stroke="#90A1B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  /* NEW SOCIAL ICONS */
  const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 2C16 4.209 17.791 6 20 6V9C18.042 9 16.23 8.361 15 7.242V15.5C15 18.538 12.538 21 9.5 21C6.462 21 4 18.538 4 15.5C4 12.462 6.462 10 9.5 10C10.042 10 10.563 10.081 11.053 10.231V13.323C10.575 13.12 10.05 13 9.5 13C8.119 13 7 14.119 7 15.5C7 16.881 8.119 18 9.5 18C10.881 18 12 16.881 12 15.5V2H16Z"
        fill="#90A1B9"
      />
    </svg>
  );

  const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 3L2 11L9 13L11 21L15 15L21 19L22 3Z"
        stroke="#90A1B9"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.7 13.3C16.4 13.2 14.9 12.4 14.6 12.3C14.3 12.2 14.1 12.2 13.9 12.5C13.7 12.8 13.2 13.3 13 13.5C12.8 13.7 12.6 13.7 12.3 13.6C12 13.5 11 13.1 10 12.2C9.2 11.5 8.6 10.6 8.4 10.3C8.2 10 8.4 9.8 8.5 9.6C8.6 9.4 8.8 9.2 8.9 9C9 8.8 9 8.7 8.9 8.5C8.8 8.3 8 6.8 7.7 6.2C7.4 5.6 7.1 5.7 6.9 5.7H6.3C6.1 5.7 5.7 5.8 5.4 6.1C5.1 6.4 4.2 7.3 4.2 9C4.2 10.7 5.5 12.3 5.7 12.5C5.9 12.7 8.3 16.4 11.9 17.8C12.8 18.1 13.5 18.3 14.1 18.4C15 18.6 15.8 18.5 16.4 18.4C17.1 18.3 18.4 17.8 18.7 16.9C19 16 19 15.2 18.9 15C18.8 14.8 18.6 14.7 18.3 14.6Z"
        fill="#90A1B9"
      />
    </svg>
  );

  const linkSections = [
    {
      title: "PRODUCTS",
      links: [
        { text: "Books", path: "/", icon: null },
        { text: "Shoes", path: "/", icon: null },
        { text: "Laptops", path: "/", icon: null },
        { text: "Gadgets", path: "/", icon: null },
        { text: "Perfumes", path: "/", icon: null },
        { text: "Clothings", path: "/", icon: null },
      ],
    },
    {
      title: "WEBSITE",
      links: [
        { text: "Home", path: "/", icon: null },
        { text: "Privacy Policy", path: "/", icon: null },
        { text: "Become Plus Member", path: "/pricing", icon: null },
        { text: "Create Your Store", path: "/create-store", icon: null },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { text: "darte.universe@gmail.com", path: "/", icon: MailIcon },
        { text: "+234-704-154-5267", path: "/", icon: PhoneIcon },
        { text: "Lagos, Nigeria", path: "/", icon: MapPinIcon },
      ],
    },
  ];

  const socialIcons = [
    {
      icon: TikTokIcon,
      link: "https://www.tiktok.com/@darte.universe?_r=1&_t=ZS-92u8r5LO0iv",
    },
    { icon: TelegramIcon, link: "https://t.me/darte_universe" },
    {
      icon: WhatsAppIcon,
      link: "https://whatsapp.com/channel/0029Vb6c9qB4tRroHm7tzv2u",
    },
  ];

  return (
    <footer className="mx-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 dark:text-slate-300 text-slate-500">
          <div>
            <Logo />
            <p className="max-w-[410px] mt-6 text-sm">
              Welcome to Darté, the ultimate student marketplace. Join other
              student in your university&apos;s marketplace. We bring you the
              best vibe that&apos;ll help boost your CGPA — all in one place.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  className="flex items-center justify-center w-10 h-10 dark:bg-slate-700 bg-slate-100 hover:scale-105 hover:border border-slate-300 transition rounded-full"
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 text-sm">
            {linkSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium dark:text-slate-400 text-slate-700 md:mb-5 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {link.icon && <link.icon />}
                      <Link
                        href={link.path}
                        className="hover:underline transition"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-sm dark:text-slate-400 text-slate-500">
          Copyright 2026 © darté All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
