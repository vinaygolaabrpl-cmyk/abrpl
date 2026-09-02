import { FormEvent, useEffect, useRef, useState } from 'react';
import { Activity, AlertCircle, AlertTriangle, ArrowRight, ArrowUpRight, BarChart3, BadgeCheck, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, Compass, Cpu, Database, Gauge, Headphones, Layers3, LineChart, Mail, Megaphone, Menu, MousePointerClick, PenTool, Phone, PieChart, Route, Search, ShieldCheck, Sparkles, Target, TrendingDown, TrendingUp, Unlock, Users, WalletCards, X, Zap, } from 'lucide-react';
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
    { icon: AlertTriangle, title: 'Eliminating Budget Waste', text: 'Misconfigured broad match keywords and improper negative keyword lists routinely waste 20–40% of ad budgets on unqualified clicks.' },
    { icon: Cpu, title: 'Mastering Smart Bidding & AI', text: 'Algorithmic bidding needs accurate first-party conversion data to train correctly; poor setup leads to misguided machine-learning decisions.' },
    { icon: TrendingUp, title: 'Overcoming Rising CPCs', text: 'In competitive markets, maintaining profitable acquisition costs requires hyper-targeted ad relevance, superior Quality Scores, and high-converting landing pages.' },
    { icon: Route, title: 'Navigating Complex Attribution', text: 'Multi-touch buyer journeys require server-side conversion tracking and accurate analytics to measure actual pipeline revenue, not just clicks.' },
];

const differentiators = [
    { icon: BadgeCheck, title: 'Senior-Led Execution', text: 'Your campaigns are managed directly by seasoned PPC specialists — not handed off to junior account coordinators or automated set-and-forget routines.' },
    { icon: CircleDollarSign, title: 'Commercial Intent Focus', text: 'We do not optimize for cheap, vanity clicks. Every keyword, ad copy iteration, and bid adjustment is engineered to drive high-margin pipeline revenue.' },
    { icon: Database, title: 'First-Party Data Integration', text: 'We bridge the gap between ad clicks and closed deals by feeding CRM data back into Google\'s algorithms, training the AI to target your highest-value customers.' },
    { icon: Compass, title: 'Proactive Strategic Pivots', text: 'We constantly monitor auction dynamics, competitor shifts, and search trends, adjusting bids and messaging before market changes erode your margins.' },
];

const advantages = [
    { icon: TrendingDown, title: 'Lower Customer Acquisition Costs (CAC)', text: 'Continuous bid tuning, ad relevance improvements, and high Quality Scores reduce your cost-per-click, maximizing pipeline volume per ad dollar spent.' },
    { icon: Users, title: 'Higher-Intent Lead Quality', text: 'By replacing vanity traffic metrics with strict audience qualification, negative keyword gating, and conversion filters, we send sales-ready prospects straight to your pipeline.' },
    { icon: Zap, title: 'Rapid Speed-to-Market', text: 'Launch optimized, fully tracked campaigns within days — not weeks — enabling immediate capture of existing market demand.' },
    { icon: PieChart, title: 'Complete Spend Transparency', text: 'Maintain full visibility and direct ownership of your ad accounts, billing, and performance metrics with zero hidden agency markups.' },
    { icon: BarChart3, title: 'Scalable Revenue Infrastructure', text: 'As campaigns hit profitability benchmarks, our structured account architecture allows for predictable, frictionless budget scaling without diminishing returns.' },
];

