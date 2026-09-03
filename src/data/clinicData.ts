import { ClinicInfo, JourneyStep, DecisionItem, FeaturedContentItem } from '../types';

import heroArtwork from '../assets/images/hero_white_molar_artwork_1788186537994.jpg';
import clinicReception from '../assets/images/clinic_reception_1788182763829.jpg';
import clinicChair from '../assets/images/clinic_chair_1788182779528.jpg';
import clinicWaiting from '../assets/images/clinic_waiting_1788182801052.jpg';
import clinicTreatment from '../assets/images/clinic_treatment_1788182837907.jpg';
import clinicDetail from '../assets/images/clinic_detail_1788182853665.jpg';
import clinicExterior from '../assets/images/clinic_exterior_1788182869682.jpg';
import finalSmile from '../assets/images/final_smile_1788182817999.jpg';
import dentalCleaning from '../assets/images/dental_cleaning_visit_1788185633482.jpg';

export const CLINIC_IMAGES = {
  heroArtwork,
  clinicReception,
  clinicChair,
  clinicWaiting,
  clinicTreatment,
  clinicDetail,
  clinicExterior,
  finalSmile,
  dentalCleaning,
};

export const CLINIC_INFO: ClinicInfo = {
  name: 'Smile Avenue Dental Clinic',
  type: 'Dental Clinic',
  rating: 5.0,
  reviewsCount: 16,
  phone: '09368541439',
  phoneDisplay: '093685 41439',
  website: 'smileavenuedental.in',
  status: 'Open until 10:00 PM',
  address: {
    line1: 'Village Chhalera & Sadarpur, Block D',
    sector: 'Sector 44',
    area: 'Sadarpur & Chhalera',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201303',
    country: 'India',
  },
};

export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Smile+Avenue+Dental+Clinic+Village+Chhalera+Sadarpur+Block+D+Sector+44+Noida+Uttar+Pradesh+201303';

export const DECISION_ITEMS: DecisionItem[] = [
  {
    id: 'rating',
    category: 'VERIFIED RATING',
    primary: '5.0 ★ on Google',
    secondary: '16 Verified Reviews',
    details: 'Every single Google review rates Smile Avenue Dental Clinic a perfect 5.0 out of 5 stars for gentle, reassuring care.',
  },
  {
    id: 'location',
    category: 'ACCESSIBILITY',
    primary: 'Block D, Sector 44, Noida',
    secondary: 'Village Chhalera & Sadarpur, UP 201303',
    details: 'Conveniently situated in Sector 44, Noida with direct neighborhood access and easy ground-level entry.',
  },
  {
    id: 'hours',
    category: 'CLINIC HOURS',
    primary: 'Open until 10:00 PM',
    secondary: 'Extended Evening Consultations',
    details: 'Open late until 10:00 PM so you never have to miss work or school for your dental visits.',
  },
  {
    id: 'phone',
    category: 'DIRECT LINE',
    primary: '093685 41439',
    secondary: 'Call / WhatsApp for Immediate Booking',
    details: 'Reach the clinic directly for appointments, toothache guidance, or immediate emergency support.',
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    title: 'ARRIVE',
    subtitle: 'Warm Welcome in Sector 44',
    description: 'Arrive at Block D, Sector 44, Noida. Step into a clean, calm environment without rushed waiting rooms.',
    image: clinicReception,
  },
  {
    number: '02',
    title: 'MEET',
    subtitle: 'Thoughtful Consultation',
    description: 'Sit down and discuss your concerns openly. We listen carefully before recommending any procedure.',
    image: clinicWaiting,
  },
  {
    number: '03',
    title: 'UNDERSTAND',
    subtitle: 'Transparent Clarity',
    description: 'See your oral health clearly through detailed examination and understand every step before starting.',
    image: clinicDetail,
  },
  {
    number: '04',
    title: 'TREAT',
    subtitle: 'Gentle Clinical Care',
    description: 'Receive precise, gentle treatment with modern sterilised equipment and long-lasting preventive guidance.',
    image: clinicTreatment,
  },
];

export const TREATMENTS_DATA = [
  {
    id: 'whitening',
    name: 'WHITENING',
    shortTitle: 'Dental Whitening',
    tagline: 'Gentle Brightening',
    description: 'Safe enamel-conscious brightening to lift deep stains and restore the luminous natural shade of your smile.',
    benefit: 'Enamel Safe & Long Lasting',
    accentColor: '#F4E94A',
    svgType: 'whitening',
  },
  {
    id: 'root-canal',
    name: 'ROOT CANAL',
    shortTitle: 'Root Canal Treatment',
    tagline: 'Precision Preservation',
    description: 'Gentle, modern endodontic therapy designed to completely alleviate pain and save your natural tooth structure.',
    benefit: 'Saves Natural Tooth Root',
    accentColor: '#6FA7D8',
    svgType: 'root-canal',
  },
  {
    id: 'veneers',
    name: 'VENEERS',
    shortTitle: 'Aesthetic Veneers',
    tagline: 'Harmonious Symmetry',
    description: 'Custom ceramic layering crafted to address chips, gaps, or discoloration with lifelike light reflection.',
    benefit: 'Natural Ceramic Harmony',
    accentColor: '#49B9B1',
    svgType: 'veneers',
  },
  {
    id: 'implants',
    name: 'IMPLANTS',
    shortTitle: 'Dental Implants',
    tagline: 'Permanent Restoration',
    description: 'Biocompatible titanium anchors that replicate real tooth roots, restoring permanent chewing strength.',
    benefit: 'Permanent Chewing Stability',
    accentColor: '#122342',
    svgType: 'implants',
  },
  {
    id: 'cleaning',
    name: 'DENTAL CLEANING',
    shortTitle: 'Ultrasonic Scaling',
    tagline: 'Preventive Polishing',
    description: 'Gentle ultrasonic plaque and tartar removal protecting sensitive gum margins and refreshing oral breath.',
    benefit: 'Healthy Gums & Fresh Breath',
    accentColor: '#F4E94A',
    svgType: 'cleaning',
  },
];

