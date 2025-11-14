import { useState, useEffect } from "react";
import ProjectCard from "./components/ProjectCard.jsx";
import Logo from "./assets/Logo.PNG";

const copy = {
  en: {
    header: { cta: "Get a quote" },
    nav: {
      services: "Services",
      work: "Work",
      process: "Process",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Available for freelance projects",
      title:
        '<span class="text-white">I build <span class="text-indigo-400 font-bold">smart websites</span> and <span class="text-indigo-400 font-bold">AI automations</span> that help small businesses grow.</span>',
      subtitle:
        "From landing pages to automated workflows, I help you launch fast, look professional, and save hours every week by automating forms, leads, and follow-ups with modern tech and AI tools.",
      primaryCta: "Get a free quote",
      secondaryCta: "See my work →",
    },
    seo: {
      title: "JonasCode Smart websites & AI automations for small businesses",
      description:
        "I build fast, modern websites and AI-powered automations that help small businesses look professional and save hours every week.",
      ogImage: "https://jonascode.com/og.png", // update if you have a different path
    },

    heroAside: {
      tagline: "Fast. Reliable. Smart.",
      blurb:
        "Websites + automations for small businesses, creators, and agencies.",
    },

    processSection: {
      title: "How My Process Works",
      stepLabel: "Step",
      intro:
        "A clear, fast, and collaborative process that keeps you involved from our first chat to your live website.",
      steps: [
        {
          title: "Discovery & Strategy",
          text: "We start with a short call to define your goals, target audience, and what success looks like. You’ll get a clear roadmap before we begin.",
        },
        {
          title: "Design & Prototype",
          text: "You’ll see a clickable mockup of your future website simple, visual, and easy to review. We refine it together before writing a single line of code.",
        },
        {
          title: "Build & Automate",
          text: "I develop your website using modern tech and connect AI or no-code automations to handle forms, leads, or repetitive tasks for you.",
        },
        {
          title: "Launch & Support",
          text: "Your site goes live with analytics, SEO basics, and a quick hand-over. I stay available for post-launch tweaks or future improvements.",
        },
      ],
    },
    aboutSection: {
      title: "About Me",
      body: "I’m Younis Haitham, a certified Web & Mobile Developer based in France. I enjoy building clean, modern websites and simple tools that help small businesses work smarter, not harder. I combine development and automation so forms, leads, and repetitive tasks are handled in the background while you focus on your clients.",
    },
    contactSection: {
      title: "Let’s Work Together",
      intro: "Tell me about your project, I’ll reply within 24 hours.",
      successBanner: "Thanks! I’ll reply within 24 hours.",
      successTitle: "Message sent successfully",
      successBody:
        "Thanks for reaching out! I’ll review your message and reply within 24 hours.",
      successResetLabel: "Reset the form",
      errorFallback:
        "Something went wrong. You can also email me directly at contact@jonascode.com.",
      form: {
        nameLabel: "Your name",
        emailLabel: "Email",
        messageLabel: "What do you need help with?",
        namePlaceholder: "Jane Doe",
        emailPlaceholder: "jane@example.com",
        messagePlaceholder:
          "Tell me a bit about your project, timeline, and budget…",
        submitIdle: "Send message",
        submitLoading: "Sending…",
        successResetPrompt: "Want to send another project brief?",
      },
    },
    servicesSection: {
      title: "Services",
      intro:
        "I focus on small, practical projects that ship quickly: launch-ready websites, simple web apps, and AI-powered automations that actually save you time.",
    },
    whoIWorkWith: {
      label: "Who I work with",
      chips: [
        "Small businesses ready to look sharp online",
        "Founders automating their client workflow",
        "Agencies needing a dependable web dev partner",
      ],
    },
    workSection: {
      title: "Selected Work",
      projects: [
        {
          name: "Coffee House Website",
          tag: "Framer • Small Business",
          summary:
            "A modern café landing page built in Framer with an integrated booking module.",
          cta: "View Demo",
          image: "/projects/coffee-house.png",
          alt: "Minimal coffee house landing page mockup on a laptop with latte art",
          url: "/coffee-house",
        },
        {
          name: "Portfolio Builder",
          tag: "React • Tailwind",
          summary:
            "Generate a clean one-page portfolio from a few fields, with a live preview.",
          cta: "Try It",
          image: "/projects/portfolio-builder.png",
          alt: "Portfolio builder interface showing form fields and live preview",
          url: "/portfolio-builder",
        },
        {
          name: "AI Form Assistant",
          tag: "Automation • AI",
          summary:
            "Automates form processing using ChatGPT with Make workflows piping to your CRM.",
          cta: "View Demo",
          image: "/projects/ai-form-assistant.png",
          alt: "AI form assistant diagram connecting a web form to CRM via AI",
          url: "/ai-form-assistant",
        },
      ],
    },

    testimonialsSection: {
      title: "What People Say",
      intro:
        "Feedback and impressions from people I’ve collaborated or learned with online.",
      cards: [
        {
          quote:
            "Younis is very detail-oriented and fast. He turns ideas into working demos in a really structured way.",
          by: "Fellow developer, online community",
        },
        {
          quote:
            "Clear communication, good questions, and always focused on solving the real problem, not just writing code.",
          by: "Project collaborator",
        },
        {
          quote:
            "Delivers clean, modern results and cares about the user experience and the automation behind the scenes.",
          by: "UX-focused teammate",
        },
      ],
    },
    techToolsSection: { title: "Tech & tools I work with" },
    services: [
      {
        title: "Launch-ready websites",
        desc: "Custom, responsive sites and landing pages—mobile-first and conversion-focused.",
        icon: null,
        iconAlt: "Website launch icon",
      },
      {
        title: "AI lead handling & automation",
        desc: "Turn form messages and inbox chaos into structured, AI-tagged leads routed to your email, CRM, or Slack.",
        icon: null,
        iconAlt: "Automation and AI icon",
      },
      {
        title: "Web apps & client portals",
        desc: "Lightweight web apps, dashboards, or client portals built with React and modern APIs.",
        icon: null,
        iconAlt: "Client portal dashboard icon",
      },
      {
        title: "Integrations & tech glue",
        desc: "Connect your site to Stripe, Notion, Airtable, or Make/Zapier so everything works together.",
        icon: null,
        iconAlt: "Integration nodes icon",
      },
    ],

    footer: {
      madeBy: "Made by",
    },
  },
  fr: {
    header: { cta: "Demander un devis" },
    nav: {
      services: "Services",
      work: "Projets",
      process: "Processus",
      about: "À propos",
      contact: "Contact",
    },
    hero: {
      badge: "Disponible pour des projets freelance",
      title:
        '<span class="text-white">Je crée des <span class="text-indigo-400 font-bold">sites web intelligents</span> et des <span class="text-indigo-400 font-bold">automatisations AI</span> pour aider les petites entreprises à se développer.</span>',
      subtitle:
        "Des pages d’atterrissage aux flux de travail automatisés, je vous aide à lancer vite, à paraître professionnel et à gagner des heures chaque semaine en automatisant formulaires, leads et relances grâce aux technologies modernes et à l’IA.",
      primaryCta: "Demander un devis gratuit",
      secondaryCta: "Voir mes projets →",
    },
    seo: {
      title: "JonasCode Sites web modernes & automatisations IA pour PME",
      description:
        "Je crée des sites rapides et professionnels et des automatisations IA qui font gagner des heures chaque semaine aux petites entreprises.",
      ogImage: "https://jonascode.com/og.png",
    },

    heroAside: {
      tagline: "Rapide. Fiable. Intelligent.",
      blurb: "Sites web + automatisations pour TPE/PME, créateurs et agences.",
    },

    processSection: {
      title: "Comment se déroule mon processus",
      stepLabel: "Étape",
      intro:
        "Un processus clair, rapide et collaboratif qui vous implique du premier échange jusqu’à la mise en ligne de votre site.",
      steps: [
        {
          title: "Découverte & stratégie",
          text: "Un appel court pour définir vos objectifs, votre audience et les critères de réussite. Vous obtenez une feuille de route claire avant de commencer.",
        },
        {
          title: "Conception & prototype",
          text: "Vous voyez une maquette cliquable de votre futur site simple, visuelle et facile à commenter. Nous l’affinons ensemble avant d’écrire la moindre ligne de code.",
        },
        {
          title: "Développement & automatisation",
          text: "Je développe votre site avec des technologies modernes et j’y connecte des automatisations IA ou no-code pour gérer formulaires, leads et tâches répétitives.",
        },
        {
          title: "Lancement & support",
          text: "Mise en ligne avec analytics, bases SEO et passation rapide. Je reste disponible pour les ajustements post-lancement et les évolutions futures.",
        },
      ],
    },
    aboutSection: {
      title: "À propos de moi",
      body: "Je m’appelle Younis Haitham, développeur web & mobile certifié basé en France. J’aime créer des sites modernes, clairs et utiles qui aident les petites entreprises à travailler plus intelligemment. Je combine développement et automatisation pour que les formulaires, leads et tâches répétitives soient gérés en arrière-plan pendant que vous vous concentrez sur vos clients.",
    },
    contactSection: {
      title: "Travaillons ensemble",
      intro: "Parlez-moi de votre projet, je vous répondrai sous 24 heures.",
      successBanner:
        "Merci pour votre message, je vous répondrai sous 24 heures.",
      successTitle: "Message envoyé avec succès",
      successBody:
        "Merci pour votre message ! Je vais le lire et vous répondre sous 24 heures.",
      successResetLabel: "Envoyer un autre projet",
      errorFallback:
        "Une erreur s’est produite. Vous pouvez aussi m’écrire directement à contact@jonascode.com.",
      form: {
        nameLabel: "Votre nom",
        emailLabel: "Email",
        messageLabel: "De quoi avez-vous besoin ?",
        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@example.com",
        messagePlaceholder:
          "Parlez-moi de votre projet, de vos délais et de votre budget…",
        submitIdle: "Envoyer le message",
        submitLoading: "Envoi…",
        successResetPrompt: "Vous voulez décrire un autre projet ?",
      },
    },
    servicesSection: {
      title: "Services",
      intro:
        "Je me concentre sur des projets concrets et rapides à livrer : sites prêts à lancer, petites applications web et automatisations IA qui vous font réellement gagner du temps.",
    },
    whoIWorkWith: {
      label: "Avec qui je travaille",
      chips: [
        "Petites entreprises voulant une image pro",
        "Fondateurs qui automatisent leurs flux clients",
        "Agences cherchant un partenaire dev fiable",
      ],
    },
    workSection: {
      title: "Projets sélectionnés",
      projects: [
        {
          name: "Site Coffee House",
          tag: "Framer • Petite entreprise",
          summary:
            "Landing page de café moderne réalisée avec Framer et module de réservation intégré.",
          cta: "Voir la démo",
          image: "/projects/coffee-house.png",
          alt: "Maquette d’une landing page de café minimaliste sur un laptop avec latte art",
          url: "/coffee-house",
        },
        {
          name: "Générateur de Portfolio",
          tag: "React • Tailwind",
          summary:
            "Créez un portfolio une page propre à partir de quelques champs, avec aperçu en direct.",
          cta: "Essayer",
          image: "/projects/portfolio-builder.png",
          alt: "Interface du générateur de portfolio avec champs et aperçu en direct",
          url: "/portfolio-builder",
        },
        {
          name: "Assistant IA pour Formulaires",
          tag: "Automatisation • IA",
          summary:
            "Automatise le traitement des formulaires via ChatGPT et des scénarios Make reliés à votre CRM.",
          cta: "Voir la démo",
          image: "/projects/ai-form-assistant.png",
          alt: "Schéma d’assistant IA reliant un formulaire web à un CRM via l’IA",
          url: "/ai-form-assistant",
        },
      ],
    },

    testimonialsSection: {
      title: "Ce qu’on dit de moi",
      intro:
        "Retours et impressions de personnes avec qui j’ai collaboré ou appris en ligne.",
      cards: [
        {
          quote:
            "Younis est précis et rapide. Il transforme les idées en démos fonctionnelles avec une vraie méthode.",
          by: "Développeur, communauté en ligne",
        },
        {
          quote:
            "Communication claire, bonnes questions, toujours focalisé sur le vrai besoin, pas juste sur le code.",
          by: "Collaborateur projet",
        },
        {
          quote:
            "Des résultats modernes et propres, avec une attention à l’expérience utilisateur et à l’automatisation.",
          by: "Coéquipier orienté UX",
        },
      ],
    },
    techToolsSection: { title: "Technos & outils que j’utilise" },
    services: [
      {
        title: "Sites web prêts à lancer",
        desc: "Sites vitrines et landing pages responsives, optimisés mobile et orientés conversion.",
        icon: null,
        iconAlt: "Icône de lancement de site",
      },
      {
        title: "Traitement des leads & automatisation IA",
        desc: "Transforme formulaires et emails en leads structurés, tagués par l’IA et routés vers votre email, CRM ou Slack.",
        icon: null,
        iconAlt: "Icône d’automatisation et IA",
      },
      {
        title: "Applications web & espaces clients",
        desc: "Applications web légères, tableaux de bord ou portails clients avec React et APIs modernes.",
        icon: null,
        iconAlt: "Icône de portail client",
      },
      {
        title: "Intégrations & connecteurs",
        desc: "Connectez votre site à Stripe, Notion, Airtable, Make/Zapier pour un écosystème fluide.",
        icon: null,
        iconAlt: "Icône d’intégrations",
      },
    ],

    footer: {
      madeBy: "Réalisé par",
    },
  },
  ar: {
    header: { cta: "اطلب عرض سعر" },
    nav: {
      services: "الخدمات",
      work: "الأعمال",
      process: "طريقة العمل",
      about: "من أنا",
      contact: "تواصل",
    },
    hero: {
      badge: "متاح لمشاريع حرة",
      title:
        '<span class="text-white">أبني <span class="text-indigo-400 font-bold">مواقع ذكية</span> و<span class="text-indigo-400 font-bold">أتمتة بالذكاء الاصطناعي</span> لمساعدة الأعمال الصغيرة على النمو.</span>',
      subtitle:
        "من صفحات الهبوط إلى تدفقات العمل المؤتمتة، أساعدك على الإطلاق بسرعة وبمظهر احترافي، وتوفير ساعات كل أسبوع عبر أتمتة النماذج والعملاء المحتملين والمتابعات باستخدام التقنيات الحديثة وأدوات الذكاء الاصطناعي.",
      primaryCta: "اطلب عرض سعر مجاني",
      secondaryCta: "شاهد أعمالي →",
    },
    seo: {
      title: "JonasCode مواقع حديثة وأتمتة بالذكاء الاصطناعي للأعمال الصغيرة",
      description:
        "أبني مواقع سريعة واحترافية وأتمتة تعمل بالذكاء الاصطناعي لتوفير ساعات من العمل أسبوعياً للأعمال الصغيرة.",
      ogImage: "https://jonascode.com/og.png",
    },

    heroAside: {
      tagline: "سريع. موثوق. ذكي.",
      blurb: "مواقع وأتمتة للشركات الصغيرة والمبدعين والوكالات.",
    },

    processSection: {
      title: "كيف تتم عملية العمل",
      stepLabel: "الخطوة",
      intro:
        "عملية واضحة وسريعة وتعاونية تُبقيك مُطّلعًا منذ أول محادثة حتى إطلاق موقعك.",
      steps: [
        {
          title: "التحليل والتخطيط",
          text: "نبدأ بمكالمة قصيرة لتحديد أهدافك والجمهور المستهدف ومعايير النجاح. تحصل على خارطة طريق واضحة قبل البدء.",
        },
        {
          title: "التصميم والنموذج الأولي",
          text: "سترى نموذجًا تفاعليًا لموقعك المستقبلي بسيطًا، بصريًا، وسهل المراجعة. نُعدّله معًا قبل كتابة أي سطر كود.",
        },
        {
          title: "البرمجة والأتمتة",
          text: "أطوّر موقعك بتقنيات حديثة وأربطه بأدوات ذكاء اصطناعي أو أتمتة لاستخدامها في النماذج والزوّار والمهام المتكررة.",
        },
        {
          title: "الإطلاق والدعم",
          text: "نُطلق الموقع مع التحليلات وأساسيات تحسين الظهور وتسليم سريع. أبقى متاحًا لأي تحسينات بعد الإطلاق أو إضافات مستقبلية.",
        },
      ],
    },
    aboutSection: {
      title: "من أنا",
      body: "أنا يونس هيثم، مطوّر مواقع وتطبيقات ويب حاصل على شهادة في تطوير الويب والويب موبايل. أحب بناء مواقع عصرية وبسيطة تساعد المشاريع الصغيرة على العمل بطريقة أذكى. أدمج بين البرمجة والأتمتة حتى يتم التعامل مع النماذج والمهام المتكررة في الخلفية بينما تركز أنت على عملائك.",
    },
    contactSection: {
      title: "دعنا نعمل معًا",
      intro: "أخبرني عن مشروعك, سأعود إليك خلال 24 ساعة.",
      successBanner: "شكرًا لرسالتك، سأرد عليك خلال 24 ساعة.",
      successTitle: "تم إرسال الرسالة بنجاح",
      successBody: "شكرًا لتواصلك! سأطّلع على رسالتك وأجيبك خلال 24 ساعة.",
      successResetLabel: "إرسال مشروع آخر",
      errorFallback:
        "حدث خطأ ما. يمكنك أيضًا مراسلتي مباشرة على contact@jonascode.com.",
      form: {
        nameLabel: "اسمك",
        emailLabel: "البريد الإلكتروني",
        messageLabel: "بماذا يمكنني مساعدتك؟",
        namePlaceholder: "أحمد محمد",
        emailPlaceholder: "ahmed@example.com",
        messagePlaceholder:
          "اكتب لي تفاصيل المشروع، المدة المتوقعة، والميزانية إن أمكن…",
        submitIdle: "إرسال الرسالة",
        submitLoading: "جاري الإرسال…",
        successResetPrompt: "هل تريد إرسال وصف لمشروع آخر؟",
      },
    },
    servicesSection: {
      title: "الخدمات",
      intro:
        "أركّز على مشاريع عملية يمكن إطلاقها بسرعة: مواقع جاهزة، تطبيقات ويب بسيطة، وأتمتة بالذكاء الاصطناعي توفر عليك الوقت فعلاً.",
    },
    whoIWorkWith: {
      label: "مع من أعمل",
      chips: [
        "أعمال صغيرة تريد مظهراً احترافياً",
        "روّاد أعمال يؤتمتون سير عمل العملاء",
        "وكالات تحتاج شريك تطوير موثوقاً",
      ],
    },
    workSection: {
      title: "أعمال مختارة",
      projects: [
        {
          name: "موقع Coffee House",
          tag: "Framer • أعمال صغيرة",
          summary: "صفحة هبوط عصرية لمقهى مبنية بـ Framer مع نظام حجز مدمج.",
          cta: "شاهد الديمو",
          image: "/projects/coffee-house.png",
          alt: "نموذج صفحة هبوط لمقهى بتصميم بسيط على حاسوب محمول مع فن اللاتيه",
          url: "/coffee-house",
        },
        {
          name: "منشئ البورتفوليو",
          tag: "React • Tailwind",
          summary:
            "أنشئ صفحة تعريفية واحدة أنيقة من حقول بسيطة مع معاينة فورية.",
          cta: "جرّبه",
          image: "/projects/portfolio-builder.png",
          alt: "واجهة منشئ بورتفوليو تعرض حقول إدخال ومعاينة فورية",
          url: "/portfolio-builder",
        },
        {
          name: "مساعد النماذج بالذكاء الاصطناعي",
          tag: "الأتمتة • ذكاء اصطناعي",
          summary:
            "يؤتمت معالجة النماذج باستخدام ChatGPT وتدفقات Make مع ربط مباشر بنظام الـCRM.",
          cta: "شاهد الديمو",
          image: "/projects/ai-form-assistant.png",
          alt: "مخطط يوضح ربط نموذج ويب بـ CRM عبر الذكاء الاصطناعي",
          url: "/ai-form-assistant",
        },
      ],
    },

    testimonialsSection: {
      title: "ماذا يقولون",
      intro: "آراء وانطباعات أشخاص تعاونت معهم أو تعلّمت معهم عبر الإنترنت.",
      cards: [
        {
          quote:
            "يونس دقيق وسريع. يحوّل الأفكار إلى نماذج تعمل فعلياً وبطريقة منظمة.",
          by: "مطور مجتمع إلكتروني",
        },
        {
          quote:
            "تواصل واضح، أسئلة جيدة، ويركّز دائماً على حل المشكلة الحقيقية لا مجرد كتابة الشيفرة.",
          by: "متعاون في مشروع",
        },
        {
          quote:
            "نتائج عصرية ونظيفة واهتمام بتجربة المستخدم والأتمتة خلف الكواليس.",
          by: "زميل مهتم بتجربة المستخدم",
        },
      ],
    },
    techToolsSection: { title: "التقنيات والأدوات التي أعمل بها" },
    services: [
      {
        title: "مواقع جاهزة للإطلاق",
        desc: "مواقع وصفحات هبوط متجاوبة، مُحسّنة للجوال وتركّز على التحويل.",
        icon: null,
        iconAlt: "أيقونة إطلاق موقع",
      },
      {
        title: "إدارة العملاء والأتمتة بالذكاء الاصطناعي",
        desc: "تحويل رسائل النماذج والبريد إلى عملاء محتملين منظّمين ومصنّفين بالذكاء الاصطناعي وموجّهين إلى بريدك أو CRM.",
        icon: null,
        iconAlt: "أيقونة أتمتة وذكاء اصطناعي",
      },
      {
        title: "تطبيقات ويب ولوحات تحكم",
        desc: "تطبيقات ويب خفيفة ولوحات تحكم وبوابات عملاء بـ React وواجهات حديثة.",
        icon: null,
        iconAlt: "أيقونة بوابة عملاء",
      },
      {
        title: "الربط بين الأدوات والأنظمة",
        desc: "ربط موقعك بـ Stripe وNotion وAirtable وMake/Zapier ليعمل كل شيء بانسجام.",
        icon: null,
        iconAlt: "أيقونة تكامل الأدوات",
      },
    ],

    footer: {
      madeBy: "صُنع بواسطة",
    },
  },
};

