// src/utils/solarCalculator.js

export const CONSTANTS = {
    CENA_KWH: 1.05,               // Realny koszt brutto z dystrybucją po odmrożeniu cen
    WZROST_CENY_ENERGII: 0.05,
    KWH_NA_KWP: 1000,
    M2_PER_KWP: 5,
    KOSZT_PV_ZA_KWP: 4200,
    DOPLATA_GRUNT_ZA_KWP: 600,    // Realniejszy koszt konstrukcji gruntowej
    MAGAZYN_ENERGII_KWH: 7.5,
    KOSZT_MAGAZYNU: 16000,        // Aktualne ceny rynkowe magazynów
    WARTOSC_ODDANEJ_ENERGII: 0.32,// Realna średnia RCEm w systemie Net-billing
    COP_POMPY_CIEPLA: 3.0,        // Realny SCOP dla polskiego klimatu (A7/W35)
    LATA_PROGNOZY: 25,
};

export const MODIFIERS = {
    REGION: [
        { value: 'Dolnośląskie', label: 'Dolnośląskie', modifier: 1.03 },
        { value: 'Kujawsko-Pomorskie', label: 'Kujawsko-Pomorskie', modifier: 0.98 },
        { value: 'Lubelskie', label: 'Lubelskie', modifier: 1.05 },
        { value: 'Lubuskie', label: 'Lubuskie', modifier: 1.01 },
        { value: 'Łódzkie', label: 'Łódzkie', modifier: 1.00 },
        { value: 'Małopolskie', label: 'Małopolskie', modifier: 1.04 },
        { value: 'Mazowieckie', label: 'Mazowieckie', modifier: 1.00 },
        { value: 'Opolskie', label: 'Opolskie', modifier: 1.04 },
        { value: 'Podkarpackie', label: 'Podkarpackie', modifier: 1.05 },
        { value: 'Podlaskie', label: 'Podlaskie', modifier: 0.96 },
        { value: 'Pomorskie', label: 'Pomorskie', modifier: 0.97 },
        { value: 'Śląskie', label: 'Śląskie', modifier: 1.02 },
        { value: 'Świętokrzyskie', label: 'Świętokrzyskie', modifier: 1.03 },
        { value: 'Warmińsko-Mazurskie', label: 'Warmińsko-Mazurskie', modifier: 0.95 },
        { value: 'Wielkopolskie', label: 'Wielkopolskie', modifier: 1.00 },
        { value: 'Zachodniopomorskie', label: 'Zachodniopomorskie', modifier: 0.96 },
    ],
    ORIENTATION: [
        { value: 'N', label: 'Północ', modifier: 0.55 },
        { value: 'NE', label: 'Północny-Wschód', modifier: 0.65 },
        { value: 'E', label: 'Wschód', modifier: 0.88 },
        { value: 'SE', label: 'Południowy-Wschód', modifier: 0.95 },
        { value: 'S', label: 'Południe', modifier: 1.00 },
        { value: 'SW', label: 'Południowy-Zachód', modifier: 0.95 },
        { value: 'W', label: 'Zachód', modifier: 0.88 },
        { value: 'NW', label: 'Północny-Zachód', modifier: 0.65 },
    ],
    SHADING: [
        { value: 'none', label: 'Brak zacienienia', modifier: 1.00 },
        { value: 'partial', label: 'Częściowe zacienienie', modifier: 0.75 },
        { value: 'heavy', label: 'Duże zacienienie', modifier: 0.50 },
    ],
    ROOF_AGE: {
        '0-5': 1.0,
        '6-10': 0.98,
        '11-20': 0.95,
        '21-30': 0.9,
    },
    BUILDING_AREA: {
        house: 130,
        apartment: 95,
        commercial: 220,
        other: 120,
    },
    BUILDING_AREA_MULTIPLIER: {
        house: 1.15,
        apartment: 0.9,
        commercial: 1.6,
        other: 1.0,
    },
    INSULATION_DEMAND: {
        good: 60,
        average: 95,
        poor: 140,
    },
    HEATING_COST_PER_KWH: {
        coal: 0.23,
        electric: 1.25,
        gas: 0.36,
        oil: 0.58,
        district: 0.48,
        other: 0.42,
    },
    PLAN_DEMAND: {
        'electric-car': 2500,
        'air-conditioning': 650,
        other: 400,
    },
    HORIZON_LABELS: {
        0: 'od razu',
        '0-0.3': 'do 3 miesiecy',
        '0.3-0.6': 'do 6 miesiecy',
        1: 'do 1 roku',
        2: 'pozniej',
    },
};

