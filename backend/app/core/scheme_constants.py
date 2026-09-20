"""
Government Schemes Constants & Verified Knowledge Dataset.
Curated strictly from official Government of India ministries, state agricultural portals, and myScheme.
"""

from typing import Dict, Any, List

SCHEME_CATEGORIES = [
    "Income Support",
    "Crop Insurance",
    "Credit",
    "Irrigation",
    "Soil Health",
    "Equipment",
    "Seeds",
    "Agriculture Infrastructure",
    "State Support",
    "Other",
]

SCHEME_STATES = [
    "All India (Central)",
    "Maharashtra",
    "Madhya Pradesh",
    "Punjab",
    "Haryana",
    "Karnataka",
    "Telangana",
    "Gujarat",
    "Rajasthan",
    "Uttar Pradesh",
]

VERIFIED_GOVERNMENT_SCHEMES: List[Dict[str, Any]] = [
    {
        "id": "pm-kisan",
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "short_description": "Central income support providing ₹6,000 per year in three equal 4-monthly installments directly into bank accounts of landholding farmer families.",
        "category": "Income Support",
        "state": "All India (Central)",
        "target_group": ["Small & Marginal Farmers", "All Landholding Farmer Families"],
        "eligibility": [
            "Farmer families with cultivable landholding in their names across rural & urban areas.",
            "Valid Aadhaar card linked with bank account.",
            "e-KYC verification completed on PM-KISAN portal.",
            "Institutional landholders and higher economic income tax payers are excluded."
        ],
        "benefits": [
            "Direct cash benefit of ₹6,000 per year paid in three equal installments of ₹2,000 each.",
            "100% centrally funded transfer directly to Aadhaar-seeded bank account (DBT)."
        ],
        "documents": [
            "Aadhaar Card",
            "Proof of Agricultural Land Ownership (7/12 Extract, Record of Rights / Khasra-Khatauni)",
            "Active Bank Account Passbook / Statement (Aadhaar linked)",
            "Mobile Number registered with Aadhaar"
        ],
        "application_method": "Online registration via official PM-KISAN portal (pmkisan.gov.in), PMKISAN Mobile App, or through Village Common Service Centres (CSC).",
        "official_url": "https://pmkisan.gov.in",
        "source_name": "Ministry of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "pmfby",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "short_description": "Comprehensive crop insurance scheme providing financial support and risk cover to farmers suffering crop loss/damage due to natural calamities.",
        "category": "Crop Insurance",
        "state": "All India (Central)",
        "target_group": ["All Farmers growing notified crops", "Loanee and Non-Loanee Farmers", "Sharecroppers & Tenant Farmers"],
        "eligibility": [
            "All farmers growing notified crops in notified insurance unit areas.",
            "Covers both loanee farmers (holding KCC/crop loan) and non-loanee farmers.",
            "Covers prevented sowing, standing crop damage (flood, drought, pests), post-harvest losses, and localized calamities."
        ],
        "benefits": [
            "Very low uniform farmer premium rate: 2% for all Kharif crops, 1.5% for all Rabi crops, and 5% for Annual Commercial/Horticultural crops.",
            "Balance actuarial premium is subsidized 50:50 by Central and State Governments.",
            "Full insured sum compensation for verified yield loss without upper capping."
        ],
        "documents": [
            "Aadhaar Card",
            "Land Record Document (7/12, Khatian/Patta) or Tenant Sowing Certificate",
            "Crop Sowing Certificate / Self-Declaration of Sowing",
            "Bank Account details / Passbook",
            "Mobile Number"
        ],
        "application_method": "Online through National Crop Insurance Portal (pmfby.gov.in), designated commercial banks/PACS, or Common Service Centres (CSC) before the seasonal cut-off date.",
        "official_url": "https://pmfby.gov.in",
        "source_name": "Ministry of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "kcc",
        "name": "Kisan Credit Card (KCC) Scheme",
        "short_description": "Provides adequate and timely institutional credit under a single window to farmers for cultivation expenses, post-harvest costs, and maintenance of farm assets.",
        "category": "Credit",
        "state": "All India (Central)",
        "target_group": ["Individual / Joint Farmers", "Tenant Farmers", "Oral Lessees", "SHGs of Farmers", "Animal Husbandry & Fishery Farmers"],
        "eligibility": [
            "All owner-cultivators and registered tenant farmers engaged in agricultural or allied activities.",
            "Minimum age of 18 years and maximum age of 75 years (with co-borrower if above 60).",
            "Satisfactory credit history and operational agricultural landholding."
        ],
        "benefits": [
            "Flexible credit limit based on landholding and cropping pattern with 5-year validity.",
            "Effective interest rate as low as 4% per annum (7% base rate minus 3% prompt repayment incentive).",
            "No collateral required for loans up to ₹1.60 Lakh (extended up to ₹3.00 Lakh with prompt repayment history).",
            "Revolving cash credit facility with ATM-enabled RuPay debit card."
        ],
        "documents": [
            "Duly completed KCC Application Form",
            "Identity Proof (Aadhaar / Voter ID / PAN)",
            "Address Proof",
            "Land Record Documents (Record of Rights, 7/12 extract) certified by revenue authorities",
            "Cropping pattern declaration"
        ],
        "application_method": "Apply at nearest Commercial Bank branch, Regional Rural Bank (RRB), Cooperative Bank, or online through public sector bank portals and PM-KISAN portal link.",
        "official_url": "https://myscheme.gov.in/schemes/kcc",
        "source_name": "Ministry of Agriculture & Farmers Welfare / Reserve Bank of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "pm-kusum",
        "name": "PM-KUSUM Solar Agricultural Pump Scheme",
        "short_description": "Subsidies for installing standalone solar-powered agricultural pumps and solarizing existing grid-connected agriculture pumps to ensure reliable daytime irrigation.",
        "category": "Equipment",
        "state": "All India (Central)",
        "target_group": ["Individual Farmers", "Water User Associations", "Farmer Producer Organisations (FPOs)", "Primary Agricultural Credit Societies"],
        "eligibility": [
            "Farmers possessing cultivable land with valid water source (well/borewell) lacking grid electricity connection (Component B).",
            "Farmers with existing grid-connected electric agricultural pumps (Component C).",
            "Individual pump capacities up to 7.5 HP supported under standard subsidy."
        ],
        "benefits": [
            "Central Financial Assistance (CFA) up to 30% of benchmark cost.",
            "State Government subsidy up to 30% of benchmark cost.",
            "Farmer contributes only 10%–40% of total system cost (bank loans available for remaining portion).",
            "Zero electricity bills for irrigation and reliable daytime power supply."
        ],
        "documents": [
            "Aadhaar Card",
            "Land Ownership Document (7/12, Khasra, Khatauni)",
            "Bank Account Passbook",
            "Electricity Connection Bill / NOC (for grid solarization)",
            "Passport size photograph"
        ],
        "application_method": "Apply through State Renewable Energy Development Agencies (e.g. MEDA in Maharashtra, MPUVNL in MP) or state agricultural solar portals.",
        "official_url": "https://pmkusum.mnre.gov.in",
        "source_name": "Ministry of New and Renewable Energy (MNRE), Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "soil-health-card",
        "name": "Soil Health Card (SHC) Scheme",
        "short_description": "Promotes balanced nutrient application by providing farmers with periodic soil test reports detailing 12 critical chemical and physical parameters with crop fertilizer recommendations.",
        "category": "Soil Health",
        "state": "All India (Central)",
        "target_group": ["All Farmers across India"],
        "eligibility": [
            "All agricultural landholders in participating state districts.",
            "Soil samples collected systematically on a grid cycle (2.5 ha for irrigated, 10 ha for rainfed)."
        ],
        "benefits": [
            "Free / highly subsidized laboratory testing for 12 soil parameters (pH, EC, Organic Carbon, N, P, K, S, Zn, Fe, Cu, Mn, B).",
            "Customized soil fertility rating and crop-specific chemical/organic fertilizer recommendations.",
            "Helps reduce input costs by avoiding excessive, wasteful urea and DAP application."
        ],
        "documents": [
            "Aadhaar Card",
            "Land parcel survey number (Khasra / Gut number)",
            "Mobile number"
        ],
        "application_method": "Soil sample collection coordinated by local Village Agriculture Assistant / Krishi Sahayak or sample submission at District Soil Testing Laboratory.",
        "official_url": "https://soilhealth.dac.gov.in",
        "source_name": "Department of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "pmksy-per-drop-more-crop",
        "name": "PMKSY — Per Drop More Crop (Micro-Irrigation)",
        "short_description": "Promotes efficient water use through drip and sprinkler irrigation technologies, enhancing crop productivity and water use efficiency at farm level.",
        "category": "Irrigation",
        "state": "All India (Central)",
        "target_group": ["Small & Marginal Farmers", "General Farmers", "Women Farmers"],
        "eligibility": [
            "Farmers having assured perennial water source and suitable cultivable land.",
            "Small and marginal farmers receive higher financial assistance rates (up to 55%)."
        ],
        "benefits": [
            "55% subsidy on indicative system cost for Small & Marginal farmers.",
            "45% subsidy on indicative system cost for Other category farmers.",
            "40%–50% water savings, reduced weed infestation, and 20%–30% fertilizer saving through fertigation."
        ],
        "documents": [
            "Aadhaar Card",
            "Land Title / 7/12 Extract with water source mention",
            "Bank Passbook copy",
            "Soil & Water Testing Report (where applicable)",
            "Electricity bill / Solar pump certificate"
        ],
        "application_method": "Apply online through State Agriculture / Horticulture Department portals (e.g. MahaDBT in Maharashtra, e-Uparjan in MP) or District Horticulture Officer.",
        "official_url": "https://pmksy.gov.in",
        "source_name": "Ministry of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "namo-shetkari-yojana",
        "name": "Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra)",
        "short_description": "Government of Maharashtra direct income support scheme providing an additional ₹6,000 per year over and above the Central PM-KISAN scheme.",
        "category": "State Support",
        "state": "Maharashtra",
        "target_group": ["Eligible PM-KISAN beneficiaries in Maharashtra"],
        "eligibility": [
            "Farmers residing and holding agricultural land in Maharashtra.",
            "Must be an approved and active beneficiary of the Central PM-KISAN scheme.",
            "Aadhaar-seeded active bank account in Maharashtra."
        ],
        "benefits": [
            "Additional annual financial benefit of ₹6,000 paid in 3 installments of ₹2,000 each.",
            "Combined with PM-KISAN, eligible farmers in Maharashtra receive total ₹12,000 per year."
        ],
        "documents": [
            "Aadhaar Card",
            "PM-KISAN Registration ID",
            "Maharashtra Land Records (7/12 and 8A extracts)",
            "Aadhaar-linked Bank Account details"
        ],
        "application_method": "Directly integrated with the PM-KISAN database; eligible verified farmers in Maharashtra are enrolled automatically via state portal.",
        "official_url": "https://krishi.maharashtra.gov.in",
        "source_name": "Department of Agriculture, Government of Maharashtra",
        "last_verified": "2026-09-01"
    },
    {
        "id": "smam-agri-mechanization",
        "name": "Sub-Mission on Agricultural Mechanization (SMAM)",
        "short_description": "Financial assistance for purchasing modern agricultural machinery (tractors, power tillers, seed drills, harvesters) and establishing Custom Hiring Centres (CHCs).",
        "category": "Equipment",
        "state": "All India (Central)",
        "target_group": ["Small & Marginal Farmers", "Women Farmers", "FPOs", "Rural Entrepreneurs"],
        "eligibility": [
            "Farmers with cultivable land who have not availed machinery subsidy for the same equipment in previous 5–7 years.",
            "Special preference and higher subsidy rates for SC/ST and Women farmers."
        ],
        "benefits": [
            "40% to 50% subsidy on purchase price of approved agricultural machinery.",
            "Up to 80% project cost assistance for establishing Custom Hiring Centres (CHCs) by FPOs and village cooperatives."
        ],
        "documents": [
            "Aadhaar Card",
            "Land Ownership Document (7/12 / Khasra)",
            "Bank Passbook copy",
            "Quotation from authorized agricultural machinery dealer",
            "Caste Certificate (for SC/ST category benefit)"
        ],
        "application_method": "Apply online through National Mechanization Portal (agrimachinery.nic.in) or state single window portal (MahaDBT / e-Krishi).",
        "official_url": "https://agrimachinery.nic.in",
        "source_name": "Department of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "pkvy-organic-farming",
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "short_description": "Promotes organic farming through a cluster-based approach and Participatory Guarantee System (PGS) certification, supporting chemical-free sustainable agriculture.",
        "category": "Seeds",
        "state": "All India (Central)",
        "target_group": ["Farmer Groups & Clusters", "Individual Organic Cultivators"],
        "eligibility": [
            "Farmers willing to form clusters of 20 ha (50 or more farmers) for organic cultivation.",
            "Commitment to adopt organic crop management practices and PGS-India certification."
        ],
        "benefits": [
            "Financial assistance of ₹50,000 per hectare for 3-year transition period.",
            "₹31,000/ha provided directly for organic inputs (bio-fertilizers, vermicompost, bio-pesticides, botanical extracts).",
            "Free PGS-India organic certification and marketing/packaging assistance."
        ],
        "documents": [
            "Aadhaar Card",
            "Land Ownership Document (Khasra / 7/12)",
            "Bank Account Passbook",
            "Cluster Group Resolution & Membership Declaration"
        ],
        "application_method": "Form or join a local organic farming cluster through District Agricultural Officer / Regional Council under PGS-India portal.",
        "official_url": "https://pgsindia-ncof.gov.in",
        "source_name": "Ministry of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    },
    {
        "id": "agri-infra-fund",
        "name": "Agriculture Infrastructure Fund (AIF)",
        "short_description": "Medium to long-term debt financing facility for investment in viable post-harvest management infrastructure and community farming assets.",
        "category": "Agriculture Infrastructure",
        "state": "All India (Central)",
        "target_group": ["Farmers", "FPOs", "Primary Agricultural Credit Societies (PACS)", "Agri-Entrepreneurs", "Start-ups"],
        "eligibility": [
            "Farmers, FPOs, and cooperatives creating post-harvest infrastructure (warehouses, cold chains, silos, sorting/grading units, drying yards).",
            "Projects must demonstrate technical and economic viability."
        ],
        "benefits": [
            "3% per annum interest subvention on loans up to ₹2.00 Crore for a maximum tenure of 7 years.",
            "Credit guarantee coverage under CGTMSE for loans up to ₹2.00 Crore with fees paid by the Government."
        ],
        "documents": [
            "Detailed Project Report (DPR)",
            "Land Title / Lease Agreement (minimum 10 years)",
            "Aadhaar & PAN Card of applicant/promoters",
            "Bank account statement & KYC documents",
            "Local municipal / Panchayat NOC"
        ],
        "application_method": "Apply online through the AIF portal (agriinfra.dac.gov.in) with project details and select preferred lending institution.",
        "official_url": "https://agriinfra.dac.gov.in",
        "source_name": "Department of Agriculture & Farmers Welfare, Government of India",
        "last_verified": "2026-09-01"
    }
]
