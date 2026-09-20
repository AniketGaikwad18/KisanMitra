"""
Crop Guide Knowledge Constants.
Structured agronomic profiles for major Indian crops curated from ICAR, IARI,
and State Agricultural Universities (SAUs).
"""

from typing import Dict, Any, List

SUPPORTED_CROP_PROFILES: List[Dict[str, Any]] = [
    {
        "id": "soybean",
        "name": "Soybean",
        "scientific_name": "Glycine max",
        "season": "Kharif (June – October)",
        "duration_days": "90 – 110 days",
        "overview": "Soybean is a premier oilseed and protein legume crop widely grown in Madhya Pradesh, Maharashtra, and Rajasthan. As a nitrogen-fixing legume, it enriches soil fertility while serving as a key cash crop in rainfed and semi-irrigated agro-ecosystems.",
        "soil": {
            "preferred_ph": "6.0 – 7.5",
            "soil_type": ["Well-drained fertile loam", "Clay loam", "Black cotton soil (Vertisols)"],
            "drainage": "Excellent drainage required; highly susceptible to waterlogging during early seedling emergence and pod development."
        },
        "sowing": {
            "general_window": "June 15 – July 10 (with onset of South-West monsoon when topsoil has accumulated 75–100 mm rainfall)",
            "seed_rate": "65 – 75 kg/ha (broadcasting discouraged; line sowing recommended)",
            "spacing": "45 cm row-to-row × 5–7 cm plant-to-plant",
            "depth": "3 – 4 cm (sowing deeper than 5 cm drastically reduces germination)",
            "notes": [
                "Treat seed with Rhizobium japonicum & PSB culture @ 5g/kg seed for nodulation.",
                "Fungicidal seed treatment with Trichoderma viride (5g/kg) or Thiram+Carbendazim (2g/kg)."
            ]
        },
        "water": {
            "requirements": "450 – 650 mm across the crop lifecycle",
            "critical_stages": [
                "Germination / Early Vegetative (Days 15–20)",
                "Flower Initiation (Days 35–45)",
                "Pod Filling & Seed Development (Days 60–75)"
            ],
            "irrigation_methods": ["Broad Bed Furrow (BBF) irrigation", "Ridge and furrow", "Sprinkler in undulating terrain"],
            "notes": [
                "Ensure BBF or furrow layout to safely drain excess monsoon runoff.",
                "Moisture stress at pod filling causes significant yield decline."
            ]
        },
        "nutrition": {
            "general_considerations": [
                "Basal application of NPK @ 20:60:40 kg/ha + 20 kg Sulphur/ha.",
                "Legumes fix atmospheric nitrogen, so avoid excessive top-dressing of urea.",
                "Foliar spray of 19:19:19 (1%) at flowering and 0:52:34 (1%) at pod filling improves seed weight."
            ],
            "organic_practices": [
                "Apply 5 tonnes FYM or 2 tonnes Vermicompost/ha before final harrowing.",
                "Incorporate bio-fertilizers (Rhizobium + PSB) during seed priming."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Stem Fly (Melanagromyza sojae)",
                "type": "pest",
                "symptoms": "Larvae tunnel through the central stem, resulting in wilting, zig-zag reddish tunnels, and stunted branching.",
                "management": "Early sowing, seed treatment with Imidacloprid/Thiamethoxam, and destruction of crop stubble."
            },
            {
                "name": "Spodoptera / Semilooper Caterpillars",
                "type": "pest",
                "symptoms": "Larvae defoliate foliage voraciously, leaving only leaf skeletons; attack pods in late stages.",
                "management": "Install pheromone traps (5/acre), apply neem oil (5ml/L), or spray approved bio-rational insecticides if threshold exceeds 2–3 larvae/meter row."
            },
            {
                "name": "Yellow Mosaic Virus (YMV)",
                "type": "disease",
                "symptoms": "Bright yellow patches interspersed with green on leaves, stunted plant height, and unfilled pods.",
                "management": "Vector (Whitefly) management using yellow sticky traps (10/acre) and growing YMV-resistant cultivars (e.g. JS 20-34, JS 20-69)."
            }
        ],
        "prevention": [
            "Practice minimum 2-year crop rotation with gram, wheat, or mustard; avoid continuous mono-cropping.",
            "Maintain clean field borders to prevent alternate host buildup for whitefly and stem fly.",
            "Use certified disease-free seeds with minimum 70% tested germination rate."
        ],
        "harvest": {
            "maturity_signs": "Leaves turn yellow, dry, and drop; pods turn brownish-grey; seeds rattle inside pods when shaken.",
            "general_guidance": "Harvest when seed moisture drops to 14%–15%. Avoid harvesting in hot afternoon hours to reduce shatter loss.",
            "post_harvest": "Dry threshed grain to 10%–12% moisture before bagging in clean jute bags on raised wooden pallets."
        },
        "sources": [
            "ICAR — Indian Institute of Soybean Research (IISR), Indore",
            "Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri",
            "ICAR — Directorate of Agriculture & Farmers Welfare, New Delhi"
        ],
        "advisory_notice": "Crop guidance is based on standard ICAR Indian agronomy protocols. Local sowing dates should align with onset of monsoon showers and regional district advisories."
    },
    {
        "id": "wheat",
        "name": "Wheat",
        "scientific_name": "Triticum aestivum",
        "season": "Rabi (November – April)",
        "duration_days": "115 – 135 days",
        "overview": "Wheat is India's principal winter staple food crop, providing caloric security across North and Central India. Thrives in cool growing conditions with bright sunshine during grain development.",
        "soil": {
            "preferred_ph": "6.0 – 7.5",
            "soil_type": ["Well-drained fertile loam", "Clay loam", "Alluvial soils of Indo-Gangetic plains"],
            "drainage": "Good surface drainage essential; sensitive to water stagnation during initial 30 days."
        },
        "sowing": {
            "general_window": "November 1 – November 25 (timely sown); December 1 – December 15 (late sown)",
            "seed_rate": "100 kg/ha for timely sown; 125 kg/ha for late sown",
            "spacing": "20–22.5 cm row-to-row × continuous drilling",
            "depth": "4 – 5 cm into moist soil layer",
            "notes": [
                "Seed treatment with Carboxin/Thiram (2g/kg) and Azotobacter + PSB biofertilizers.",
                "Zero-tillage / Happy Seeder sowing recommended in paddy residue fields."
            ]
        },
        "water": {
            "requirements": "400 – 500 mm across 4–6 irrigations",
            "critical_stages": [
                "Crown Root Initiation (CRI) at 20–25 days (Most critical)",
                "Tillering stage (Days 40–45)",
                "Jointing / Boot stage (Days 60–65)",
                "Flowering / Heading (Days 80–85)",
                "Milking & Dough stage (Days 100–110)"
            ],
            "irrigation_methods": ["Border strip irrigation", "Check basin", "Sprinkler irrigation"],
            "notes": ["Never miss the Crown Root Initiation (CRI) irrigation; delay of 1 week causes 15%–20% yield loss."]
        },
        "nutrition": {
            "general_considerations": [
                "Recommended NPK dose: 120:60:40 kg/ha for timely irrigated wheat.",
                "Apply entire P, K, and 1/3rd Nitrogen as basal dose at sowing.",
                "Top-dress remaining Nitrogen in two equal splits: at first irrigation (CRI) and second irrigation."
            ],
            "organic_practices": [
                "Apply 10 tonnes FYM/ha during field preparation.",
                "Green manuring with Dhaincha (Sesbania) in preceding Kharif season."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Yellow / Stripe Rust (Puccinia striiformis)",
                "type": "fungal",
                "symptoms": "Linear yellow stripes of pustules along leaf veins; leaves wither under severe infestation.",
                "management": "Grow rust-resistant cultivars (HD 2967, DBW 187, DBW 303); spray Propiconazole @ 1ml/L at first appearance."
            },
            {
                "name": "Loose Smut (Ustilago tritici)",
                "type": "fungal",
                "symptoms": "Earheads emerge filled with black powdery spore masses instead of grains.",
                "management": "Solar heat seed treatment and systemic seed dressing with Carboxin."
            },
            {
                "name": "Aphids (Rhopalosiphum padi)",
                "type": "pest",
                "symptoms": "Colonies cluster on ears and leaves, sucking sap during milking stage causing shriveled grains.",
                "management": "Conserve coccinellid ladybird beetles; spray Neem-based formulation (3ml/L) if aphid count exceeds 10–15/tiller."
            }
        ],
        "prevention": [
            "Avoid excessive nitrogen doses which predispose the crop to lodging and rust infections.",
            "Use certified rust-resistant wheat varieties recommended for the agro-climatic zone."
        ],
        "harvest": {
            "maturity_signs": "Straw turns dry golden-yellow; grains become hard and break with crisp snap.",
            "general_guidance": "Harvest when grain moisture drops below 14% to prevent threshing damage.",
            "post_harvest": "Sun-dry grain to 10%–12% moisture before storage in pest-proof bins."
        },
        "sources": [
            "ICAR — Indian Institute of Wheat and Barley Research (IIWBR), Karnal",
            "Punjab Agricultural University (PAU), Ludhiana",
            "Indian Agricultural Research Institute (IARI), New Delhi"
        ],
        "advisory_notice": "Advisory timings are indicative for North and Central Indian plains. Consult state agricultural university packages for localized sowing windows."
    },
    {
        "id": "rice",
        "name": "Rice (Paddy)",
        "scientific_name": "Oryza sativa",
        "season": "Kharif / Rabi / Boro",
        "duration_days": "120 – 150 days",
        "overview": "Rice is India's leading staple foodgrain, occupying the largest cropped area. Cultivated in diverse ecosystems from rainfed uplands and deepwater lowlands to irrigated plains.",
        "soil": {
            "preferred_ph": "5.5 – 7.0 (tolerant to slight acidity)",
            "soil_type": ["Clayey loam", "Silty clay", "Alluvial heavy soils with high water retention"],
            "drainage": "Requires puddled impermeable subsoil layer to retain standing water during active vegetative growth."
        },
        "sowing": {
            "general_window": "Nursery sowing: May 25 – June 20; Transplanting: June 20 – July 15 (Kharif)",
            "seed_rate": "30 – 35 kg/ha for conventional transplanting; 15–20 kg/ha for DSR (Direct Seeded Rice)",
            "spacing": "20 cm row-to-row × 15 cm plant-to-plant (2–3 seedlings per hill)",
            "depth": "2 – 3 cm shallow transplanting into puddled mud",
            "notes": [
                "Seed treatment with Carbendazim (2g/kg) + Azospirillum & PSB culture.",
                "Direct Seeded Rice (DSR) using tar-wattar technique saves 25%–30% irrigation water."
            ]
        },
        "water": {
            "requirements": "1100 – 1400 mm across the season",
            "critical_stages": [
                "Tillering stage (Days 20–35)",
                "Panicle Initiation (Days 50–65)",
                "Flowering / Anthesis (Days 75–90)",
                "Grain filling / Milking stage (Days 95–110)"
            ],
            "irrigation_methods": ["Alternate Wetting and Drying (AWD)", "Continuous shallow submergence (2–5 cm)"],
            "notes": ["Implement Alternate Wetting and Drying (AWD) using field water tubes to save water without yield loss."]
        },
        "nutrition": {
            "general_considerations": [
                "Recommended NPK: 100–120:50–60:40–50 kg/ha + 25 kg Zinc Sulphate/ha.",
                "Apply entire P, K, and Zinc as basal; apply Nitrogen in 3 splits (basal, active tillering, panicle initiation)."
            ],
            "organic_practices": [
                "Incorporate green manure (Dhaincha/Sunnhemp) in puddled soil 15 days before transplanting.",
                "Apply Azolla bio-fertilizer @ 1 tonne/ha in standing water."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Rice Blast (Magnaporthe oryzae)",
                "type": "fungal",
                "symptoms": "Spindle-shaped lesions with grey centres on leaves; rotting of panicle neck (neck blast).",
                "management": "Avoid excessive nitrogen top-dressing; spray Tricyclazole @ 0.6g/L at first appearance."
            },
            {
                "name": "Brown Plant Hopper (BPH - Nilaparvata lugens)",
                "type": "pest",
                "symptoms": "Sap sucking at stem base causing circular patches of dry crop ('hopper burn').",
                "management": "Provide alleyways (30 cm gap every 2–3 m) for aeration; drain water temporarily from field."
            },
            {
                "name": "Yellow Stem Borer (Scirpophaga incertulas)",
                "type": "pest",
                "symptoms": "'Dead heart' in vegetative tillers; 'white ear' panicles devoid of grain during heading.",
                "management": "Install pheromone traps (8/acre); apply Trichogramma egg parasitoids @ 1 lakh/ha."
            }
        ],
        "prevention": [
            "Maintain balanced nitrogen-potash ratio to prevent sheath blight and blast outbreaks.",
            "Drain field completely 10–12 days prior to harvest to promote uniform ripening."
        ],
        "harvest": {
            "maturity_signs": "80%–85% of grains in the panicle turn golden yellow; straw remains partially green.",
            "general_guidance": "Harvest promptly to prevent grain shattering and lodging.",
            "post_harvest": "Dry paddy to 13%–14% moisture before milling or long-term grain storage."
        },
        "sources": [
            "ICAR — National Rice Research Institute (NRRI), Cuttack",
            "Indian Institute of Rice Research (IIRR), Hyderabad",
            "Directorate of Agriculture, Government of West Bengal / Andhra Pradesh / Punjab"
        ],
        "advisory_notice": "Agronomic parameters vary between transplanted wetland rice and direct-seeded aerobic rice systems."
    },
    {
        "id": "cotton",
        "name": "Cotton (Kapas)",
        "scientific_name": "Gossypium hirsutum",
        "season": "Kharif (May – January)",
        "duration_days": "150 – 180 days",
        "overview": "Known as 'White Gold', cotton is India's principal commercial fibre cash crop. Grown extensively in Maharashtra (Vidarbha/Marathwada), Gujarat, Telangana, and Punjab.",
        "soil": {
            "preferred_ph": "6.5 – 8.0 (fairly salt-tolerant)",
            "soil_type": ["Deep black cotton soils (Vertisols)", "Alluvial deep loams", "Well-drained red loams"],
            "drainage": "Must have good internal drainage; highly vulnerable to root asphyxiation during waterlogging."
        },
        "sowing": {
            "general_window": "May 15 – June 15 (North India / Irrigated); June 15 – July 10 (Central/South Rainfed)",
            "seed_rate": "1.5 – 2.0 packets (450g each) / acre for Bt hybrid cotton",
            "spacing": "90–120 cm row-to-row × 45–60 cm plant-to-plant (or High Density Planting HDPS 60×15 cm)",
            "depth": "4 – 5 cm in moist seedbed",
            "notes": [
                "Delinted seeds treated with Imidacloprid (5g/kg) and Trichoderma (10g/kg).",
                "Maintain refuge border rows around Bt cotton to prevent pest resistance."
            ]
        },
        "water": {
            "requirements": "650 – 900 mm across lifecycle",
            "critical_stages": [
                "Square (Bud) Formation (Days 45–60)",
                "Peak Flowering (Days 70–90)",
                "Boll Development & Maturation (Days 90–120)"
            ],
            "irrigation_methods": ["Drip irrigation (highly recommended)", "Alternate furrow irrigation"],
            "notes": ["Drip fertigation saves 40% water and boosts boll retention significantly."]
        },
        "nutrition": {
            "general_considerations": [
                "Recommended NPK: 100–120:50:50 kg/ha for hybrid Bt cotton.",
                "Apply Nitrogen in 3 splits (20% basal, 40% square formation, 40% peak flowering).",
                "Foliar spray of 2% Potassium Nitrate (13:0:45) or 1% Magnesium Sulphate prevents leaf reddening."
            ],
            "organic_practices": [
                "Apply 10 tonnes FYM or 2.5 tonnes Vermicompost/ha before sowing.",
                "Spray fermented cow urine / Jeevamrutha at 15-day intervals."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Pink Bollworm (Pectinophora gossypiella)",
                "type": "pest",
                "symptoms": "Rosetted flowers; larvae bore into green bolls, feeding on seeds and staining lint.",
                "management": "Install pheromone traps (8/acre) for monitoring; release Trichogrammatoidea parasitoids; terminate crop by January."
            },
            {
                "name": "Sucking Pests (Aphids, Jassids, Thrips, Whitefly)",
                "type": "pest",
                "symptoms": "Leaf curling, yellowing of margins ('hopper burn'), honeydew secretion and sooty mould.",
                "management": "Yellow & blue sticky traps (10/acre); seed treatment with systemic insecticides; spray neem oil (5ml/L)."
            },
            {
                "name": "Bacterial Blight / Angular Leaf Spot",
                "type": "disease",
                "symptoms": "Water-soaked angular spots on leaves that turn brown/black; black lesions on stems ('black arm').",
                "management": "Seed treatment with Streptocycline (1g/10kg seed) + Copper Oxychloride."
            }
        ],
        "prevention": [
            "Strictly avoid extending cotton crop beyond 180 days (no ratoon cotton) to break pink bollworm life cycle.",
            "Destroy crop residues and shred stalks immediately after final picking."
        ],
        "harvest": {
            "maturity_signs": "Bolls burst open fully exposing clean white fluffy seed-cotton (kapas).",
            "general_guidance": "Pick cotton in dry morning hours after dew evaporates in 3–4 pickings.",
            "post_harvest": "Store harvested kapas in moisture-free, covered godowns; avoid mixing stained/yellowed lint."
        },
        "sources": [
            "ICAR — Central Institute for Cotton Research (CICR), Nagpur",
            "Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri",
            "Punjab Agricultural University (PAU), Ludhiana"
        ],
        "advisory_notice": "Pest management must follow integrated pest management (IPM) guidelines. Always consult regional CICR weekly pest advisories."
    },
    {
        "id": "maize",
        "name": "Maize (Corn)",
        "scientific_name": "Zea mays",
        "season": "Kharif / Rabi / Spring",
        "duration_days": "95 – 115 days",
        "overview": "Known as the 'Queen of Cereals', maize is a high-yield potential C4 crop used for food, livestock poultry feed, and industrial starch/ethanol production.",
        "soil": {
            "preferred_ph": "6.0 – 7.5",
            "soil_type": ["Well-drained deep fertile loam", "Silt loam", "Red and black soils with good permeability"],
            "drainage": "Extremely sensitive to both waterlogging and drought; requires well-structured aeration."
        },
        "sowing": {
            "general_window": "Kharif: June 15 – July 15; Rabi: October 15 – November 15",
            "seed_rate": "18 – 20 kg/ha for hybrid grain maize; 25 kg/ha for fodder/sweet corn",
            "spacing": "60 cm row-to-row × 20 cm plant-to-plant",
            "depth": "4 – 5 cm",
            "notes": [
                "Seed treatment with Cyantraniliprole / Thiamethoxam for protection against Fall Armyworm (FAW).",
                "Seed inoculation with Azotobacter + PSB biofertilizers."
            ]
        },
        "water": {
            "requirements": "500 – 700 mm across season",
            "critical_stages": [
                "Early vegetative / Knee-high stage (Days 25–35)",
                "Tasseling stage (Days 50–55)",
                "Silking & Pollination (Days 60–65 - Extremely critical)",
                "Grain filling / Dough stage (Days 75–85)"
            ],
            "irrigation_methods": ["Ridge and furrow", "Drip irrigation"],
            "notes": ["Moisture stress during tasseling and silking causes incomplete pollination and barren cobs."]
        },
        "nutrition": {
            "general_considerations": [
                "Heavy feeder crop; NPK recommendation: 120–150:60:40 kg/ha + 25 kg Zinc Sulphate/ha.",
                "Apply Nitrogen in 3 splits: 25% at sowing, 50% at knee-high stage (V6), 25% at tasseling (VT)."
            ],
            "organic_practices": [
                "Apply 10 tonnes FYM/ha during land preparation.",
                "Intercropping with pulses (cowpea, green gram) enhances soil organic matter."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Fall Armyworm (FAW - Spodoptera frugiperda)",
                "type": "pest",
                "symptoms": "Pin-hole feeding on leaves in whorl; severe ragged defoliation and heavy sawdust-like frass inside whorls.",
                "management": "Whorl application of sand-lime mixture (9:1) or biological control with Metarhizium anisopliae; spray approved insecticides if >10% plants damaged."
            },
            {
                "name": "Stem Borer (Chilo partellus)",
                "type": "pest",
                "symptoms": "Shot holes on leaves; 'dead heart' in young seedlings.",
                "management": "Intercropping with cowpea (2:1 ratio); release of Trichogramma chilonis parasitoids."
            },
            {
                "name": "Turcicum Leaf Blight (Exserohilum turcicum)",
                "type": "fungal",
                "symptoms": "Long, elliptical grayish-green or tan lesions on leaves that coalesce to dry the canopy.",
                "management": "Grow resistant hybrid cultivars; spray Mancozeb (2.5g/L) at first symptom onset."
            }
        ],
        "prevention": [
            "Monitor fields regularly from day 10 for early detection of Fall Armyworm egg masses.",
            "Avoid staggered plantings in neighboring plots to prevent continuous FAW multiplication."
        ],
        "harvest": {
            "maturity_signs": "Cob husk turns dry papery brown; grain moisture falls below 20%; black layer forms at grain base.",
            "general_guidance": "Harvest mature cobs on dry days; de-husk and sun-dry cobs thoroughly.",
            "post_harvest": "Shell cobs at 14% moisture and dry shelled grain to 12% moisture before storage."
        },
        "sources": [
            "ICAR — Indian Institute of Maize Research (IIMR), Ludhiana",
            "Indian Agricultural Research Institute (IARI), New Delhi",
            "University of Agricultural Sciences (UAS), Dharwad"
        ],
        "advisory_notice": "High fertility responsiveness requires timely split-nitrogen application. Follow FAW management protocols."
    },
    {
        "id": "sugarcane",
        "name": "Sugarcane",
        "scientific_name": "Saccharum officinarum",
        "season": "Annual / Perennial (Eksali, Adsali, Pre-seasonal)",
        "duration_days": "11 – 15 months",
        "overview": "Sugarcane is a premier long-duration commercial agro-industrial cash crop supporting India's sugar, jaggery, ethanol, and bio-energy sectors.",
        "soil": {
            "preferred_ph": "6.5 – 8.0",
            "soil_type": ["Deep, rich, well-drained loams and clay loams", "Medium to heavy black soils with high organic matter"],
            "drainage": "Requires deep subsoil drainage; continuous waterlogging causes root rot and poor brix content."
        },
        "sowing": {
            "general_window": "Adsali (July–Aug), Pre-seasonal (Oct–Nov), Suru (Jan–Feb)",
            "seed_rate": "25,000 – 30,000 two-budded setts/ha or single-bud pro-tray raised seedlings",
            "spacing": "120–150 cm wide furrow row spacing",
            "depth": "7 – 10 cm in furrow base",
            "notes": [
                "Sett treatment with Carbendazim (1g/L) + Chlorpyrifos for 15 minutes before planting.",
                "Single bud settling technology saves 75% seed sett volume."
            ]
        },
        "water": {
            "requirements": "1800 – 2500 mm across the annual cycle",
            "critical_stages": [
                "Formative / Tillering stage (Days 60–130 - Crucial for stalk count)",
                "Grand Growth stage (Days 130–250 - Maximum biomass)",
                "Maturity & Ripening (Days 250–330)"
            ],
            "irrigation_methods": ["Sub-surface drip irrigation (saves 40%–50% water)", "Paired row drip fertigation"],
            "notes": ["Stop irrigation 15–20 days prior to cane harvest to enhance sugar sucrose recovery."]
        },
        "nutrition": {
            "general_considerations": [
                "High nutrient requirement: 250:115:115 kg/ha for Suru; 400:170:170 kg/ha for Adsali crop.",
                "Apply Nitrogen in 4 splits: 10% at planting, 40% at tillering, 10% at 90 days, and 40% at earthing-up (grand growth)."
            ],
            "organic_practices": [
                "Apply 25 tonnes FYM or Pressmud compost/ha during land preparation.",
                "Trash mulching (3.5–5 tonnes/ha) conserves soil moisture and suppresses weeds."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Early Shoot Borer (Chilo infuscatellus)",
                "type": "pest",
                "symptoms": "Dead heart in young shoots (1–3 months); emitting foul smell when pulled out.",
                "management": "Light earthing-up at 35–45 days; release Trichogramma chilonis @ 2.5 lakh/ha; trash mulching."
            },
            {
                "name": "Red Rot (Colletotrichum falcatum)",
                "type": "fungal",
                "symptoms": "Discoloration of third/fourth leaf; stalks show longitudinal red lesions with distinct white cross bands internally and alcoholic smell.",
                "management": "Use certified red-rot free setts (e.g. Co 86032, Co 0238); avoid ratoon crop in infected fields."
            },
            {
                "name": "White Grub (Holotrichia serrata)",
                "type": "pest",
                "symptoms": "Grubs feed on underground cane roots causing yellowing, drying, and easy uprooting of clumps.",
                "management": "Deep summer plowing; pheromone light traps for adult beetles; soil drenching with Metarhizium or entomopathogenic nematodes."
            }
        ],
        "prevention": [
            "Use hot-water treated (52°C for 30 minutes) disease-free seed cane nurseries.",
            "Do not harvest water-stressed cane; maintain balanced potash nutrition to resist borer attack."
        ],
        "harvest": {
            "maturity_signs": "Brix reading exceeds 18%–20% on hand refractometer; cane leaves dry; nodes become prominent.",
            "general_guidance": "Cut cane close to ground level using sharp cane knives; delivery to sugar mill within 24–48 hours to prevent sugar inversion.",
            "post_harvest": "For ratoon management, perform stubble shaving and trash management immediately."
        },
        "sources": [
            "ICAR — Sugarcane Breeding Institute (SBI), Coimbatore",
            "ICAR — Indian Institute of Sugarcane Research (IISR), Lucknow",
            "Vasantdada Sugar Institute (VSI), Pune, Maharashtra"
        ],
        "advisory_notice": "Cane varietal maturity groups (early, mid, late) dictate cutting schedule for optimal recovery percentage."
    },
    {
        "id": "tomato",
        "name": "Tomato",
        "scientific_name": "Solanum lycopersicum",
        "season": "Kharif / Rabi / Summer",
        "duration_days": "110 – 140 days",
        "overview": "Tomato is one of India's most widely consumed and cultivated commercial vegetable solanaceous crops, grown for fresh vegetable markets and processing.",
        "soil": {
            "preferred_ph": "6.0 – 7.0",
            "soil_type": ["Well-drained sandy loam to clay loam rich in organic matter"],
            "drainage": "Must have good surface drainage; prone to bacterial wilt and damping-off under waterlogged conditions."
        },
        "sowing": {
            "general_window": "Kharif: June–July; Rabi: Oct–Nov; Summer: Jan–Feb",
            "seed_rate": "150 – 200 g/ha for F1 hybrids (nursery raised in pro-trays)",
            "spacing": "90–120 cm row-to-row × 45–60 cm plant-to-plant on raised beds with staking/trellising",
            "depth": "1 cm in pro-tray cocopeat cells (transplanted after 25–30 days)",
            "notes": [
                "Seed treatment with Trichoderma viride (4g/kg) and Pseudomonas fluorescens.",
                "Silver-black plastic mulching (25–30 micron) suppresses weeds and conserves moisture."
            ]
        },
        "water": {
            "requirements": "400 – 600 mm",
            "critical_stages": [
                "Transplanting & Establishment (Days 1–10)",
                "Flowering & Fruit Setting (Days 45–65)",
                "Fruit Expansion & Ripening (Days 70–110)"
            ],
            "irrigation_methods": ["Drip irrigation with inline drippers"],
            "notes": ["Avoid fluctuating water supply which causes fruit cracking and Blossom End Rot (BER)."]
        },
        "nutrition": {
            "general_considerations": [
                "Fertilizer dose for hybrid tomato: 150:100:150 kg/ha N:P2O5:K2O.",
                "Apply Calcium Nitrate and Boron foliar sprays to prevent Blossom End Rot and fruit cracking.",
                "Drip fertigation with water-soluble fertilizers in weekly schedules."
            ],
            "organic_practices": [
                "Apply 20 tonnes FYM or 5 tonnes Vermicompost/ha.",
                "Incorporate neem cake @ 250 kg/ha to suppress root-knot nematodes."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Tomato Leaf Curl Virus (ToLCV)",
                "type": "disease",
                "symptoms": "Upward curling and puckering of leaves, severe stunting, and reduced fruit set.",
                "management": "Control vector Whitefly with yellow sticky traps; plant ToLCV-resistant hybrids; barrier crops (maize/sorghum)."
            },
            {
                "name": "Early Blight & Late Blight (Alternaria / Phytophthora)",
                "type": "fungal",
                "symptoms": "Concentric dark brown rings ('target spots') on leaves (Early blight); water-soaked rotting lesions on leaves and green fruit (Late blight).",
                "management": "Provide staking to keep foliage off wet soil; spray Mancozeb (2g/L) or Copper Oxychloride."
            },
            {
                "name": "Fruit Borer (Helicoverpa armigera) & Tuta absoluta",
                "type": "pest",
                "symptoms": "Caterpillars bore circular holes into green and ripe fruits; Tuta larvae create transparent leaf mines.",
                "management": "Pheromone traps (8/acre); spray Bacillus thuringiensis (Bt) or neem formulation."
            }
        ],
        "prevention": [
            "Mandatory staking / trellising with bamboo poles and GI wire to prevent soil-contact diseases.",
            "Strict 3-year crop rotation with non-solanaceous crops (avoid planting after potato/brinjal/chilli)."
        ],
        "harvest": {
            "maturity_signs": "Harvested at Breaker stage (pink blush on blossom end) for long-distance transport; Red-ripe stage for local markets.",
            "general_guidance": "Harvest fruits with small calyx stalk intact in morning or evening hours into plastic crates.",
            "post_harvest": "Keep harvested tomatoes under cool shade; avoid direct sun exposure and stacking crates too deep."
        },
        "sources": [
            "ICAR — Indian Institute of Horticultural Research (IIHR), Bengaluru",
            "ICAR — Indian Institute of Vegetable Research (IIVR), Varanasi",
            "Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri"
        ],
        "advisory_notice": "Staking and drip irrigation are strongly recommended for commercial hybrid tomato yields."
    },
    {
        "id": "onion",
        "name": "Onion",
        "scientific_name": "Allium cepa",
        "season": "Kharif / Late Kharif (Rangada) / Rabi (Winter)",
        "duration_days": "120 – 145 days",
        "overview": "Onion is an indispensable commercial bulb vegetable spice crop. Maharashtra (Nashik/Lasalgaon, Pune, Ahmednagar) produces over 35% of India's onion supply.",
        "soil": {
            "preferred_ph": "6.5 – 7.5 (sensitive to acidity below 6.0)",
            "soil_type": ["Well-drained deep friable sandy loam to clay loam rich in organic matter"],
            "drainage": "Excellent drainage mandatory; shallow root system is highly prone to root rot in saturated soils."
        },
        "sowing": {
            "general_window": "Kharif (Nursery: June, Transplant: July–Aug); Rabi (Nursery: Oct–Nov, Transplant: Dec–Jan)",
            "seed_rate": "8 – 10 kg/ha for nursery raising",
            "spacing": "15 cm row-to-row × 10 cm plant-to-plant on broad raised beds",
            "depth": "1.5 – 2.0 cm shallow transplanting",
            "notes": [
                "Seed treatment with Thiram (2g/kg) and Azospirillum culture.",
                "Transplant healthy 6–7 week old nursery seedlings with sturdy stems."
            ]
        },
        "water": {
            "requirements": "350 – 550 mm across 10–15 light irrigations",
            "critical_stages": [
                "Transplanting & Establishment (Days 1–10)",
                "Vegetative growth (Days 25–45)",
                "Bulb Initiation & Development (Days 60–90 - Critical)"
            ],
            "irrigation_methods": ["Micro-sprinkler", "Drip irrigation with inline emitters"],
            "notes": ["Stop irrigation 10–15 days prior to harvest to allow outer scales to cure and prevent neck rot in storage."]
        },
        "nutrition": {
            "general_considerations": [
                "Recommended NPK: 100:50:50 kg/ha + 30 kg Sulphur/ha (Sulphur is vital for pungency, bulb firmness, and storage quality).",
                "Apply entire P, K, Sulphur and 50% Nitrogen as basal; remaining 50% Nitrogen top-dressed in two splits at 30 and 45 days."
            ],
            "organic_practices": [
                "Apply 20 tonnes well-decomposed FYM/ha during field preparation.",
                "Foliar spray of Panchagavya (3%) at 30 and 50 days."
            ]
        },
        "pests_and_diseases": [
            {
                "name": "Onion Thrips (Thrips tabaci)",
                "type": "pest",
                "symptoms": "Silvery white blotches and speckles on leaves; leaf tips turn brown and curl upwards.",
                "management": "Blue and yellow sticky traps (15/acre); spray neem oil (5ml/L); avoid water stress."
            },
            {
                "name": "Purple Blotch (Alternaria porri)",
                "type": "fungal",
                "symptoms": "Sunken purplish spots with reddish-purple margins on leaves and seed stalks.",
                "management": "Seed treatment with Thiram; spray Mancozeb (2.5g/L) + sticker at first appearance."
            },
            {
                "name": "Stemphylium Leaf Blight",
                "type": "fungal",
                "symptoms": "Small yellow to orange spots that elongate into dark brown patches on leaf tips.",
                "management": "Grow tolerant varieties (Bhima Super, Bhima Shakti); spray Chlorothalonil (2g/L)."
            }
        ],
        "prevention": [
            "Always include Sulphur in basal fertilizer to strengthen bulb tunic and storage life.",
            "Avoid excessive late nitrogen applications which cause thick necks and rotting in storage."
        ],
        "harvest": {
            "maturity_signs": "50%–70% of plant tops fall over naturally ('top fall' / neck collapse); outer scales become dry and coloured.",
            "general_guidance": "Uproot bulbs carefully on clear dry sunny days; field cure with foliage covering bulbs for 3–5 days.",
            "post_harvest": "Cut foliage leaving 2.5–3 cm neck; shade cure for 10–12 days in well-ventilated traditional kanda chawl before storage."
        },
        "sources": [
            "ICAR — Directorate of Onion and Garlic Research (DOGR), Rajgurunagar, Pune",
            "Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri",
            "National Horticultural Research and Development Foundation (NHRDF), Nashik"
        ],
        "advisory_notice": "Proper field and shade curing of onion bulbs accounts for over 70% of storage longevity. Follow DOGR curing guidelines."
    }
]