const services = [
    { number: '01', icon: Search, title: 'Search Campaign Management', text: 'High-intent keyword capture, hyper-segmented ad groups, custom ad extensions, and aggressive negative keyword filtering.' },
    { number: '02', icon: Layers3, title: 'Display & Remarketing Ads', text: 'Audience segmentation, strategic remarketing, dynamic banner placements, and brand protection across the Google Display Network.' },
    { number: '03', icon: WalletCards, title: 'Bid & Budget Optimization', text: 'Target CPA (tCPA), Target ROAS (tROAS), and portfolio bid management tuned to profit margins rather than simple conversion volume.' },
    { number: '04', icon: PenTool, title: 'Ad Copywriting & A/B Testing', text: 'High-converting, benefit-driven ad copy, responsive search ads (RSAs), and continuous testing of headlines, hooks, and CTAs.' },
    { number: '05', icon: LineChart, title: 'Conversion Tracking & Analytics', text: 'Google Tag Manager implementation, GA4 event setup, offline conversion imports, and full-funnel revenue attribution.' },
    { number: '06', icon: MousePointerClick, title: 'Landing Page CRO Consulting', text: 'Message matching, page load optimization, and conversion rate optimization (CRO) to maximize form fills and phone calls.' },
];

const campaigns = [
    { icon: Search, title: 'Google Search Ads', objective: 'Capture high-intent users actively searching for your solutions with keyword-targeted text ads.', bestFor: 'Immediate lead generation, urgent services, and high-value B2B/commercial offerings.' },
    { icon: Layers3, title: 'Google Display Ads', objective: 'Build brand awareness and visually engage prospects across millions of partner websites and apps.', bestFor: 'Top-of-funnel reach, visually engaging offers, and broader market positioning.' },
    { icon: RefreshCwIcon, title: 'Google Remarketing', objective: 'Re-engage previous site visitors who left without converting with tailored, sequential messaging.', bestFor: 'Shortening sales cycles and recovering abandoned inquiries or high-intent leads.' },
    { icon: Gauge, title: 'Performance Max (PMax)', objective: 'Leverage Google\'s full ecosystem (Search, Display, YouTube, Gmail, Maps) with machine-learning optimization.', bestFor: 'Scaling cross-channel conversions with unified asset groups and first-party audience signals.' },
    { icon: Phone, title: 'Local Services & Call Ads', objective: 'Drive direct phone calls and local inquiries from prospects within specific geographic radiuses.', bestFor: 'Multi-location businesses, regional service providers, and emergency service operations.' },
];

const performanceFeatures = [
    { title: '24/7 Live Performance Dashboards', text: 'Access real-time data on spend, Cost Per Acquisition (CPA), conversion volume, and Return on Ad Spend (ROAS) whenever you need it.' },
    { title: 'Closed-Loop Revenue Attribution', text: 'Gain full visibility into which exact campaigns, ad groups, and search queries generate actual sales, not just form fills.' },
    { title: 'Jargon-Free Monthly Reviews', text: 'Receive clear, executive-level summaries detailing campaign performance, key optimizations made, and forward-looking growth strategies.' },
    { title: 'Direct Account Ownership', text: 'You retain 100% administrative control and direct billing access to your Google Ads account at all times — no hidden margins, no proprietary lock-ins.' },
];

