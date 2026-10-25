// FAQ content shared by the /pages/faq page and its FAQPage JSON-LD,
// so the schema always matches what the page shows.
export type FaqItem = { question: string; answer: string };

export type FaqIcon = 'building' | 'lock' | 'handshake' | 'users' | 'chart';

export type FaqCategory = { title: string; icon: FaqIcon; questions: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
    {
        title: "General",
        icon: 'building',
        questions: [
            {
                question: "What is Stay Unfiltered?",
                answer: "Stay Unfiltered is an online mental health platform designed to support emotional well-being in the workplace. We specialize in Employee Assistance Programs (EAPs), offering one-on-one therapy, corporate workshops, and webinars focused on building happier, more resilient teams through B2B partnerships."
            },
            {
                question: "Who do you focus on individuals or organizations?",
                answer: `We work with both — because lasting change begins at both the individual and organizational level.
                Our goal is simple: to make mental health support accessible, personal, and sustainable — for individuals and for the organizations they’re part of.`
            },
            {
                question: "Is Stay Unfiltered available across India and globally?",
                answer: "Yes. Our platform is fully remote-first, serving clients across India and globally with multilingual therapists and time-zone aligned support."
            }
        ]
    },
    {
        title: "Services & EAP Details",
        icon: 'handshake',
        questions: [
            {
                question: "What does an Employee Assistance Program (EAP) include?",
                answer: "Our EAP services offer comprehensive support to employees and their families. Key components include confidential therapy, 24/7 support, customized webinars and workshops, manager training, digital self-help tools, crisis response, and anonymized reporting."
            },
            {
                question: "What services are included under Stay Unfiltered's EAP model?",
                answer: "Our customizable EAP suite includes video or phone-based therapy, live webinars and workshops, CBT-based tools, burnout prevention programs, leadership coaching, and mental health assessments."
            },
            {
                question: "Do you offer Pay-per-Usage plans?",
                answer: "Yes, we provide Pay-per-Usage EAP options including session bundles, per-webinar pricing, optional family coverage, and access to digital tools without long-term subscriptions."
            },
            {
                question: "What kind of issues can your therapists address?",
                answer: "Our professionals support issues like stress, anxiety, burnout, depression, family challenges, trauma, grief, and career concerns."
            }
        ]
    },
    {
        title: "Corporate Solutions",
        icon: 'users',
        questions: [
            {
                question: "How do you drive engagement among employees?",
                answer: "We provide onboarding sessions, monthly campaigns, digital wellness content, and usage nudges to ensure consistent employee participation."
            },
            {
                question: "Can we customize the EAP to our needs?",
                answer: "Yes. You can customize sessions, coverage, webinar topics, delivery formats, and reporting. Everything is tailored to your organization's needs."
            },
            {
                question: "What kind of reporting do you provide to employers?",
                answer: "We provide anonymized, aggregated usage reports including session counts, popular topics, feedback, and attendance insights."
            }
        ]
    },
    {
        title: "Data Privacy & Security",
        icon: 'lock',
        questions: [
            {
                question: "Is employee confidentiality guaranteed?",
                answer: "Yes. We follow strict GDPR and DPDP standards. No identifiable data is shared. All session data is encrypted and anonymized for employer insights."
            },
            {
                question: "How is our company data protected?",
                answer: "We use enterprise-grade security measures including data encryption, secure servers, and strict access controls. All corporate data is treated with the highest confidentiality."
            }
        ]
    },
    {
        title: "Implementation & Support",
        icon: 'chart',
        questions: [
            {
                question: "How long does it take to launch Stay Unfiltered in our organization?",
                answer: "Most organizations are onboarded within 7-10 business days, including kickoff, communication rollout, and access setup."
            },
            {
                question: "What support do you provide during implementation?",
                answer: "We provide dedicated account managers, customized communication templates, manager training sessions, and ongoing support to ensure successful adoption."
            }
        ]
    }
];
