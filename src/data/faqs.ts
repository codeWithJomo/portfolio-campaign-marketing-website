export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'What do I get for ₦1,000?',
    answer:
      'You get a fully personalized, single-page responsive portfolio website built with your choice of our 3 core designs (Developer, Creative, or Professional). We customize it with your name, bio, skills, projects, work experience, resume link, contact details, and chosen color palette. We then deploy it on a free, high-speed Vercel subdomain (e.g., yourname.vercel.app) with 5 rounds of revisions included.',
  },
  {
    question: 'Can I choose my preferred colors?',
    answer:
      'Yes! You can choose from our curated color pairings or submit custom primary and accent hex codes in the onboarding form. We ensure your colors maintain proper contrast and readability across mobile and desktop devices.',
  },
  {
    question: 'What does five rounds of revisions mean?',
    answer:
      'After I deliver the initial preview link of your site, you have up to 5 opportunities to request adjustments. This covers tweaking text copy, updating photos/links, swapping project descriptions, and refining colors within the agreed layout scope. Additional major redesigns or new feature requests beyond the 5 rounds would require a separate agreement.',
  },
  {
    question: 'Where will my website be hosted?',
    answer:
      'Your website is hosted on Vercel on a free, permanent subdomain (such as yourname.vercel.app). Vercel provides worldwide CDN edge distribution, automatic HTTPS/SSL security, and 99.9% uptime with zero monthly hosting fees.',
  },
  {
    question: 'Do I need to buy a domain?',
    answer:
      'No. The free Vercel subdomain is 100% free forever and requires no purchase. If you already own a custom domain (like yourname.com or yourname.dev) or choose to purchase one from a registrar like Namecheap or Porkbun, I will gladly connect and configure your custom domain to your Vercel deployment at no extra charge.',
  },
  {
    question: 'How does the money-back guarantee work?',
    answer:
      'Our guarantee is simple and transparent: If the delivered website does not match the agreed design style and specifications submitted in your onboarding form, I will work with you through your revision rounds to resolve the issue. If we are unable to resolve the mismatch after a reasonable opportunity to do so, you can request and receive a 100% refund of your ₦1,000 payment.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'Submitting the form is the initial briefing step — no payment is taken on the page. Jomo will review your submission within 24 hours and reach out to you via your preferred contact method (WhatsApp, Email, LinkedIn, or X) to confirm your details and provide payment instructions (via secure bank transfer or payment link). Once confirmed, your site is typically assembled and ready for review quickly.',
  },
  {
    question: 'Can I update my portfolio later?',
    answer:
      'Yes. Your 5 revision rounds apply during the active setup phase. If you need updates months later (such as adding new job titles or projects), you can reach back out for minor maintenance at an affordable rate, or if you prefer, I can transfer the complete repository code to your own GitHub account so you have full lifetime ownership.',
  },
];