const faqs = [
    ['How quickly can we expect results from Google Ads?', 'Unlike organic SEO, Google Ads generates targeted traffic immediately after campaign launch. Optimization for peak conversion efficiency and calibrated algorithm learning typically stabilizes within 30 to 60 days.'],
    ['Who owns the Google Ads account and campaign data?', 'You retain 100% ownership of your Google Ads account, data, and intellectual property. If you ever decide to pause services, your assets and campaign history remain entirely yours.'],
    ['How do you determine our required ad budget?', 'We evaluate average industry Cost Per Click (CPC), competitive density, and your target lead volume to recommend an optimal starting budget that yields statistically significant data while maintaining positive unit economics.'],
    ['How do you prevent junk leads and click fraud?', 'We combine proactive IP exclusions, strict geographic targeting parameters, rigorous negative keyword lists, and invalid-click protection protocols to preserve your ad budget for genuine prospects.'],
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
                    <span>Business Email</span>
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
                    <span>Phone Number</span>
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
                        <option>Under $2,500</option>
                        <option>$2,500 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000+</option>
                    </select>
                </label>
            </div>
            <button className="button button-primary form-submit" type="submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending…' : 'Get My Custom Growth Proposal'} <ArrowUpRight size={17} />
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
        { quote: 'Absolute Ranking eliminated 35% of our wasted ad spend in the first 45 days while increasing our qualified inbound leads by over 60%.', name: '', role: '', initials: '' },
        { quote: 'The level of reporting and strategic clarity is unmatched. We finally know our exact cost per acquisition and can forecast our growth with confidence.', name: '', role: '', initials: '' },
        { quote: 'Their team operates like a true internal partner. Every adjustment is backed by data, and our lead quality has never been higher.', name: '', role: '', initials: '' },
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
                        <h1>Maximize ROI &amp; Scale Revenue with <em> Data-Driven Google Ads Management</em></h1>
                        <p className="hero-lede">Stop burning ad budget on low-intent clicks. Absolute Ranking builds, optimizes, and scales precision PPC campaigns that consistently deliver qualified leads and measurable profit.</p>
                        <div className="hero-actions"><a className="button button-primary" href="#contact">Get My Free PPC Audit <ArrowUpRight size={17} /></a><a className="button button-outline" href={whatsappLink} target='_blank'>{whatsappIcon} Request a Custom Proposal</a></div>
                        <div className="trust-row"><span><CheckCircle2 size={16} /> Certified Google Partner Agency</span><span><CheckCircle2 size={16} /> $50M+ Ad Spend Managed</span><span><CheckCircle2 size={16} /> 340% Average Client ROI Growth</span><span><CheckCircle2 size={16} /> Transparent, Real-Time Reporting</span></div>
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

                <section className="section light-section intro-section"><div className="section-heading centered"><span className="eyebrow">THE CHALLENGE</span><h2>Why profitable paid search<br />demands <em>precision.</em></h2></div><div className="intro-copy"><p>Reaching high-intent prospects at the exact moment they search for your solutions is the core strength of Google Ads. However, managing campaigns in an increasingly competitive, automated auction requires more than basic keyword matching.</p><p>Without strategic oversight, ad spend quickly drains into irrelevant queries, inefficient smart bidding algorithms, and unoptimized landing pages. Absolute Ranking provides end-to-end Google Ads management that prioritizes <strong>revenue generation over vanity metrics</strong>, turning your paid search into a predictable acquisition engine.</p></div></section>

                <section className="section light-section why-section"><div className="section-heading centered"><span className="eyebrow">WHY IT MATTERS</span><h2>Why businesses need professional<br /><em>Google Ads management.</em></h2><p>Running high-performance Google Ads campaigns requires continuous strategic adjustments.</p></div><div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }) => <article className="benefit-card" key={title}><span className="icon-box"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><a href="#contact">Explore benefit <ArrowRight size={15} /></a></article>)}</div></section>

                <section className="section light-section difference-section"><div className="section-heading centered"><h2>THE ABSOLUTE <em>DIFFERENCE</em></h2></div><div className="benefit-grid">{differentiators.map(({ icon: Icon, title, text }) => <article className="benefit-card" key={title}><span className="icon-box"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

                <section className="section campaigns-section" id="campaigns"><div className="section-heading section-heading-split"><div><span className="eyebrow">CAMPAIGN TYPES</span><h2>One strategy.<br /><em>Every opportunity.</em></h2></div><p>We match the right campaign type to the way your customers search, browse and decide.</p></div><div className="campaign-grid">{campaigns.map(({ icon: Icon, title, objective, bestFor }) => <a className="campaign-card" href="#contact" key={title}><span className="campaign-icon"><Icon size={20} /></span><div><h3>{title}</h3><p>{objective}</p><p className="campaign-bestfor"><strong>Best for:</strong> {bestFor}</p></div><ArrowUpRight size={17} /></a>)}</div></section>

                <section className="section services-section" id="services"><div className="section-heading section-heading-split"><div><span className="eyebrow">WHAT WE DO</span><h2>Our comprehensive Google Ads <em>management services.</em></h2></div><p>Six execution pillars working together to turn ad spend into predictable, trackable revenue.</p></div><div className="services-grid">{services.map(({ number, icon: Icon, title, text }) => <article className="service-card" key={number}><div className="service-top"><span className="service-number">{number}</span><Icon size={22} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn more about ${title}`}><ArrowUpRight size={17} /></a></article>)}</div></section>

                <section className="section benefits-alt-section" id="benefits"><div className="section-heading centered"><span className="eyebrow">THE ABSOLUTE ADVANTAGE</span><h2>Benefits of working<br />with <em>Absolute Ranking.</em></h2><p>Here&apos;s what changes once your Google Ads account is in expert hands.</p></div><div className="benefits-alt-grid">{advantages.map(({ icon: Icon, title, text }) => <article className="benefit-card" key={title}><span className="icon-box"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p><a href="#contact">Explore benefit <ArrowRight size={15} /></a></article>)}</div></section>

                <section className="section performance-section"><div className="section-heading performance-copy"><span className="eyebrow">PERFORMANCE, MADE VISIBLE</span><h2>Track what matters.<br /><em>Optimize what works.</em></h2><p>Good PPC management turns a lot of data into a few clear decisions. We connect campaign performance to the actions that move your business forward.</p><div className="performance-features">{performanceFeatures.map(({ title, text }) => <div className="performance-feature" key={title}><CheckCircle2 size={17} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div><a className="text-button" href="#contact">See what we could improve <ArrowRight size={16} /></a></div><div className="performance-visual"><div className="performance-header"><span><span className="live-dot" /> Live account view</span><span>Last 30 days <ChevronDown size={13} /></span></div><div className="performance-main"><div><small>REVENUE INFLUENCED</small><strong>₹12,84,920</strong><span className="positive"><TrendingUp size={13} /> 24.8%</span></div><div className="bars"><span style={{ height: '35%' }} /><span style={{ height: '48%' }} /><span style={{ height: '43%' }} /><span style={{ height: '61%' }} /><span style={{ height: '55%' }} /><span style={{ height: '76%' }} /><span style={{ height: '69%' }} /><span style={{ height: '91%' }} /><span style={{ height: '82%' }} /><span style={{ height: '100%' }} /></div><div className="performance-stats"><span><small>CTR</small><b>6.42%</b></span><span><small>LEADS</small><b>1,286</b></span><span><small>ROAS</small><b>4.8x</b></span></div></div></div></section>

                <section className="section process-section" id="process"><div className="section-heading centered"><span className="eyebrow">HOW IT WORKS</span><h2>Our strategic 4-step<br /><em>PPC management process.</em></h2></div><div className="process-line">{[['01', 'Discovery & Account Audit', 'We dissect your existing account history, competitive landscape, target audience, and profit margins to uncover immediate cost-saving opportunities and growth targets.'], ['02', 'Campaign Architecture & Setup', 'We structure targeted campaigns with zero wasted spend, develop persuasive ad copy, set up conversion tracking, and align landing page user experiences.'], ['03', 'Continuous Testing & Bidding Calibration', 'We analyze real search-term reports daily, prune negative keywords, test creative variations, and calibrate automated bidding signals for optimal efficiency.'], ['04', 'Transparent Reporting & Scaling', 'Access 24/7 real-time custom dashboards alongside dedicated monthly strategy calls focused on lowering Cost Per Acquisition (CPA) and scaling spend profitably.']].map(([number, title, text], index) => <div className="process-step" key={number}><span className="process-dot">{number}</span><div><h3>{title}</h3><p>{text}</p></div>{index < 3 && <ArrowRight className="process-arrow" size={18} />}</div>)}</div></section>

                <section className="dark-section choice-section"><div className="section-heading centered"><span className="eyebrow light-eyebrow">WHY ABSOLUTE RANKING</span><h2>Why partner with<br /><em>Absolute Ranking?</em></h2><p>We combine strategic clarity with day-to-day campaign craft, so your advertising keeps getting more useful.</p></div><div className="choice-grid">{[['Performance-First Philosophy', 'We measure success by your bottom-line return, pipeline value, and qualified leads — not superficial click counts.', Target], ['Zero Wasted Ad Spend', 'Rigorous negative keyword architecture and audience exclusion strategies ensure every dollar targets high-intent buyers.', ShieldCheck], ['Proactive Account Management', 'Your account receives direct management and weekly optimizations from senior PPC specialists, not junior interns.', Headphones], ['No Long-Term Lock-Ins', 'We earn your business every month through transparent work, clear communication, and verifiable results.', Unlock]].map(([title, text, Icon]) => <div className="choice-item" key={title as string}><span className="choice-icon"><Icon size={19} /></span><div><h3>{title as string}</h3><p>{text as string}</p></div></div>)}</div></section>

                <section className="cta-banner"><div className="cta-banner-inner"><Megaphone size={30} /><h2>Is your current ad spend<br />producing <em>real revenue?</em></h2><p>Let our senior PPC strategists perform a deep-dive audit of your Google Ads account to uncover hidden waste, missed keyword opportunities, and instant conversion wins.</p><a className="button button-primary" href="#contact">Claim Your Free 20-Point PPC Audit <ArrowUpRight size={17} /></a></div></section>

                <section className="section testimonial-section"><div className="testimonial-quote"><span className="quote-mark">“</span><span className="eyebrow">CLIENT PERSPECTIVE</span><blockquote>{testimonials[testimonial].quote}</blockquote>{testimonials[testimonial].name && <div className="testimonial-person"><span className="avatar">{testimonials[testimonial].initials}</span><div><strong>{testimonials[testimonial].name}</strong><small>{testimonials[testimonial].role}</small></div></div>}<div className="slider-controls"><button aria-label="Previous testimonial" onClick={() => setTestimonial(testimonial === 0 ? testimonials.length - 1 : testimonial - 1)}><ChevronLeft size={17} /></button><span>{String(testimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}><ChevronRight size={17} /></button></div></div><div className="testimonial-aside"><Sparkles size={26} /><p>“The best campaigns are not the loudest. They are the ones that make the right next conversation happen.”</p><span>— The Absolute Ranking team</span></div></section>

                <section className="section faq-section" id="faq"><div className="section-heading"><span className="eyebrow">GOOD QUESTIONS</span><h2>Everything you need<br />to know.</h2><p>Still curious? Our specialists are only a call away.</p><a className="text-button" href={`mailto:${email}`}>Ask us directly <ArrowRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

                <section className="contact-section" id="contact"><div className="contact-copy"><span className="eyebrow light-eyebrow">READY WHEN YOU ARE</span><h2>Ready to scale your lead<br />generation with <em>profitable Google Ads?</em></h2><p>Partner with Absolute Ranking and turn paid search into your highest-performing customer acquisition channel.</p><div className="contact-details"><a href={whatsappLink} target='_blank'>{whatsappIcon} {phone}</a><a href={`mailto:${email}`}><Mail size={17} /> {email}</a></div></div><LeadForm compact /></section>
            </main>

            <footer className="site-footer"><div className="footer-main"><div><Logo2 /><p>Performance marketing for businesses ready to grow with intent.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#services">What we do</a><a href="#process">Our process</a><a href="#campaigns">Campaign types</a></div><div><strong>Connect</strong><a href={whatsappLink} target='_blank'>{phone}</a><a href={`mailto:${email}`}>{email}</a><a href="#contact">Start a conversation</a></div></div></div><div className="footer-bottom"><span>© 2026 Absolute Ranking. All rights reserved.</span><span>Built for better leads <span className="footer-dot" /></span></div></footer>
        </div>
    );
}

export default App;
