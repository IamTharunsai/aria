"use client"

import { useState } from "react"

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  navy:    "#060E1E",
  navy2:   "#0C1A32",
  brand:   "#1447E6",
  sky:     "#0EA5E9",
  success: "#16A34A",
  error:   "#EF4444",
  text:    "#0D1117",
  muted:   "#6B7280",
  light:   "#F7F9FC",
  border:  "#E5E7EB",
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step {
  title: string
  description: string
  actor: "ARIA" | "Caller" | "System"
}

interface Exchange {
  role: "caller" | "aria"
  text: string
}

interface BusinessType {
  id: string
  label: string
  headline: string
  steps: Step[]
  features: string[]
  conversation: Exchange[]
  callerQuestions: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "HEALTHCARE",
    label: "Healthcare",
    headline: "Patient-first care, HIPAA-compliant conversations",
    steps: [
      { actor: "ARIA",   title: "Greet & Verify Caller",         description: "ARIA answers instantly, confirms caller identity with name and date of birth." },
      { actor: "Caller", title: "New or Existing Patient?",       description: "Caller indicates their status; ARIA routes accordingly and pulls relevant context." },
      { actor: "Caller", title: "Reason for Visit / Symptoms",    description: "Caller describes the reason for calling; ARIA listens and categorizes urgency without diagnosing." },
      { actor: "ARIA",   title: "Schedule or Escalate",           description: "ARIA books an appointment in the calendar system or transfers to the on-call provider if urgent." },
      { actor: "System", title: "SMS Confirmation Sent",          description: "Confirmation SMS delivered with appointment date, time, location, and prep instructions." },
      { actor: "ARIA",   title: "After-Hours Emergency Redirect", description: "Outside office hours, ARIA detects emergency keywords and routes to the on-call emergency line." },
    ],
    features: ["HIPAA mode — no transcript storage", "Consent prompt at call start", "Appointment booking integration", "Emergency routing", "After-hours handling"],
    conversation: [
      { role: "caller", text: "Hi, I need to schedule an appointment." },
      { role: "aria",   text: "I'd be happy to help you schedule. Are you a new or existing patient with us?" },
      { role: "caller", text: "Existing patient — the name is Jordan Lee." },
      { role: "aria",   text: "Thanks, Jordan. What's the primary reason for your visit so I can find the right appointment type?" },
    ],
    callerQuestions: ["What are your office hours?", "Do you accept my insurance?", "How do I get my test results?", "Can I reschedule my appointment?", "Where are you located?", "Is the doctor available today?"],
  },
  {
    id: "RESTAURANT",
    label: "Restaurant",
    headline: "Never miss a reservation or order inquiry",
    steps: [
      { actor: "ARIA",   title: "Welcome Greeting",               description: "ARIA answers with the restaurant name and a warm greeting." },
      { actor: "Caller", title: "Reservation or Menu Question?",  description: "Caller states their need; ARIA distinguishes between booking, menu, hours, and order inquiries." },
      { actor: "Caller", title: "Party Size + Date/Time",         description: "For reservations, ARIA collects party size, preferred date, and time window." },
      { actor: "ARIA",   title: "Check Availability & Confirm",   description: "ARIA checks available slots in real time and presents options to the caller." },
      { actor: "Caller", title: "Special Requests Captured",      description: "Dietary restrictions, occasion notes, or seating preferences are logged to the booking." },
      { actor: "System", title: "SMS Confirmation Sent",          description: "Booking confirmation SMS sent with reservation details and restaurant address." },
      { actor: "ARIA",   title: "Hours / Location / Parking",     description: "ARIA provides hours, directions, and parking info if asked before or after booking." },
    ],
    features: ["Menu knowledge base", "Reservation booking", "Hours-aware responses", "Multi-language support", "SMS confirmation"],
    conversation: [
      { role: "caller", text: "Hi, I'd like a table for 4 on Saturday evening." },
      { role: "aria",   text: "Saturday evening works! We have 7:00 PM and 8:30 PM available. Which do you prefer?" },
      { role: "caller", text: "7 PM please — and one guest has a nut allergy." },
      { role: "aria",   text: "Noted — I'll flag the nut allergy on the booking. Shall I send a confirmation to your number?" },
    ],
    callerQuestions: ["What's on the menu?", "Do you have vegan options?", "How long is the wait?", "Do you take walk-ins?", "Is there parking nearby?", "Can I modify my reservation?"],
  },
  {
    id: "SALON",
    label: "Salon",
    headline: "Book appointments while your stylists focus on clients",
    steps: [
      { actor: "ARIA",   title: "Welcome & Service Inquiry",      description: "ARIA greets the caller and asks what service they're looking for today." },
      { actor: "Caller", title: "Service Type Selected",          description: "Caller picks from haircut, color, highlights, extensions, spa treatment, or other services." },
      { actor: "Caller", title: "Preferred Stylist",              description: "Caller optionally requests a specific stylist; ARIA checks that stylist's availability." },
      { actor: "ARIA",   title: "Date & Time Slot",               description: "ARIA presents available slots for the chosen service and stylist combination." },
      { actor: "System", title: "Appointment Added to Calendar",  description: "Booking is confirmed and added to the salon's scheduling system automatically." },
      { actor: "System", title: "SMS Reminder 24 Hours Before",   description: "An automated reminder SMS is sent the day before with appointment details and cancellation info." },
    ],
    features: ["Service catalog knowledge base", "Stylist availability check", "24-hour SMS reminders", "Gift card queries handled", "Cancellation policy delivery"],
    conversation: [
      { role: "caller", text: "I'd like to book a color appointment, ideally with Maya." },
      { role: "aria",   text: "Great choice! Maya has availability this Thursday at 2 PM or Friday at 10 AM. Which works better for you?" },
      { role: "caller", text: "Friday at 10 AM is perfect." },
      { role: "aria",   text: "Booked! You'll get a reminder text Thursday evening. Anything else I can help with?" },
    ],
    callerQuestions: ["How long does a balayage take?", "What's the price for a cut and color?", "Can I book for two people?", "What's your cancellation policy?", "Do you sell gift cards?", "Is parking available?"],
  },
  {
    id: "LEGAL",
    label: "Legal",
    headline: "Screen clients professionally, 24/7",
    steps: [
      { actor: "ARIA",   title: "Firm Greeting + Legal Disclaimer", description: "ARIA opens with the firm name and states: 'This call does not create an attorney-client relationship.'" },
      { actor: "Caller", title: "New or Existing Client?",          description: "Caller identifies their status; ARIA adjusts the intake flow accordingly." },
      { actor: "Caller", title: "Practice Area Identified",         description: "Caller describes their legal matter; ARIA maps it to the firm's practice areas." },
      { actor: "Caller", title: "Brief Matter Description",         description: "ARIA collects a concise description of the issue without soliciting privileged details." },
      { actor: "ARIA",   title: "Conflict Check Initiated",         description: "For existing client systems, ARIA flags the name for conflict screening before booking." },
      { actor: "ARIA",   title: "Schedule Consultation or Message", description: "ARIA books a consultation slot or takes a detailed message for the attorney to return." },
    ],
    features: ["Attorney-client disclaimer on every call", "Conflict screening flag", "No legal advice given by ARIA", "Consultation scheduling", "Confidential message capture"],
    conversation: [
      { role: "caller", text: "I need to speak with someone about a wrongful termination situation." },
      { role: "aria",   text: "I can help connect you with the right attorney. Just so you know, this call does not create an attorney-client relationship. Are you a new or existing client?" },
      { role: "caller", text: "New client." },
      { role: "aria",   text: "Understood. I'll schedule a free 30-minute consultation. Can I get your name and a brief overview of your situation?" },
    ],
    callerQuestions: ["Do you handle personal injury cases?", "How much does a consultation cost?", "What documents should I bring?", "Can I speak to an attorney now?", "Do you offer payment plans?", "How long does a case take?"],
  },
  {
    id: "REAL_ESTATE",
    label: "Real Estate",
    headline: "Capture every lead, qualify before your agents call back",
    steps: [
      { actor: "ARIA",   title: "Warm Greeting",                   description: "ARIA answers with the agency name and asks how it can help the caller today." },
      { actor: "Caller", title: "Buying, Selling, or Renting?",    description: "Caller states intent; ARIA branches to the appropriate qualification script." },
      { actor: "Caller", title: "Budget Range (Buyers)",           description: "ARIA collects pre-approval status, budget range, and financing type for buying leads." },
      { actor: "Caller", title: "Property Details (Sellers)",      description: "For sellers, ARIA captures address, property type, bedrooms, condition, and timeline." },
      { actor: "Caller", title: "Timeline + Location Preferences", description: "ARIA records urgency, preferred neighborhoods, must-haves, and deal-breakers." },
      { actor: "ARIA",   title: "Schedule Showing or Callback",    description: "ARIA books a property showing or schedules an agent callback based on lead score." },
      { actor: "System", title: "Lead Scored + Agent SMS Alert",   description: "Lead score calculated and agent receives an SMS with full lead summary immediately." },
    ],
    features: ["Lead qualification scoring", "Showing scheduler", "Agent alert SMS", "Neighborhood knowledge base", "Buyer vs. seller routing"],
    conversation: [
      { role: "caller", text: "I'm looking to buy a 3-bedroom home in the Riverside area, budget around $450K." },
      { role: "aria",   text: "Great — Riverside is a wonderful area. Are you pre-approved for financing, or would you like us to connect you with a lender?" },
      { role: "caller", text: "Already pre-approved." },
      { role: "aria",   text: "Perfect. I'll schedule a showing consultation with one of our agents. What's your timeline for moving?" },
    ],
    callerQuestions: ["How's the market in my area?", "What's my home worth?", "Can I see a property this weekend?", "Do you handle rentals too?", "What are your agent fees?", "How long does buying take?"],
  },
  {
    id: "EDUCATION",
    label: "Education",
    headline: "Answer every parent and student inquiry instantly",
    steps: [
      { actor: "ARIA",   title: "School Greeting",                  description: "ARIA answers with the institution name and a professional greeting." },
      { actor: "Caller", title: "Student, Parent, or Prospective?", description: "Caller identifies their role; ARIA tailors the conversation and available information." },
      { actor: "Caller", title: "Enrollment, Academics, or Admin?", description: "Caller specifies their need: enrollment queries, academic information, or administrative matters." },
      { actor: "ARIA",   title: "Answer or Route",                  description: "ARIA answers directly from the knowledge base or routes to the relevant department." },
      { actor: "ARIA",   title: "Schedule Campus Tour",             description: "For prospective students or parents, ARIA schedules a campus tour with date and time options." },
      { actor: "ARIA",   title: "Connect to Department",            description: "Complex queries are routed to admissions, financial aid, registrar, or faculty as appropriate." },
    ],
    features: ["Course catalog knowledge base", "Enrollment info at a glance", "Campus tour scheduling", "Fee structure queries", "Multi-department routing"],
    conversation: [
      { role: "caller", text: "Hi, I'm a parent interested in enrolling my daughter for the fall semester." },
      { role: "aria",   text: "Welcome! I'd love to help. Is she interested in a specific program, or would you like a general overview of our enrollment process?" },
      { role: "caller", text: "She's looking at the computer science program." },
      { role: "aria",   text: "Excellent choice. I can schedule a campus tour or connect you with the admissions team directly — which would you prefer?" },
    ],
    callerQuestions: ["What's the application deadline?", "What financial aid is available?", "Are there on-campus housing options?", "What programs do you offer?", "How large are class sizes?", "When does the semester start?"],
  },
  {
    id: "RETAIL",
    label: "Retail",
    headline: "Product availability and order status, around the clock",
    steps: [
      { actor: "ARIA",   title: "Store Greeting",                   description: "ARIA answers with the store name and offers assistance with availability, orders, or store info." },
      { actor: "Caller", title: "Product, Order, or Store Info?",   description: "Caller states their need; ARIA routes to product lookup, order tracking, or general info." },
      { actor: "ARIA",   title: "Product Search via KB",            description: "ARIA queries the inventory knowledge base for stock levels, variants, and pricing." },
      { actor: "ARIA",   title: "Reserve Item / 48-Hour Hold",      description: "If in stock, ARIA offers to place a 48-hour hold for the caller to pick up in-store." },
      { actor: "Caller", title: "Order Status via Order Number",    description: "Caller provides their order number; ARIA retrieves shipping and delivery status." },
      { actor: "ARIA",   title: "Return Policy + Hours + Location", description: "ARIA provides return window, process, store hours, and directions if requested." },
    ],
    features: ["Inventory knowledge base", "Order status lookup", "48-hour hold reservation", "Return policy delivery", "Store hours & directions"],
    conversation: [
      { role: "caller", text: "Do you have the Nike Air Max 270 in size 10 in stock?" },
      { role: "aria",   text: "Let me check for you — yes, we have the Air Max 270 in size 10 in black and white. Would you like me to hold a pair for 48 hours?" },
      { role: "caller", text: "Yes please, the black ones." },
      { role: "aria",   text: "Done! Your hold is set until Thursday at 3 PM. Just bring a photo ID when you come in." },
    ],
    callerQuestions: ["Do you price match?", "Can I return without a receipt?", "What are your holiday hours?", "Is this item on sale?", "Can I exchange a gift?", "Do you ship to my address?"],
  },
  {
    id: "HOSPITALITY",
    label: "Hospitality",
    headline: "Seamless guest experience from first call to checkout",
    steps: [
      { actor: "ARIA",   title: "Hotel Greeting",                    description: "ARIA answers with the property name and asks whether the caller is booking, modifying, or needs concierge help." },
      { actor: "Caller", title: "Booking, Reservation, or Concierge?", description: "Caller states intent; ARIA branches to the appropriate flow for their need." },
      { actor: "Caller", title: "Dates + Room Type + Guest Count",   description: "ARIA collects check-in date, check-out date, room type preference, and number of guests." },
      { actor: "ARIA",   title: "Rate Quote + Availability",         description: "ARIA checks live availability and quotes the nightly rate with any applicable promotions." },
      { actor: "ARIA",   title: "Hold or Confirm Booking",           description: "Caller can hold the room for 24 hours or confirm immediately with card details." },
      { actor: "ARIA",   title: "Amenities + Check-in + Parking",    description: "ARIA provides information on amenities, check-in time, valet or self-parking, and local attractions." },
    ],
    features: ["Room availability knowledge base", "Booking hold & confirm", "Concierge request intake", "Local recommendations", "Check-in & amenity info"],
    conversation: [
      { role: "caller", text: "I'd like to book a room for two nights, arriving Friday." },
      { role: "aria",   text: "Friday and Saturday — great timing. We have a Deluxe King at $189/night and a Suite at $279/night. Which interests you?" },
      { role: "caller", text: "The Deluxe King sounds good. Can I get an early check-in?" },
      { role: "aria",   text: "I'll note the early check-in request. Standard check-in is 3 PM, but I'll flag you for 1 PM availability at no charge." },
    ],
    callerQuestions: ["Is breakfast included?", "Do you have a pool?", "What's the cancellation policy?", "Is parking free?", "Can I bring my pet?", "What time is checkout?"],
  },
  {
    id: "AUTOMOTIVE",
    label: "Automotive",
    headline: "Service appointments and parts inquiries handled instantly",
    steps: [
      { actor: "ARIA",   title: "Dealership / Shop Greeting",        description: "ARIA answers with the business name and asks whether the caller needs service, parts, or sales." },
      { actor: "Caller", title: "Service, Parts, or Sales?",         description: "Caller states their need; ARIA routes to the appropriate flow and specialist queue." },
      { actor: "Caller", title: "Vehicle Year / Make / Model",       description: "ARIA collects vehicle details to ensure accurate service lookup and scheduling." },
      { actor: "Caller", title: "Issue Description or Service Type", description: "Caller describes the problem or requested service; ARIA categorizes it (oil change, repair, recall, etc.)." },
      { actor: "ARIA",   title: "Available Time Slots Presented",    description: "ARIA checks the service calendar and offers the next 3 available appointment windows." },
      { actor: "ARIA",   title: "Estimate Range if Available",       description: "If pricing is in the knowledge base, ARIA provides a cost estimate range before confirming." },
    ],
    features: ["Service scheduler", "Parts knowledge base", "Recall notice routing", "Loaner car availability check", "Estimate range delivery"],
    conversation: [
      { role: "caller", text: "My 2021 Honda Accord is making a grinding noise when I brake." },
      { role: "aria",   text: "That sounds like it could be worn brake pads. I can get you in for an inspection. Would tomorrow morning or Thursday afternoon work?" },
      { role: "caller", text: "Tomorrow morning works." },
      { role: "aria",   text: "You're booked for 9 AM tomorrow. Brake inspections typically run $0 — we'll quote any repairs after the look." },
    ],
    callerQuestions: ["How much is an oil change?", "Do you have loaner cars?", "Is my car under recall?", "How long will the service take?", "Do you work on European cars?", "Can I drop off after hours?"],
  },
  {
    id: "HOME_SERVICES",
    label: "Home Services",
    headline: "Capture service requests and dispatch efficiently",
    steps: [
      { actor: "ARIA",   title: "Company Greeting",                  description: "ARIA answers with the company name and immediately asks whether this is an emergency or scheduled service." },
      { actor: "Caller", title: "Emergency or Scheduled?",           description: "For emergencies, ARIA fast-tracks to dispatcher. For scheduled, ARIA enters the booking flow." },
      { actor: "Caller", title: "Service Type Identified",           description: "Caller specifies the service needed: plumbing, HVAC, electrical, roofing, pest control, etc." },
      { actor: "Caller", title: "Address + Issue Description",       description: "ARIA collects the service address and a description of the issue for technician prep." },
      { actor: "ARIA",   title: "Urgency Level Assessed",            description: "ARIA assesses urgency based on caller description and categorizes the job priority." },
      { actor: "ARIA",   title: "Schedule + Arrival Window",         description: "ARIA books the appointment and provides the estimated technician arrival window." },
    ],
    features: ["Emergency fast-track routing", "Service area validation", "Technician dispatch alert", "Estimate range for common jobs", "After-hours emergency line"],
    conversation: [
      { role: "caller", text: "My water heater burst — I have water everywhere." },
      { role: "aria",   text: "That's an emergency — I'm alerting our on-call plumber right now. Is your water shutoff valve accessible? I can walk you through shutting it off." },
      { role: "caller", text: "Yes, I can get to it." },
      { role: "aria",   text: "Great — shut it off now. Our technician will call you within 15 minutes and be there within the hour." },
    ],
    callerQuestions: ["Do you offer free estimates?", "Are you licensed and insured?", "How quickly can you come?", "Do you charge for emergency calls?", "What areas do you serve?", "Can you fix it today?"],
  },
  {
    id: "FINANCE",
    label: "Finance",
    headline: "Secure, compliant client intake and advisor scheduling",
    steps: [
      { actor: "ARIA",   title: "Firm Greeting + Compliance Notice",  description: "ARIA opens with the firm name and states required compliance disclosures before proceeding." },
      { actor: "Caller", title: "Identity Verification",              description: "Caller provides name and last 4 digits of their account or SSN for verification." },
      { actor: "Caller", title: "Account, Advisory, or Issue?",       description: "Caller states their purpose: account inquiry, advisory appointment, or problem resolution." },
      { actor: "ARIA",   title: "Route to Appropriate Advisor",       description: "ARIA routes to the correct advisor type: wealth management, tax, or client services." },
      { actor: "ARIA",   title: "Schedule Appointment",               description: "ARIA books an advisor appointment and confirms via email or SMS." },
      { actor: "ARIA",   title: "No Financial Advice Given",          description: "ARIA provides only procedural assistance — it explicitly does not give financial or investment advice." },
    ],
    features: ["Identity verification prompt", "Compliance disclaimer on every call", "Advisor type routing", "Appointment scheduling", "No financial advice given"],
    conversation: [
      { role: "caller", text: "I'd like to discuss moving some of my retirement funds." },
      { role: "aria",   text: "I can connect you with a wealth advisor for that. Quick verification first — can I get your name and the last 4 digits of your account number?" },
      { role: "caller", text: "Sure — it's David Marsh, account ending in 7742." },
      { role: "aria",   text: "Thank you, David. I'm scheduling you with an advisor. Tuesday at 2 PM or Wednesday at 10 AM — which works?" },
    ],
    callerQuestions: ["What are your advisory fees?", "Can I talk to my advisor today?", "How do I transfer funds?", "What's my account balance?", "Do you offer estate planning?", "Is my money FDIC insured?"],
  },
  {
    id: "STARTUP",
    label: "Startup",
    headline: "Qualify inbound leads and schedule demos automatically",
    steps: [
      { actor: "ARIA",   title: "Company Greeting",                  description: "ARIA answers with the startup name and a value-forward greeting." },
      { actor: "Caller", title: "Sales, Support, or Partnership?",   description: "Caller states intent; ARIA routes to the lead, support, or partner qualification flow." },
      { actor: "Caller", title: "Company Size + Use Case (Sales)",   description: "For sales leads, ARIA captures company size, industry, and primary use case." },
      { actor: "Caller", title: "Urgency + Current Solution (Support)", description: "For support, ARIA captures urgency level and current tool or plan being used." },
      { actor: "ARIA",   title: "Schedule Demo or Callback",         description: "ARIA books a product demo slot or schedules a callback with the appropriate team member." },
      { actor: "System", title: "Lead Captured to CRM via Webhook",  description: "All lead data is pushed to the CRM via webhook in real time for immediate follow-up." },
    ],
    features: ["Lead qualification scoring", "Demo scheduling", "Competitor differentiation knowledge base", "Support triage routing", "CRM webhook integration"],
    conversation: [
      { role: "caller", text: "I heard about your product and wanted to learn more for my team of about 50 people." },
      { role: "aria",   text: "Great — a 50-person team is a perfect fit. Are you currently using any voice automation tools, or starting fresh?" },
      { role: "caller", text: "We tried one other tool but it didn't work for our use case." },
      { role: "aria",   text: "I'd love to show you how we're different. Can I schedule a 30-minute demo this week?" },
    ],
    callerQuestions: ["How is your product different from competitors?", "Do you offer a free trial?", "What does onboarding look like?", "Can we integrate with our CRM?", "What's the pricing model?", "Do you have enterprise plans?"],
  },
  {
    id: "GOVERNMENT",
    label: "Government",
    headline: "Route citizens efficiently to the right department",
    steps: [
      { actor: "ARIA",   title: "Agency Greeting",                   description: "ARIA answers with the agency or department name in a clear, professional tone." },
      { actor: "Caller", title: "Service Request Identified",        description: "Caller describes what they need; ARIA listens and maps the request to the correct department." },
      { actor: "ARIA",   title: "Department Routing",                description: "ARIA routes the call to permits, licensing, utilities, social services, or other departments." },
      { actor: "ARIA",   title: "Service Hours + Location",          description: "ARIA provides the relevant department's hours, location, and contact information." },
      { actor: "ARIA",   title: "Form or Document Requirements",     description: "ARIA advises on required forms, documents, or identification needed for the service." },
      { actor: "ARIA",   title: "Callback Scheduling",               description: "For complex requests, ARIA schedules a callback with the appropriate department representative." },
    ],
    features: ["Multi-department routing", "Multi-language support", "Accessibility compliance", "Document requirements knowledge base", "Callback scheduling"],
    conversation: [
      { role: "caller", text: "I need to renew my business license — who do I talk to?" },
      { role: "aria",   text: "Business license renewals are handled by the City Clerk's office. They're open Monday through Friday, 8 AM to 5 PM. Would you like their direct number?" },
      { role: "caller", text: "Yes, and what documents do I need?" },
      { role: "aria",   text: "You'll need your current license, a completed renewal form, and payment. I can also schedule a callback if you'd prefer guidance over the phone." },
    ],
    callerQuestions: ["How do I pay a parking ticket?", "When is the DMV open?", "How do I apply for a permit?", "What's the number for utilities?", "Where do I vote?", "How do I report a pothole?"],
  },
  {
    id: "RELIGIOUS",
    label: "Religious Org",
    headline: "Connect your community with warmth and care",
    steps: [
      { actor: "ARIA",   title: "Warm Community Greeting",           description: "ARIA answers with warmth, using the organization's name and a welcoming tone." },
      { actor: "Caller", title: "Service Times, Events, or Pastoral Care?", description: "Caller states their need; ARIA offers service times, upcoming events, or pastoral assistance." },
      { actor: "ARIA",   title: "Upcoming Events Calendar",          description: "ARIA reads from the events knowledge base to share dates, times, and locations of upcoming events." },
      { actor: "ARIA",   title: "Pastoral Care Message Relay",       description: "For pastoral care requests, ARIA takes a compassionate message and relays it to the pastor." },
      { actor: "ARIA",   title: "Donation Information",              description: "ARIA provides giving options, online portals, and designated fund information." },
      { actor: "ARIA",   title: "Volunteer Opportunities",           description: "ARIA shares current volunteer needs and connects callers with the volunteer coordinator." },
    ],
    features: ["Events calendar knowledge base", "Multi-language support", "Pastoral message relay", "Community directory", "Giving & donation info"],
    conversation: [
      { role: "caller", text: "Hi, what time are Sunday services?" },
      { role: "aria",   text: "Sunday services are at 9 AM and 11 AM. We also have a contemporary service at 6 PM. Which would you like to attend?" },
      { role: "caller", text: "The 11 AM. Also, I'd like to speak with the pastor about a personal matter." },
      { role: "aria",   text: "Of course. I'll pass along your request to the pastor's office. Can I take your name and a brief message so they can reach out to you?" },
    ],
    callerQuestions: ["What time are services?", "Do you have children's programs?", "How do I give online?", "Is there a food pantry?", "When is the next holiday service?", "How do I join the choir?"],
  },
  {
    id: "TRANSPORT",
    label: "Transport",
    headline: "Bookings, tracking, and driver dispatch without delays",
    steps: [
      { actor: "ARIA",   title: "Service Greeting",                  description: "ARIA answers with the company name and asks whether the caller needs to book, track, or report an issue." },
      { actor: "Caller", title: "Book Ride, Track, or Issue?",       description: "Caller states their need; ARIA enters the booking, tracking, or issue resolution flow." },
      { actor: "Caller", title: "Pickup + Destination",              description: "For bookings, ARIA collects pickup address, destination, date, time, and passenger count." },
      { actor: "ARIA",   title: "Rate Estimate + ETA",               description: "ARIA provides a fare estimate and estimated pickup time based on current availability." },
      { actor: "System", title: "Booking Confirmed + SMS Sent",      description: "Booking is confirmed and a confirmation SMS is sent with driver details and tracking link." },
      { actor: "ARIA",   title: "Lost Item Report",                  description: "For lost item reports, ARIA collects ride details and initiates the lost item recovery form." },
    ],
    features: ["Real-time dispatch integration", "Ride tracking link via SMS", "Lost item reporting", "Driver communication relay", "Rate estimate at booking"],
    conversation: [
      { role: "caller", text: "I need a car from the Marriott downtown to JFK airport at 6 AM tomorrow." },
      { role: "aria",   text: "6 AM pickup from Marriott downtown to JFK — that's a great window to beat traffic. For one passenger, the fare is approximately $68–$85. Shall I confirm?" },
      { role: "caller", text: "Yes, please confirm." },
      { role: "aria",   text: "Done! Your driver will be there at 6 AM. You'll get a text tonight with their name and a tracking link in the morning." },
    ],
    callerQuestions: ["Can I book in advance?", "Do you have child seats?", "What's your cancellation policy?", "Can I pay in cash?", "Is there a wait fee?", "How do I find my lost item?"],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ACTOR_COLORS: Record<Step["actor"], { bg: string; color: string; label: string }> = {
  ARIA:   { bg: "#1447E6", color: "#fff",     label: "ARIA"   },
  Caller: { bg: "#E5E7EB", color: "#0D1117",  label: "Caller" },
  System: { bg: "#0EA5E9", color: "#fff",     label: "System" },
}

const ROW_TINTS: Record<Step["actor"], string> = {
  ARIA:   "rgba(20,71,230,0.04)",
  Caller: "#fff",
  System: "rgba(14,165,233,0.04)",
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StepRow({ step, index }: { step: Step; index: number }) {
  const ac = ACTOR_COLORS[step.actor]
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        padding: "14px 20px",
        background: ROW_TINTS[step.actor],
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Step number circle */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: ac.bg,
          color: ac.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {index + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{step.title}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: ac.bg === "#E5E7EB" ? C.muted : ac.bg,
              background: ac.bg === "#E5E7EB" ? C.light : `${ac.bg}18`,
              border: `1px solid ${ac.bg === "#E5E7EB" ? C.border : `${ac.bg}40`}`,
              borderRadius: 20,
              padding: "1px 8px",
              letterSpacing: "0.04em",
            }}
          >
            {ac.label}
          </span>
        </div>
        <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>{step.description}</p>
      </div>
    </div>
  )
}

