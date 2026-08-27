import { FormEvent, useEffect, useRef, useState } from 'react';
import { Activity, AlertCircle, ArrowRight, ArrowUpRight, BarChart3, BadgeCheck, BrainCircuit, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, ClipboardCheck, FileText, FlaskConical, Gauge, Globe2, Headphones, Layers3, LineChart, Mail, MapPin, Megaphone, Menu, MousePointerClick, PenTool, Phone, PieChart, Search, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Target, TrendingUp, Users, WalletCards, X, Youtube, Zap, } from 'lucide-react';
import Swal from 'sweetalert2';
import logo from '@/assets/images/ab_Logo.png'
import footerlogo from '@/assets/images/ab_Logo_w.png'


const phone = '+91 98118 95677';
const phoneHref = phone.replace(/ /g, '');
const whatsappLink = "https://wa.link/iio16y";
const whatsappIcon = <svg width="24px" height="24px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"></path> <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"></path> <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse"> <stop stop-color="#5BD066"></stop> <stop offset="1" stop-color="#27B43E"></stop> </linearGradient> </defs> </g></svg>;
const email = 'info@absoluteranking.com';

// Backend endpoint that handles the contact form submission (see public/contact.php).
// Configurable via VITE_CONTACT_API_URL (see .env.example) so staging/production can
// point at different URLs without touching code. Falls back to where contact.php will
// actually live once deployed: alongside this page's build output on the live domain.
const CONTACT_API_URL = (import.meta.env.VITE_CONTACT_API_URL as string | undefined) || 'https://absoluteranking.com/ppc/services/google-ads-management/contact.php';