const PLAN_LABELS = {
    'electric-car': 'Samochod elektryczny',
    'home-battery': 'Magazyn energii',
    'heat-pump': 'Pompa ciepla',
    'air-conditioning': 'Klimatyzacja',
    other: 'Inne urzadzenie',
};

const toNumber = (value, fallback = 0) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const round = (value, precision = 2) => {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const hasPlan = (plans, plan) => plans.includes(plan);

const estimateHeatedArea = (inputs) => {
    const buildingType = inputs.BuildingType || 'house';
    const roofArea = toNumber(inputs.roofArea, 0);
    const fallbackArea = MODIFIERS.BUILDING_AREA[buildingType] || MODIFIERS.BUILDING_AREA.house;
    const multiplier = MODIFIERS.BUILDING_AREA_MULTIPLIER[buildingType] || 1;

    if (!roofArea) {
        return fallbackArea;
    }

    return Math.max(roofArea * multiplier, 60);
};

const estimateHeatPumpProfile = (inputs) => {
    const area = estimateHeatedArea(inputs);
    const insulation = inputs.insulationQuality || 'average';
    const heatingType = inputs.heatingType || 'electric';
    const specificDemand = MODIFIERS.INSULATION_DEMAND[insulation] || MODIFIERS.INSULATION_DEMAND.average;
    const yearlyHeatDemand = area * specificDemand;
    const currentCostPerKwh = MODIFIERS.HEATING_COST_PER_KWH[heatingType] || MODIFIERS.HEATING_COST_PER_KWH.other;
    const currentHeatingCost = yearlyHeatDemand * currentCostPerKwh;
    const heatPumpElectricity = yearlyHeatDemand / CONSTANTS.COP_POMPY_CIEPLA;
    const heatPumpCost = heatPumpElectricity * CONSTANTS.CENA_KWH;

    return {
        yearlyHeatDemand,
        heatPumpElectricity,
        currentHeatingCost,
        heatPumpCost,
        yearlySavings: Math.max(currentHeatingCost - heatPumpCost, 0),
    };
};

const getPlacementCapacity = (inputs) => {
    const placements = inputs.PannelPlacement || [];
    const roofArea = toNumber(inputs.roofArea, 0);

    if (!roofArea) {
        return Infinity;
    }

    const roofCapacity = roofArea / CONSTANTS.M2_PER_KWP;

    if (placements.includes('ground') && placements.includes('roof')) {
        return roofCapacity * 1.75;
    }

    if (placements.includes('ground')) {
        return roofCapacity * 2;
    }

    return roofCapacity;
};

const getSelfConsumptionRate = (yearlyConsumption, plans) => {
    let rate = 0.22; // Realna bazowa autokonsumpcja bez magazynu (~20-25%)

    if (yearlyConsumption > 6000) {
        rate += 0.03;
    }
    if (hasPlan(plans, 'electric-car')) {
        rate += 0.08;
    }
    if (hasPlan(plans, 'heat-pump')) {
        rate += 0.12;
    }
    if (hasPlan(plans, 'air-conditioning')) {
        rate += 0.05;
    }
    if (hasPlan(plans, 'home-battery')) {
        rate += 0.30; // Magazyn daje największy przyrost autokonsumpcji
    }

    return clamp(rate, 0.15, 0.75); // Max 75% – fizycznie nieosiągalne bez dużego magazynu
};

const calculateScenario = (inputs, plans) => {
    const region = inputs.Region || 'Mazowieckie';
    const regionModifier = MODIFIERS.REGION.find((r) => r.value === region)?.modifier || 1;
    const orientation = inputs.roofOrientation || 'S';
    const orientationModifier = MODIFIERS.ORIENTATION.find((o) => o.value === orientation)?.modifier || 1;
    const shading = inputs.roofShading || 'none';
    const shadingModifier = MODIFIERS.SHADING.find((s) => s.value === shading)?.modifier || 1;
    const roofAge = inputs.roofAge || '0-5';
    const roofAgeModifier = MODIFIERS.ROOF_AGE[roofAge] || 1;
    const placements = inputs.PannelPlacement || [];
    const monthlyBill = toNumber(inputs.electricityBill, 0);
    const yearlyBill = monthlyBill * 12;
    const baseConsumption = yearlyBill / CONSTANTS.CENA_KWH;
    const planDemand = plans.reduce((sum, plan) => sum + (MODIFIERS.PLAN_DEMAND[plan] || 0), 0);

    const heatPumpProfile = hasPlan(plans, 'heat-pump')
        ? estimateHeatPumpProfile(inputs)
        : null;
    const heatPumpDemand = heatPumpProfile?.heatPumpElectricity || 0;

    const yearlyConsumption = baseConsumption + planDemand + heatPumpDemand;
    const placementCapacity = getPlacementCapacity(inputs);
    const groundBonus = placements.includes('ground') ? 1.02 : 1;
    const productionPerKwp = CONSTANTS.KWH_NA_KWP * regionModifier * orientationModifier * shadingModifier * roofAgeModifier * groundBonus;
    const requiredKwp = yearlyConsumption > 0 ? yearlyConsumption / productionPerKwp : 0;
    const installedKwp = Math.min(requiredKwp, placementCapacity);
    const yearlyProductionKwh = installedKwp * productionPerKwp;
    const selfConsumptionRate = getSelfConsumptionRate(yearlyConsumption, plans);
    const selfConsumedKwh = Math.min(yearlyProductionKwh * selfConsumptionRate, yearlyConsumption);
    const exportedKwh = Math.max(yearlyProductionKwh - selfConsumedKwh, 0);
    const yearlySavings = (selfConsumedKwh * CONSTANTS.CENA_KWH)
        + (exportedKwh * CONSTANTS.CENA_KWH * CONSTANTS.WARTOSC_ODDANEJ_ENERGII);

    return {
        baseConsumption,
        planDemand,
        heatPumpDemand,
        heatPumpProfile,
        yearlyConsumption,
        requiredKwp,
        installedKwp,
        yearlyProductionKwh,
        selfConsumptionRate,
        selfConsumedKwh,
        exportedKwh,
        yearlySavings,
        maxKwpFromPlacement: placementCapacity,
    };
};

const estimateInvestment = (inputs, installedKwp, plans) => {
    const placements = inputs.PannelPlacement || [];
    const hasBattery = hasPlan(plans, 'home-battery');
    const roofAge = inputs.roofAge || '0-5';
    const roofSurcharge = 0; // Stary dach (21-30 lat) wymaga indywidualnej oceny dekarskiej – koszt wymiany poszycia może wynosić 20-50 tys. zł i leży poza zakresem instalacji PV
    const groundSurcharge = placements.includes('ground') ? installedKwp * CONSTANTS.DOPLATA_GRUNT_ZA_KWP : 0;
    const pvCost = installedKwp * CONSTANTS.KOSZT_PV_ZA_KWP;
    const batteryCost = hasBattery ? CONSTANTS.KOSZT_MAGAZYNU : 0;
    const grossCost = pvCost + batteryCost + roofSurcharge + groundSurcharge;

    return {
        hasBattery,
        pvCost,
        batteryCost,
        roofSurcharge,
        groundSurcharge,
        grossCost,
    };
};

const estimateGrant = (inputs, investment) => {
    const ownership = inputs.Ownership || 'own';
    const buildingType = inputs.BuildingType || 'house';
    const dotation = inputs.IntrestInDotaions || 'none';
    const residentialEligible = ownership === 'own' && ['house', 'apartment'].includes(buildingType);

    if (!residentialEligible || dotation === 'none') {
        return {
            amount: 0,
            label: dotation === 'none' ? 'Brak dotacji' : 'Dotacja malo prawdopodobna przy tym profilu',
        };
    }

    if (dotation === 'basic') {
        if (!investment.hasBattery) {
            return {
                amount: 0,
                label: 'Program podstawowy wymaga magazynu energii – brak kwalifikacji bez magazynu',
            };
        }

        const pvGrant = Math.min(investment.pvCost * 0.5, 7000);
        const batteryGrant = Math.min(investment.batteryCost * 0.5, 16000);

        return {
            amount: Math.min(pvGrant + batteryGrant, 28000),
            label: 'Szacunek programu podstawowego',
        };
    }

    const baseGrant = investment.hasBattery
        ? Math.min(
            Math.min(investment.pvCost * 0.5, 7000) + Math.min(investment.batteryCost * 0.5, 16000),
            28000,
        )
        : 0;
    const thermoBase = Math.min(investment.grossCost - baseGrant, 53000); // limit ustawowy ulgi termomodernizacyjnej
    const thermoRelief = Math.max(thermoBase * 0.12, 0);

    return {
        amount: baseGrant + thermoRelief,
        label: investment.hasBattery
            ? 'Szacunek programu rozszerzonego + ulga termomodernizacyjna'
            : 'Szacunek ulgi termomodernizacyjnej',
    };
};

const getAssumptions = (inputs, scenario, grant, investment) => {
    const assumptions = [
        'To jest szacunek marketingowo-handlowy, a nie audyt projektowy.',
        `Uwzgledniono obecne ceny energii ${CONSTANTS.CENA_KWH.toFixed(2)} zl/kWh i wzrost ${Math.round(CONSTANTS.WZROST_CENY_ENERGII * 100)}% rocznie.`,
        `Start inwestycji: ${MODIFIERS.HORIZON_LABELS[inputs.HorizonOfInvestment] || 'bez deklaracji terminu'}.`,
    ];

    if (scenario.maxKwpFromPlacement !== Infinity && scenario.requiredKwp > scenario.maxKwpFromPlacement) {
        assumptions.push('Powierzchnia lub miejsce montazu ogranicza moc instalacji; dlatego rekomendacja nie pokrywa calego przyszlego zuzycia.');
    }

    if ((inputs.PannelPlacement || []).includes('roof') && inputs.roofAge === '21-30') {
        assumptions.push('UWAGA: Dach w wieku 21-30 lat może wymagać całkowitej wymiany poszycia przed montażem PV. Koszt wymiany dachu (20-50 tys. zł) leży poza zakresem tej kalkulacji i wymaga osobnej wyceny dekarskiej.');
    }

    if (grant.amount === 0 && inputs.IntrestInDotaions !== 'none') {
        if (investment.hasBattery) {
            assumptions.push('Przy wybranym statusie wlasnosci lub typie budynku przyjalem brak standardowej dotacji dla gospodarstw domowych.');
        }
    }

    return assumptions;
};

const getPlanBreakdown = (inputs, baseScenario, plans) => plans.map((plan) => {
    if (plan === 'home-battery') {
        const batteryScenario = calculateScenario(inputs, ['home-battery']);
        return {
            key: plan,
            label: PLAN_LABELS[plan],
            addedDemandKwh: 0,
            extraSolarSavings: round(batteryScenario.yearlySavings - baseScenario.yearlySavings),
            extraHeatSavings: 0,
            note: 'Magazyn nie zwieksza zuzycia, ale poprawia autokonsumpcje energii z PV.',
        };
    }

    if (plan === 'heat-pump') {
        const heatPumpScenario = calculateScenario(inputs, ['heat-pump']);
        return {
            key: plan,
            label: PLAN_LABELS[plan],
            addedDemandKwh: round(heatPumpScenario.heatPumpDemand),
            extraSolarSavings: round(heatPumpScenario.yearlySavings - baseScenario.yearlySavings),
            extraHeatSavings: round(heatPumpScenario.heatPumpProfile?.yearlySavings || 0),
            note: 'Pokazuje synergie PV z pompa ciepla oraz orientacyjna oszczednosc na ogrzewaniu.',
        };
    }

    const scenario = calculateScenario(inputs, [plan]);
    return {
        key: plan,
        label: PLAN_LABELS[plan] || plan,
        addedDemandKwh: round(MODIFIERS.PLAN_DEMAND[plan] || 0),
        extraSolarSavings: round(scenario.yearlySavings - baseScenario.yearlySavings),
        extraHeatSavings: 0,
        note: 'Dodatkowe zuzycie poprawia wykorzystanie energii produkowanej na miejscu.',
    };
});

export const calculateSolarYield = (inputs = {}) => {
    const selectedPlans = Array.isArray(inputs.planingInTwoYears) ? inputs.planingInTwoYears : [];
    const baseScenario = calculateScenario(inputs, []);
    const enhancedScenario = calculateScenario(inputs, selectedPlans);
    const investment = estimateInvestment(inputs, enhancedScenario.installedKwp, selectedPlans);
    const grant = estimateGrant(inputs, investment);
    const netInvestment = Math.max(investment.grossCost - grant.amount, 0);
    const paybackYears = enhancedScenario.yearlySavings > 0 ? netInvestment / enhancedScenario.yearlySavings : 0;
    const yearlySavingsNextYear = enhancedScenario.yearlySavings * (1 + CONSTANTS.WZROST_CENY_ENERGII);
    const planBreakdown = getPlanBreakdown(inputs, baseScenario, selectedPlans);
    const totalPotentialBenefit = enhancedScenario.yearlySavings
        + planBreakdown.reduce((sum, item) => sum + item.extraHeatSavings, 0);

    const projected25Years = Array.from({ length: CONSTANTS.LATA_PROGNOZY }, (_, index) => {
        const year = new Date().getFullYear() + index + 1;
        const factor = (1 + CONSTANTS.WZROST_CENY_ENERGII) ** (index + 1);
        return {
            year,
            yearlyBenefit: round(totalPotentialBenefit * factor),
        };
    });

    return {
        monthlySavings: round(enhancedScenario.yearlySavings / 12),
        yearlySavings: round(enhancedScenario.yearlySavings),
        savingsNextYear: round(yearlySavingsNextYear),
        installedKwp: round(enhancedScenario.installedKwp),
        recommendedKwp: round(enhancedScenario.requiredKwp),
        yearlyProductionKwh: round(enhancedScenario.yearlyProductionKwh),
        yearlyConsumptionKwh: round(enhancedScenario.yearlyConsumption),
        currentConsumptionKwh: round(baseScenario.baseConsumption),
        additionalPlannedDemandKwh: round(enhancedScenario.planDemand + enhancedScenario.heatPumpDemand),
        selfConsumptionRate: round(enhancedScenario.selfConsumptionRate * 100),
        selfConsumedKwh: round(enhancedScenario.selfConsumedKwh),
        exportedKwh: round(enhancedScenario.exportedKwh),
        estimatedSystemCost: round(investment.grossCost),
        estimatedGrant: round(grant.amount),
        estimatedNetCost: round(netInvestment),
        paybackYears: round(paybackYears, 1),
        totalPotentialYearlyBenefit: round(totalPotentialBenefit),
        benefit25Years: round(projected25Years.reduce((sum, item) => sum + item.yearlyBenefit, 0)),
        grantLabel: grant.label,
        assumptions: getAssumptions(inputs, enhancedScenario, grant, investment),
        planBreakdown,
        projected25Years,
    };
};