function ChatBubble({ exchange }: { exchange: Exchange }) {
  const isAria = exchange.role === "aria"
  return (
    <div style={{ display: "flex", justifyContent: isAria ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "85%",
          background: isAria ? C.brand : "#fff",
          color: isAria ? "#fff" : C.text,
          border: isAria ? "none" : `1px solid ${C.border}`,
          borderRadius: isAria ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "10px 14px",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            marginBottom: 4,
            color: isAria ? "rgba(255,255,255,0.7)" : C.muted,
            letterSpacing: "0.05em",
          }}
        >
          {isAria ? "ARIA" : "Caller"}
        </div>
        {exchange.text}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WorkflowPage() {
  const [selected, setSelected] = useState("HEALTHCARE")

  const biz = BUSINESS_TYPES.find((b) => b.id === selected)!

  return (
    <div style={{ minHeight: "100vh", background: C.light }}>
      {/* TopBar */}
      <div
        style={{
          background: "#fff",
          borderBottom: `1px solid ${C.border}`,
          padding: "20px 32px 0",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>Call Workflows</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: "4px 0 0" }}>
            How ARIA handles calls for your business type
          </p>
        </div>

        {/* Business type selector */}
        <div
          className="overflow-x-auto"
          style={{
            display: "flex",
            gap: 8,
            paddingBottom: 0,
            paddingTop: 16,
            scrollbarWidth: "none",
          }}
        >
          {BUSINESS_TYPES.map((b) => {
            const active = b.id === selected
            return (
              <button
                key={b.id}
                onClick={() => setSelected(b.id)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: active ? `1px solid ${C.brand}` : `1px solid ${C.border}`,
                  background: active ? C.brand : "#fff",
                  color: active ? "#fff" : C.text,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  marginBottom: 16,
                }}
              >
                {b.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Workflow content */}
      <div style={{ padding: "24px 32px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Headline */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.brand,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {biz.label}
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: "4px 0 0" }}>
            {biz.headline}
          </h2>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

          {/* Left card — call flow steps */}
          <div
            style={{
              flex: "0 0 60%",
              background: "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${C.border}`,
                background: C.navy,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                How ARIA handles this call
              </span>
            </div>
            {biz.steps.map((step, i) => (
              <StepRow key={i} step={step} index={i} />
            ))}
          </div>

          {/* Right card — conversation + features */}
          <div style={{ flex: "0 0 calc(40% - 20px)", display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Conversation card */}
            <div
              style={{
                background: "#fff",
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${C.border}`,
                  background: C.navy,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                  Example Conversation
                </span>
              </div>
              <div
                style={{
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  background: C.light,
                }}
              >
                {biz.conversation.map((ex, i) => (
                  <ChatBubble key={i} exchange={ex} />
                ))}
              </div>
            </div>

            {/* Key features card */}
            <div
              style={{
                background: "#fff",
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${C.border}`,
                  background: C.navy,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Key Features</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {biz.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      background: "rgba(20,71,230,0.08)",
                      color: C.brand,
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      border: "1px solid rgba(20,71,230,0.15)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom — caller questions */}
        <div
          style={{
            marginTop: 20,
            background: "#fff",
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              borderBottom: `1px solid ${C.border}`,
              background: C.navy,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
              What callers typically ask
            </span>
          </div>
          <div
            className="overflow-x-auto"
            style={{
              padding: "14px 20px",
              display: "flex",
              gap: 8,
              scrollbarWidth: "none",
            }}
          >
            {biz.callerQuestions.map((q) => (
              <span
                key={q}
                style={{
                  flexShrink: 0,
                  background: C.light,
                  border: `1px solid ${C.border}`,
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 13,
                  color: C.text,
                  whiteSpace: "nowrap",
                }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
