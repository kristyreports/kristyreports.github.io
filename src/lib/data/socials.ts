export type Social = {
  href: string;
  icon: string;
  label?: string;
};

const socialMedias: Social[] = [
  { href: 'https://www.instagram.com/kristyreports/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: 'http://Kristyreports.substack.com', icon: 'fa-solid fa-book-bookmark', label: 'Substack' },
  { href: 'mailto:kristyreports@gmail.com', icon: 'fa-regular fa-envelope', label: 'Email' },
  { href: 'https://linkedin.com/in/kristyqmoore', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
  { href: 'https://www.tiktok.com/@kristyreports/', icon: 'fa-brands fa-tiktok', label: 'TikTok' }
];

export default socialMedias;
