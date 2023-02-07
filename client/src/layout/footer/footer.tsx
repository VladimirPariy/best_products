import React, { FC } from "react";

import Facebook from "assets/icon/footer/facebook";
import Instagram from "assets/icon/footer/instagram";
import Youtube from "assets/icon/footer/youtube";

import styles from "layout/footer/footer.module.scss";
import PageLink from "layout/footer/components/page-link";
import FooterLogo from "layout/footer/components/footer-logo";
import Social from "layout/footer/components/social";

interface ILink {
  path: string;
  name: string;
}

export interface IFooterLink {
  title: string;
  links: ILink[];
}

const footerLinks: IFooterLink[] = [
  {
    title: "Our services",
    links: [
      { path: "/", name: "Product reviews" },
      { path: "/", name: "Reviews of stores" },
    ],
  },
  {
    title: "To users",
    links: [
      { path: "/", name: "FAQ for users" },
      { path: "/", name: "About the project" },
    ],
  },
  {
    title: "Feedback",
    links: [
      { path: "/", name: "For users" },
      { path: "/", name: "For online stores" },
    ],
  },
];

const socialLink = [
  {
    link: "https://www.facebook.com/",
    icon: <Facebook />,
    className: styles.facebook,
  },
  {
    link: "https://www.instagram.com/",
    icon: <Instagram />,
    className: styles.instagram,
  },
  {
    link: "https://www.youtube.com/",
    icon: <Youtube />,
    className: styles.youtube,
  },
];

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      {footerLinks.map((item) => (
        <PageLink title={item.title} links={item.links} key={item.title} />
      ))}

      <div className={styles.selectContainer}>
        <div className={styles.title}>Social media</div>
        <div className={styles.socialLink}>
          {socialLink.map((item) => (
            <Social
              className={item.className}
              icon={item.icon}
              href={item.link}
              key={item.link}
            />
          ))}
        </div>
      </div>
      <FooterLogo />
    </footer>
  );
};

export default Footer;