export default function PortfolioPage() {
  const nav = [
    { id: "services" },
    { id: "work" },
    { id: "process" },
    { id: "about" },
    { id: "contact" },
  ];

  function upsertMeta(selector, attrName, content) {
    if (!content) return;
    let el =
      document.head.querySelector(selector) ||
      (() => {
        const tag = selector.startsWith("meta[property")
          ? document.createElement("meta")
          : document.createElement("meta");
        if (selector.includes("name=")) {
          const m = selector.match(/name="([^"]+)"/);
          if (m) tag.setAttribute("name", m[1]);
        }
        if (selector.includes("property=")) {
          const m = selector.match(/property="([^"]+)"/);
          if (m) tag.setAttribute("property", m[1]);
        }
        document.head.appendChild(tag);
        return tag;
      })();
    el.setAttribute(attrName, content);
  }

  function setSEO(seo, lang) {
    if (!seo) return;
    // <title>
    document.title = seo.title;

    // <meta name="description">
    upsertMeta('meta[name="description"]', "content", seo.description);

    // Open Graph
    upsertMeta('meta[property="og:title"]', "content", seo.title);
    upsertMeta('meta[property="og:description"]', "content", seo.description);
    upsertMeta('meta[property="og:type"]', "content", "website");
    upsertMeta(
      'meta[property="og:locale"]',
      "content",
      lang === "ar" ? "ar" : lang === "fr" ? "fr_FR" : "en_US"
    );
    upsertMeta('meta[property="og:image"]', "content", seo.ogImage);
    upsertMeta('meta[property="og:url"]', "content", window.location.href);

    // Twitter
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", seo.title);
    upsertMeta('meta[name="twitter:description"]', "content", seo.description);
    upsertMeta('meta[name="twitter:image"]', "content", seo.ogImage);

    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    // canonical WITHOUT ?lang= to consolidate signals
    link.setAttribute("href", `${location.origin}${location.pathname}`);
  }

  const [lang, setLang] = useState("en");
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const isRTL = lang === "ar";

  // Load initial language from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "en" || saved === "fr" || saved === "ar")) {
      setLang(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html> attributes in sync + remember choice
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);
  // Sync SEO tags with current language
  useEffect(() => {
    const seo = copy[lang]?.seo;
    setSEO(seo, lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xblpnjae", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) {
      form.reset();
      setStatus({
        state: "success",
        msg: copy[lang].contactSection.successBanner,
      });
    } else {
      setStatus({
        state: "error",
        msg: copy[lang].contactSection.errorFallback,
      });
    }
  }

  // Use localized projects so titles, tags, summaries, CTAs, and alts change with language
  const projects = copy[lang].workSection.projects;

  return (
    <>
      <main
        className="min-h-screen bg-slate-950 text-slate-100"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <header
          className="sticky top-0 z-40 backdrop-blur bg-slate-900/80 border-b border-slate-800"
          dir="ltr"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-row items-center justify-between">
            {/* Logo always on the left */}
            <a
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight text-xl"
            >
              <img
                src={Logo}
                alt="JonasCode"
                className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_0_6px_rgba(255,200,0,0.3)] transition-transform duration-300 hover:scale-105"
              />
            </a>

            {/* Right side: nav + language + CTA */}
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6 text-sm">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="hover:text-indigo-400"
                  >
                    {copy[lang].nav[n.id]}
                  </a>
                ))}
              </nav>

              {/* Language switcher (accessible) */}
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-400">
                <button
                  type="button"
                  aria-label="Switch to English"
                  aria-pressed={lang === "en"}
                  onClick={() => setLang("en")}
                  className={
                    lang === "en"
                      ? "text-indigo-400 font-semibold"
                      : "hover:text-slate-200"
                  }
                >
                  EN
                </button>

                <span className="text-slate-600">/</span>
                <button
                  type="button"
                  aria-label="Basculer en français"
                  aria-pressed={lang === "fr"}
                  onClick={() => setLang("fr")}
                  className={
                    lang === "fr"
                      ? "text-indigo-400 font-semibold"
                      : "hover:text-slate-200"
                  }
                >
                  FR
                </button>
                <span className="text-slate-600">/</span>
                <button
                  type="button"
                  aria-label="التبديل إلى العربية"
                  aria-pressed={lang === "ar"}
                  onClick={() => setLang("ar")}
                  className={
                    lang === "ar"
                      ? "text-indigo-400 font-semibold"
                      : "hover:text-slate-200"
                  }
                >
                  AR
                </button>
              </div>

              {/* CTA uses header copy */}
              <a
                href="#contact"
                className="rounded-xl border border-indigo-500 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium text-indigo-300 hover:bg-indigo-600/10 whitespace-nowrap transition-all duration-200"
                style={{ lineHeight: "1.3em", marginTop: "2px" }}
              >
                {copy[lang].header.cta}
              </a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="mx-auto max-w-7xl min-h-[90vh] flex items-center px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center w-full">
            <div className="mx-auto md:mx-0">
              <p className="inline-block border border-slate-700 bg-slate-800 text-slate-300 px-3 py-1 text-xs rounded-full">
                {copy[lang].hero.badge}
              </p>

              <h1
                className={`mt-4 text-4xl sm:text-5xl font-semibold leading-snug max-w-2xl ${
                  isRTL ? "text-right md:text-right" : "text-left md:text-left"
                }`}
                dangerouslySetInnerHTML={{ __html: copy[lang].hero.title }}
              />

              <p
                className={`mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl ${
                  isRTL ? "text-right md:text-right" : "text-left md:text-left"
                }`}
              >
                {copy[lang].hero.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="bg-indigo-600 px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-indigo-700"
                >
                  {copy[lang].hero.primaryCta}
                </a>
                <a
                  href="#work"
                  className="border border-slate-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800"
                >
                  {copy[lang].hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* RIGHT ICON */}
            <div className="flex flex-col items-center justify-center text-center mt-10 md:mt-0">
              <div className="text-6xl sm:text-7xl">⚡</div>
              <p
                className={`text-slate-400 mt-3 text-sm sm:text-base font-medium ${
                  isRTL ? "text-right" : "text-center"
                }`}
              >
                {copy[lang].heroAside.tagline}
              </p>
              <p
                className={`text-slate-500 text-xs sm:text-sm mt-1 max-w-xs leading-relaxed ${
                  isRTL ? "text-right" : "text-center"
                }`}
              >
                {copy[lang].heroAside.blurb}
              </p>
            </div>
          </div>
        </section>

        {/* WHO I WORK WITH */}
        <section className="border-y border-slate-800 bg-slate-900/40">
          <div
            className="max-w-7xl mx-auto px-4 py-4"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
              <div
                className={`flex flex-col md:flex-row items-start gap-3 w-full ${
                  isRTL ? "justify-start" : "justify-start"
                }`}
              >
                <span className="uppercase tracking-wide text-[0.7rem] text-slate-500 shrink-0">
                  {copy[lang].whoIWorkWith.label}
                </span>

                <div
                  className={`flex flex-wrap gap-2 w-full ${
                    isRTL ? "justify-start" : "justify-start"
                  }`}
                >
                  {copy[lang].whoIWorkWith.chips.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-700/70 px-3 py-1 bg-slate-900/60 whitespace-normal sm:whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className={`text-3xl font-semibold ${isRTL ? "text-right" : ""}`}>
            {copy[lang].servicesSection.title}
          </h2>
          <p
            className={`text-slate-400 mt-2 mb-8 text-sm max-w-2xl ${
              isRTL ? "text-right" : ""
            }`}
          >
            {copy[lang].servicesSection.intro}
          </p>

          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {copy[lang].services.map((s, idx) => {
              const titleId = `svc-${idx}-title`;
              return (
                <article
                  key={s.title}
                  role="article"
                  aria-labelledby={titleId}
                  className="border border-slate-800 rounded-2xl p-5 hover:bg-slate-900 transition"
                >
                  <div className="flex items-start gap-3">
                    {s.icon && (
                      <img
                        src={s.icon}
                        alt={s.iconAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-6 w-6 mt-1 shrink-0"
                      />
                    )}
                    <div>
                      <h3 id={titleId} className="font-semibold text-lg">
                        {s.title}
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm">{s.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-3xl font-semibold mb-8 ${
                isRTL ? "text-right" : ""
              }`}
            >
              {copy[lang].workSection.title}
            </h2>

            <div
              className="grid gap-6 md:grid-cols-3"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {projects.map((p) => (
                <ProjectCard key={p.name} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div
            className={`max-w-5xl mx-auto ${
              isRTL ? "text-right" : "text-center"
            }`}
          >
            <h2 className="text-3xl font-semibold mb-3">
              {copy[lang].testimonialsSection.title}
            </h2>
            <p className={`text-slate-400 mb-8 text-sm`}>
              {copy[lang].testimonialsSection.intro}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {copy[lang].testimonialsSection.cards.map((c, i) => (
                <div
                  key={i}
                  className="border border-slate-800 rounded-2xl p-6 bg-slate-950/60"
                >
                  <p className="text-slate-300 text-sm">“{c.quote}”</p>
                  <p className="text-slate-500 text-xs mt-3">{c.by}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-8">
            {copy[lang].processSection.title}
          </h2>
          <p className="text-slate-400 mb-8 text-sm max-w-2xl">
            {copy[lang].processSection.intro}
          </p>

          <div
            className="grid gap-6 md:grid-cols-4"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {copy[lang].processSection.steps.map((s, i) => (
              <div
                key={i}
                className="border border-slate-800 rounded-2xl p-5 hover:bg-slate-900 transition"
              >
                <div className="text-indigo-400 text-xs mb-1">
                  {copy[lang].processSection.stepLabel} {i + 1}
                </div>

                <div className="font-semibold">{s.title}</div>
                <p className="text-slate-400 mt-2 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH & TOOLS */}
        <section className="border-y border-slate-800 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p
              className={`text-xs uppercase tracking-wide text-slate-500 mb-3 ${
                isRTL ? "text-right" : ""
              }`}
            >
              {copy[lang].techToolsSection.title}
            </p>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-200">
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                React
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Vite
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                TailwindCSS
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Node.js
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Framer Motion
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Make (Integromat)
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Zapier
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Formspree
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                Vercel
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1 bg-slate-900/70">
                AI APIs (OpenAI, etc.)
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="bg-slate-900 border-y border-slate-800 py-16 px-4"
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2
                className={`text-3xl font-semibold mb-3 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {copy[lang].aboutSection.title}
              </h2>
              <p
                className={`text-slate-400 leading-relaxed ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {copy[lang].aboutSection.body}
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Languages</div>
                <p className="text-slate-400 text-sm mt-1">
                  English, French, Arabic
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Tech Stack</div>
                <p className="text-slate-400 text-sm mt-1">
                  React, TailwindCSS, Node.js, Framer Motion, Make (Integromat),
                  AI APIs
                </p>
              </div>

              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Focus</div>
                <p className="text-slate-400 text-sm mt-1">
                  Web design & automation for small businesses, creators, and
                  startups who need results fast.
                </p>
              </div>
              <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950">
                <div className="font-semibold">Beyond Code</div>
                <p className="text-slate-400 text-sm mt-1">
                  Outside of development, I enjoy exploring new AI tools,
                  automating everyday workflows, and sharing knowledge with
                  other tech enthusiasts. I’m always looking for smarter,
                  simpler ways to solve problems both in code and in life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-16">
          <h2
            className={`text-3xl font-semibold mb-3 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {copy[lang].contactSection.title}
          </h2>

          <p
            className={`text-slate-400 mb-8 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {copy[lang].contactSection.intro}
          </p>

          {status.msg && (
            <div
              role="status"
              aria-live="polite"
              className={`mb-6 rounded-lg px-3 py-2 text-sm ${
                status.state === "success"
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30"
                  : "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30"
              }`}
            >
              {status.msg}
            </div>
          )}

          {status.state === "success" ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-6">
              <div className="text-sm font-medium text-emerald-300 mb-1">
                {copy[lang].contactSection.successTitle}
              </div>
              <p className="text-sm text-emerald-100 mb-3">
                {copy[lang].contactSection.successBody}
              </p>
              <p className="text-xs text-emerald-200/80">
                {copy[lang].contactSection.form.successResetPrompt}{" "}
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle", msg: "" })}
                  className="underline underline-offset-2 hover:text-emerald-100"
                >
                  {copy[lang].contactSection.successResetLabel}
                </button>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  {copy[lang].contactSection.form.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={copy[lang].contactSection.form.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  {copy[lang].contactSection.form.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={copy[lang].contactSection.form.emailPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  {copy[lang].contactSection.form.messageLabel}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={
                    copy[lang].contactSection.form.messagePlaceholder
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl font-medium text-sm"
              >
                {status.state === "loading"
                  ? copy[lang].contactSection.form.submitLoading
                  : copy[lang].contactSection.form.submitIdle}
              </button>

              {status.state === "error" && (
                <p className="text-xs text-rose-300 mt-1">
                  {status.msg || copy[lang].contactSection.errorFallback}
                </p>
              )}
            </form>
          )}
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 py-6 text-slate-500 text-sm">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span>© {new Date().getFullYear()} Younis Haitham.</span>{" "}
              <span className="text-slate-600">
                Made by{" "}
                <span className="text-slate-300 font-medium">JonasCode ⚡</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <a
                href="https://github.com/youniscode"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/younis-haitham-9581b013a/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href="mailto:contact@jonascode.com"
                className="hover:text-slate-300 hover:underline underline-offset-4"
              >
                contact@jonascode.com
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