type LeadFormValues = {
    name: string;
    email: string;
    phone: string;
    website: string;
    budget: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts +, spaces, dashes, parentheses; digit-count check below enforces real length.
const PHONE_CHARS_PATTERN = /^\+?[\d\s\-().]{7,20}$/;
// Loose website check: optional protocol, a domain with at least one dot.
const WEBSITE_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}([/\w.\-?=&#%]*)?$/;

function validateLead(values: LeadFormValues): LeadFormErrors {
    const errors: LeadFormErrors = {};

    if (!values.name.trim()) {
        errors.name = 'Please enter your name.';
    } else if (values.name.trim().length < 2) {
        errors.name = 'Name looks too short.';
    }

    if (!values.email.trim()) {
        errors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = 'Please enter a valid email address.';
    }

    const digitCount = (values.phone.match(/\d/g) || []).length;
    if (!values.phone.trim()) {
        errors.phone = 'Please enter your phone number.';
    } else if (!PHONE_CHARS_PATTERN.test(values.phone.trim()) || digitCount < 7 || digitCount > 15) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (values.website.trim() && !WEBSITE_PATTERN.test(values.website.trim())) {
        errors.website = 'Please enter a valid website (e.g. yoursite.com).';
    }

    return errors;
}

const benefits = [
    { icon: Zap, title: 'Instant visibility', text: 'Show up at the exact moment high-intent customers search for what you offer.' },
    { icon: Target, title: 'High-intent leads', text: 'Reach people already looking for a solution, not passive browsers.' },
    { icon: BarChart3, title: 'Measurable results', text: 'Track every click, call, enquiry and conversion with total clarity.' },
    { icon: SlidersHorizontal, title: 'Flexible budget control', text: 'Start with a sensible budget and scale the campaigns that earn more.' },
];

const services = [
    { number: '01', icon: Search, title: 'Keyword research & optimization', text: 'Uncover high-intent search terms and build a keyword strategy that cuts wasted spend.' },
    { number: '02', icon: Users, title: 'Audience & location targeting', text: 'Reach the right people by location, intent, device, demographics and behaviour.' },
    { number: '03', icon: BrainCircuit, title: 'Competitor & industry analysis', text: 'Find gaps in your market and opportunities to make your ads more competitive.' },
    { number: '04', icon: PenTool, title: 'High-converting ad copy', text: 'Write relevant, persuasive messaging that earns attention and quality clicks.' },
    { number: '05', icon: FlaskConical, title: 'Ad testing & optimization', text: 'Keep testing headlines, assets and landing pages to improve performance over time.' },
    { number: '06', icon: ClipboardCheck, title: 'Conversion tracking', text: 'Measure calls, forms, purchases and every action that matters to your business.' },
    { number: '07', icon: WalletCards, title: 'Bid & budget management', text: 'Put every rupee to work with smarter bidding and disciplined budget control.' },
    { number: '08', icon: FileText, title: 'Performance reporting', text: 'Get clear monthly reporting with the insight to make confident next moves.' },
];

const campaigns = [
    { icon: Search, title: 'Google Search Ads', text: 'Own the moment of intent.' },
    { icon: Layers3, title: 'Google Display Ads', text: 'Stay visible across the web.' },
    { icon: ShoppingBag, title: 'Google Shopping', text: 'Turn product searches into sales.' },
    { icon: Gauge, title: 'Performance Max', text: 'Reach customers across Google.' },
    { icon: RefreshCwIcon, title: 'Remarketing', text: 'Bring interested visitors back.' },
    { icon: Youtube, title: 'YouTube Advertising', text: 'Create demand with video.' },
];

const faqs = [
    ['What is Google Ads management?', 'Google Ads management is the ongoing strategy, setup, optimization and reporting that helps your campaigns generate more qualified enquiries from your budget.'],
    ['How does PPC advertising work?', 'You bid to appear for relevant searches. You pay when someone clicks, while our team works to improve relevance, conversion rates and return on spend.'],
    ['How long does it take to see results?', 'Your ads can start generating traffic quickly. We use the first weeks to gather data, then refine targeting and creative around what is converting.'],
    ['How much should I spend on Google Ads?', 'The right budget depends on your market, goals and competition. We will recommend a practical starting point after reviewing your business.'],
    ['Do you provide conversion tracking?', 'Yes. We set up tracking for the actions that matter, including form submissions, calls and other high-value enquiries.'],
    ['Will I have access to my Google Ads account?', 'Yes. Your account and data remain transparent and accessible to you throughout the engagement.'],
    ['How do I get started?', 'Share a few details through the form or call us directly. We will review your goals and come back with a tailored PPC plan.'],
];

function RefreshCwIcon(props: { size?: number; strokeWidth?: number }) {
    return <Activity {...props} />;
}

function Logo() {
    return (
        <a href="https://absoluteranking.com/" className="logo" aria-label="Absolute Ranking home">
            <img src={logo} alt="absoluteranking-logo" />
        </a>
    );
}

function Logo2() {
    return (
        <a href="https://absoluteranking.com/" className="logo" aria-label="Absolute Ranking home">
            <img src={footerlogo} alt="absoluteranking-logo" />
        </a>
    );
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    const duration = 1500;
                    const start = performance.now();

                    const tick = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
                        setCount(Math.round(eased * value));
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
            {count.toLocaleString('en-IN')}
            {suffix}
        </span>
    );
}




const LEAD_FORM_INITIAL_VALUES: LeadFormValues = { name: '', email: '', phone: '', website: '', budget: '' };

function LeadForm({ compact = false }: { compact?: boolean }) {
    const [values, setValues] = useState<LeadFormValues>(LEAD_FORM_INITIAL_VALUES);
    const [errors, setErrors] = useState<LeadFormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function updateField<K extends keyof LeadFormValues>(field: K, value: LeadFormValues[K]) {
        setValues((prev) => ({ ...prev, [field]: value }));
        // Clear a field's error as soon as the user edits it again.
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Guard against double submits (double-click, slow network + repeat tap, etc).
        if (submitting) return;

        const validationErrors = validateLead(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', values.name.trim());
        formData.append('email', values.email.trim());
        formData.append('phone', values.phone.trim());
        formData.append('website', values.website.trim());
        formData.append('budget', values.budget.trim());

        try {
            const response = await fetch(CONTACT_API_URL, {
                method: 'POST',
                body: formData,
            });

            let data: { success?: boolean; error?: string } = {};
            try {
                data = await response.json();
            } catch {
                // Non-JSON response (e.g. a raw PHP error/HTML page) - handled as a failure below.
            }

            if (response.ok && data.success) {
                setSubmitted(true);
                setValues(LEAD_FORM_INITIAL_VALUES);
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you!',
                    text: 'Your PPC consultation request has been sent. We\'ll be in touch soon.',
                    confirmButtonColor: '#000f33',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something went wrong sending your enquiry. Please try again or call us directly.',
                    confirmButtonColor: '#000f33',
                });
            }
        } catch {
            // Network failure, CORS issue, server unreachable, etc.
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'We couldn\'t reach our server. Please check your connection and try again, or call us directly.',
                confirmButtonColor: '#000f33',
            });
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <div className={`form-success ${compact ? 'form-success-compact' : ''}`}>
                <CheckCircle2 size={34} />
                <h3>Thanks, we&apos;ll be in touch.</h3>
                <p>Your PPC consultation request is on its way to our team.</p>
                <button className="text-button" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={15} /></button>
            </div>
        );
    }

    return (
        <form className={`lead-form ${compact ? 'compact-form' : ''}`} onSubmit={handleSubmit} noValidate>
            {!compact && <div className="form-heading"><span className="eyebrow">START A CONVERSATION</span><h3>Let&apos;s grow your pipeline.</h3><p>Tell us a little about your goals. We&apos;ll show you where your next wins are.</p></div>}
            <div className="form-grid">
                <label className={errors.name ? 'has-error' : ''}>
                    <span>Name</span>
                    <input
                        name="name"
                        placeholder="Your name"
                        value={values.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'lead-error-name' : undefined}
                    />
                    {errors.name && <span id="lead-error-name" className="field-error"><AlertCircle size={12} /> {errors.name}</span>}
                </label>
                <label className={errors.email ? 'has-error' : ''}>
                    <span>Business email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'lead-error-email' : undefined}
                    />
                    {errors.email && <span id="lead-error-email" className="field-error"><AlertCircle size={12} /> {errors.email}</span>}
                </label>
                <label className={errors.phone ? 'has-error' : ''}>
                    <span>Phone number</span>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="+91 00000 00000"
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'lead-error-phone' : undefined}
                    />
                    {errors.phone && <span id="lead-error-phone" className="field-error"><AlertCircle size={12} /> {errors.phone}</span>}
                </label>
                <label className={errors.website ? 'has-error' : ''}>
                    <span>Website URL</span>
                    <input
                        name="website"
                        placeholder="yourwebsite.com"
                        value={values.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        aria-invalid={!!errors.website}
                        aria-describedby={errors.website ? 'lead-error-website' : undefined}
                    />
                    {errors.website && <span id="lead-error-website" className="field-error"><AlertCircle size={12} /> {errors.website}</span>}
                </label>
                <label className="full-field">
                    <span>Monthly ad budget</span>
                    <select name="budget" value={values.budget} onChange={(e) => updateField('budget', e.target.value)}>
                        <option value="" disabled>Select a range</option>
                        <option>Under ₹50,000</option>
                        <option>₹50,000 – ₹1,00,000</option>
                        <option>₹1,00,000 – ₹5,00,000</option>
                        <option>₹5,00,000+</option>
                    </select>
                </label>
            </div>
            <button className="button button-primary form-submit" type="submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending…' : 'Get my free PPC proposal'} <ArrowUpRight size={17} />
            </button>
            <p className="form-note"><ShieldCheck size={14} /> Your information stays private. No pressure, no spam.</p>
        </form>
    );
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [testimonial, setTestimonial] = useState(0);
    const testimonials = [
        { quote: 'The team brought real structure to our paid search. We finally understand what is driving enquiries and where to invest next.', name: 'Rohit Malhotra', role: 'Founder, Growth-led services brand', initials: 'RM' },
        { quote: 'Our campaigns feel sharper, our reporting is clear, and the quality of leads has improved significantly since day one.', name: 'Ananya Kapoor', role: 'Marketing Director, D2C brand', initials: 'AK' },
    ];

    return (
        <div className="site-shell" id="top">
            <div className="top-strip"><span>Google Ads & PPC management for ambitious businesses</span><a href={whatsappLink} target='_blank'>Talk to a specialist <ArrowUpRight size={13} /></a></div>
            <header className="site-header">
                <Logo />
                <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
                <nav className={menuOpen ? 'nav-open' : ''}>
                    <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
                    <a href="#process" onClick={() => setMenuOpen(false)}>Our process</a>
                    <a href="#campaigns" onClick={() => setMenuOpen(false)}>Campaign types</a>
                    <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
                    <a className="nav-contact" href={whatsappLink} target='_blank'> {whatsappIcon}{phone}</a>
                    <a className="button button-dark nav-button" href="#contact" onClick={() => setMenuOpen(false)}>Get a free proposal <ArrowUpRight size={15} /></a>
                </nav>
            </header>

            <main>
                <section className="hero section-grid">
                    <div className="hero-copy">
                        <div className="eyebrow"><span className="eyebrow-dot" /> GOOGLE ADS & PPC MANAGEMENT</div>
                        <h1>Turn search intent into <em>real growth.</em></h1>
                        <p className="hero-lede">Professionally managed Google Ads campaigns that attract high-intent customers, create quality leads and make every click work harder for your business.</p>
                        <div className="hero-actions"><a className="button button-primary" href="#contact">Get free consultation <ArrowUpRight size={17} /></a><a className="button button-outline" href={whatsappLink} target='_blank'>{whatsappIcon} Call {phone}</a></div>
                        <div className="trust-row"><span><CheckCircle2 size={16} /> Data-led strategy</span><span><CheckCircle2 size={16} /> Transparent reporting</span><span><CheckCircle2 size={16} /> ROI-minded execution</span></div>
                    </div>
                    <div className="hero-visual">
                        <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-glow" />
                        <div className="dashboard-card">
                            <div className="dashboard-top"><span className="window-dots"><i /><i /><i /></span><span>campaign overview <Activity size={13} /></span></div>
                            <div className="dashboard-title"><div><small>ACCOUNT PERFORMANCE</small><strong>Campaigns are trending up</strong></div><span className="up-pill">+28.4%</span></div>
                            <div className="metric-row"><div><span>Clicks</span><strong>24,860</strong><small className="positive">+18.2%</small></div><div><span>Conversions</span><strong>1,286</strong><small className="positive">+32.8%</small></div><div><span>Cost / lead</span><strong>₹418</strong><small className="positive">−12.4%</small></div></div>
                            <div className="chart"><div className="chart-labels"><span>₹20k</span><span>₹15k</span><span>₹10k</span><span>₹5k</span></div><svg viewBox="0 0 520 155" role="img" aria-label="Campaign growth chart"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#000f33" stopOpacity=".3" /><stop offset="1" stopColor="#000f33" stopOpacity="0" /></linearGradient></defs><path d="M0 133 C32 120, 36 106, 65 113 S98 96, 125 103 S157 118, 184 86 S216 93, 242 77 S276 63, 302 71 S332 88, 365 46 S397 63, 420 45 S458 32, 520 13 L520 155 L0 155Z" fill="url(#chartFill)" /><path d="M0 133 C32 120, 36 106, 65 113 S98 96, 125 103 S157 118, 184 86 S216 93, 242 77 S276 63, 302 71 S332 88, 365 46 S397 63, 420 45 S458 32, 520 13" fill="none" stroke="#000f33" strokeWidth="3" /></svg></div>
                            <div className="dashboard-footer"><span><i className="legend-dot coral" /> Conversions</span><span><i className="legend-dot cyan" /> Revenue influenced</span><span>Last 30 days <ChevronDown size={13} /></span></div>
                        </div>
                        <div className="float-card float-conversion"><span className="float-icon"><MousePointerClick size={18} /></span><div><small>CONVERSION RATE</small><strong>5.18%</strong></div><span className="mini-spark">↗</span></div>
                        <div className="float-card float-roas"><span className="float-icon green"><CircleDollarSign size={18} /></span><div><small>ROAS</small><strong>4.8x</strong></div></div>
                        <div className="hero-stamp"><BadgeCheck size={18} /><span>Built for<br /><strong>better leads</strong></span></div>
                    </div>
                </section>

                <section className="stats-band"><div className="stats-intro"><span className="eyebrow">THE ABSOLUTE DIFFERENCE</span><h2>Built around outcomes, not vanity metrics.</h2></div><div className="stat"><strong><Counter value={10} /><span>+</span></strong><span>years in performance marketing</span></div><div className="stat"><strong><Counter value={1000} /><span>+</span></strong><span>projects completed</span></div><div className="stat"><strong><Counter value={85} /><span>+</span></strong><span>marketing specialists</span></div></section>

                <section className="section light-section why-section"><div className="section-heading centered"><span className="eyebrow">WHY GOOGLE ADS</span><h2>Be there when your next<br /><em>customer is looking.</em></h2><p>Google Ads puts your business in front of high-intent people at the most valuable moment: when they are searching for a solution.</p></div><div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }) => <article className="benefit-card" key={title}><span className="icon-box"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><a href="#contact">Explore benefit <ArrowRight size={15} /></a></article>)}</div></section>

                <section className="section services-section" id="services"><div className="section-heading section-heading-split"><div><span className="eyebrow">WHAT WE DO</span><h2>Everything your campaigns need to <em>perform better.</em></h2></div><p>From the first keyword to the latest report, we manage the details that turn paid search into a dependable growth channel.</p></div><div className="services-grid">{services.map(({ number, icon: Icon, title, text }) => <article className="service-card" key={number}><div className="service-top"><span className="service-number">{number}</span><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></a></article>)}</div></section>

                <section className="section process-section" id="process"><div className="section-heading centered"><span className="eyebrow">HOW IT WORKS</span><h2>A clearer path from click<br />to <em>customer.</em></h2></div><div className="process-line">{[['01', 'Understand', 'Your goals, audience and growth targets.'], ['02', 'Research', 'Keywords, competitors and opportunity.'], ['03', 'Build', 'Campaigns designed for intent and action.'], ['04', 'Optimize', 'Tracking, testing and smarter decisions.'], ['05', 'Scale', 'More of what works, less wasted spend.']].map(([number, title, text], index) => <div className="process-step" key={number}><span className="process-dot">{number}</span><div><h3>{title}</h3><p>{text}</p></div>{index < 4 && <ArrowRight className="process-arrow" size={18} />}</div>)}</div></section>

                <section className="dark-section choice-section"><div className="section-heading centered"><span className="eyebrow light-eyebrow">WHY ABSOLUTE RANKING</span><h2>Sharper thinking.<br /><em>Stronger outcomes.</em></h2><p>We combine strategic clarity with day-to-day campaign craft, so your advertising keeps getting more useful.</p></div><div className="choice-grid">{[['Customized strategy', 'A plan built around your business, market and goals.', Target], ['Transparent reporting', 'Clear answers about where your budget is going.', PieChart], ['Experienced specialists', 'Hands-on support from people who know paid search.', ShieldCheck], ['Continuous optimization', 'Active testing and iteration, not set-and-forget.', TrendingUp], ['ROI-focused mindset', 'We care about business results, not empty impressions.', CircleDollarSign], ['Dedicated support', 'Straight answers and a team that stays close to your goals.', Headphones]].map(([title, text, Icon]) => <div className="choice-item" key={title as string}><span className="choice-icon"><Icon size={19} /></span><div><h3>{title as string}</h3><p>{text as string}</p></div></div>)}</div></section>

                <section className="section performance-section"><div className="performance-copy"><span className="eyebrow">PERFORMANCE, MADE VISIBLE</span><h2>Track what matters.<br /><em>Optimize what works.</em></h2><p>Good PPC management turns a lot of data into a few clear decisions. We connect campaign performance to the actions that move your business forward.</p><div className="check-list"><span><CheckCircle2 size={17} /> Live performance visibility</span><span><CheckCircle2 size={17} /> Conversion-first optimization</span><span><CheckCircle2 size={17} /> Monthly strategy reporting</span></div><a className="text-button" href="#contact">See what we could improve <ArrowRight size={16} /></a></div><div className="performance-visual"><div className="performance-header"><span><span className="live-dot" /> Live account view</span><span>Last 30 days <ChevronDown size={13} /></span></div><div className="performance-main"><div><small>REVENUE INFLUENCED</small><strong>₹12,84,920</strong><span className="positive"><TrendingUp size={13} /> 24.8%</span></div><div className="bars"><span style={{ height: '35%' }} /><span style={{ height: '48%' }} /><span style={{ height: '43%' }} /><span style={{ height: '61%' }} /><span style={{ height: '55%' }} /><span style={{ height: '76%' }} /><span style={{ height: '69%' }} /><span style={{ height: '91%' }} /><span style={{ height: '82%' }} /><span style={{ height: '100%' }} /></div><div className="performance-stats"><span><small>CTR</small><b>6.42%</b></span><span><small>LEADS</small><b>1,286</b></span><span><small>ROAS</small><b>4.8x</b></span></div></div></div></section>

                <section className="section campaigns-section" id="campaigns"><div className="section-heading section-heading-split"><div><span className="eyebrow">CAMPAIGN TYPES</span><h2>One strategy.<br /><em>Every opportunity.</em></h2></div><p>We match the right campaign type to the way your customers search, browse and decide.</p></div><div className="campaign-grid">{campaigns.map(({ icon: Icon, title, text }) => <a className="campaign-card" href="#contact" key={title}><span className="campaign-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={17} /></a>)}</div></section>

                <section className="section testimonial-section"><div className="testimonial-quote"><span className="quote-mark">“</span><span className="eyebrow">CLIENT PERSPECTIVE</span><blockquote>{testimonials[testimonial].quote}</blockquote><div className="testimonial-person"><span className="avatar">{testimonials[testimonial].initials}</span><div><strong>{testimonials[testimonial].name}</strong><small>{testimonials[testimonial].role}</small></div></div><div className="slider-controls"><button aria-label="Previous testimonial" onClick={() => setTestimonial(testimonial === 0 ? testimonials.length - 1 : testimonial - 1)}><ChevronLeft size={17} /></button><span>{String(testimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}><ChevronRight size={17} /></button></div></div><div className="testimonial-aside"><Sparkles size={26} /><p>“The best campaigns are not the loudest. They are the ones that make the right next conversation happen.”</p><span>— The Absolute Ranking team</span></div></section>

                <section className="section faq-section" id="faq"><div className="section-heading"><span className="eyebrow">GOOD QUESTIONS</span><h2>Everything you need<br />to know.</h2><p>Still curious? Our specialists are only a call away.</p><a className="text-button" href={`mailto:${email}`}>Ask us directly <ArrowRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

                <section className="contact-section" id="contact"><div className="contact-copy"><span className="eyebrow light-eyebrow">READY WHEN YOU ARE</span><h2>Let&apos;s put your<br /><em>next lead</em> in motion.</h2><p>Tell us where you want to go. We&apos;ll help you map the smartest route there.</p><div className="contact-details"><a href={whatsappLink} target='_blank'>{whatsappIcon} {phone}</a><a href={`mailto:${email}`}><Mail size={17} /> {email}</a></div></div><LeadForm compact /></section>
            </main>

            <footer className="site-footer"><div className="footer-main"><div><Logo2 /><p>Performance marketing for businesses ready to grow with intent.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#services">What we do</a><a href="#process">Our process</a><a href="#campaigns">Campaign types</a></div><div><strong>Connect</strong><a href={whatsappLink} target='_blank'>{phone}</a><a href={`mailto:${email}`}>{email}</a><a href="#contact">Start a conversation</a></div></div></div><div className="footer-bottom"><span>© 2026 Absolute Ranking. All rights reserved.</span><span>Built for better leads <span className="footer-dot" /></span></div></footer>
        </div>
    );
}

export default App;