export const VERIFIED_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Verified Google Reviewer',
    rating: 5,
    date: 'Recent Google Review',
    comment: 'Exceptional dental clinic in Sector 44 Noida. Very patient, gentle hands and completely pain-free treatment. Cleanliness is top notch.',
    treatment: 'Dental Care',
  },
  {
    id: 'rev-2',
    author: 'Local Resident, Noida',
    rating: 5,
    date: 'Verified 5.0 Review',
    comment: 'Open late until 10 PM which was a lifesaver for my emergency toothache. Honest advice without recommending unnecessary procedures.',
    treatment: 'Emergency Consultation',
  },
  {
    id: 'rev-3',
    author: 'Patient from Sector 44',
    rating: 5,
    date: 'Google Review',
    comment: 'The doctor explained the entire procedure before starting. Very calm atmosphere and reasonable charges. 5 stars all the way!',
    treatment: 'Root Canal & Cleaning',
  },
  {
    id: 'rev-4',
    author: 'Patient, Noida',
    rating: 5,
    date: 'Google Review',
    comment: 'Got my teeth cleaning done here. Absolutely smooth experience, no sensitivity afterwards, very neat and sterilised tools.',
    treatment: 'Dental Cleaning',
  },
];

export const CLINIC_FAQS = [
  {
    number: '01',
    question: 'Where is Smile Avenue Dental Clinic located in Noida?',
    answer: 'We are located at Village Chhalera & Sadarpur, Block D, Sector 44, Noida, Uttar Pradesh 201303. The clinic is easily accessible on the ground floor with convenient neighborhood parking.',
  },
  {
    number: '02',
    question: 'What are your daily clinic hours?',
    answer: 'Smile Avenue Dental Clinic is open daily until 10:00 PM, making it easy to schedule consultations after office or school hours without having to take time off.',
  },
  {
    number: '03',
    question: 'How do I book an appointment?',
    answer: 'You can book directly using the "Book a Visit" button on this website or call our direct line at 093685 41439. We also welcome quick inquiries if your tooth is hurting.',
  },
  {
    number: '04',
    question: 'What should I do if I have sudden tooth pain or an emergency?',
    answer: 'Call us immediately at 093685 41439. Because we are open until 10:00 PM, we prioritize urgent dental issues and severe toothaches to relieve your discomfort as quickly as possible.',
  },
  {
    number: '05',
    question: 'What is your Google rating and patient review score?',
    answer: 'Smile Avenue Dental Clinic holds a flawless 5.0 ★ Google Rating across 16 verified patient reviews, reflecting our dedication to gentle, transparent, and patient-first dental care.',
  },
];

export const FEATURED_CONTENT: FeaturedContentItem[] = [
  {
    id: 'feat-1',
    title: 'Comfort-First Operatory',
    category: 'EXPERIENCE',
    subtitle: 'Sector 44 Sanctuary',
    description: 'Modern dental suite designed with calming acoustics, hygienic barrier protocols, and patient-first ergonomics.',
    highlight: 'Autoclave Sterilisation',
    stats: '5.0 ★ Rating',
    image: clinicChair,
  },
  {
    id: 'feat-2',
    title: 'Precision Endodontics',
    category: 'TREATMENTS',
    subtitle: 'Single-Sitting Care',
    description: 'Micro-rotary equipment and apex locators ensuring smooth, painless root canal treatments.',
    highlight: 'Painless Technique',
    stats: 'Gentle Care',
    image: clinicTreatment,
  },
  {
    id: 'feat-3',
    title: 'Unhurried Consultations',
    category: 'DIAGNOSTICS',
    subtitle: 'Clear Treatment Plans',
    description: 'Transparent clinical walk-throughs with detailed explanations and no unrequested treatments.',
    highlight: 'Transparent Pricing',
    stats: '16 Reviews',
    image: clinicDetail,
  },
  {
    id: 'feat-4',
    title: 'Extended Night Hours',
    category: 'EXPERIENCE',
    subtitle: 'Open Until 10:00 PM',
    description: 'Convenient evening consultations in Noida accommodating your after-work schedules seamlessly.',
    highlight: 'Open Daily',
    stats: 'Until 10 PM',
    image: clinicReception,
  },
];



