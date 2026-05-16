const calculatorNotes = new Map([
    [
        "./calculators/business/break-even",
        "Find the sales volume needed to cover fixed and variable costs.",
    ],
    [
        "./calculators/business/discount",
        "Calculate sale pricing, savings, and final customer cost.",
    ],
    [
        "./calculators/business/inventory-turnover",
        "Measure how often inventory is sold and replaced in a period.",
    ],
    [
        "./calculators/business/markup-markdown",
        "Compare cost, selling price, markup, and markdown decisions.",
    ],
    [
        "./calculators/business/payroll",
        "Estimate gross pay, payroll deductions, and take-home pay.",
    ],
    [
        "./calculators/business/profit-margin",
        "Calculate profit, margin, and markup from revenue and cost.",
    ],
    [
        "./calculators/business/roi",
        "Measure return on investment from gain and initial cost.",
    ],
    ["./calculators/business/tip", "Split a bill with a tip between multiple people."],
    [
        "./calculators/business/vat-sales-tax",
        "Add or extract VAT and sales tax from a price.",
    ],
    [
        "./calculators/construction/area",
        "Calculate area for rooms, lots, and project surfaces.",
    ],
    [
        "./calculators/construction/concrete",
        "Estimate concrete volume for slabs and pours.",
    ],
    [
        "./calculators/construction/flooring",
        "Estimate flooring material and cost with waste allowance.",
    ],
    [
        "./calculators/construction/home-affordability",
        "Estimate an affordable home price from income, debts, and payments.",
    ],
    [
        "./calculators/construction/lumber",
        "Estimate board feet and lumber cost for building projects.",
    ],
    ["./calculators/construction/paint", "Estimate paint gallons required for walls."],
    [
        "./calculators/construction/renovation-cost",
        "Estimate renovation budget with contingency.",
    ],
    [
        "./calculators/construction/roof-pitch",
        "Convert roof rise and run into pitch, angle, and slope factor.",
    ],
    [
        "./calculators/financial/credit-card-payoff",
        "Estimate payoff time and interest for a fixed monthly payment.",
    ],
    [
        "./calculators/financial/currency-converter",
        "Convert currency using your entered exchange rate.",
    ],
    [
        "./calculators/financial/emi",
        "Calculate monthly loan installments and total interest.",
    ],
    ["./calculators/financial/interest", "Calculate simple and compound interest."],
    [
        "./calculators/financial/investment-return",
        "Project investment growth with recurring contributions.",
    ],
    [
        "./calculators/financial/loan",
        "Estimate loan payments, total interest, and repayment schedules.",
    ],
    [
        "./calculators/financial/mortgage",
        "Estimate mortgage payment including tax and insurance.",
    ],
    ["./calculators/financial/net-worth", "Calculate assets minus liabilities."],
    [
        "./calculators/financial/retirement-planning",
        "Project retirement savings and monthly income needs.",
    ],
    [
        "./calculators/financial/savings-goal",
        "Calculate the monthly amount needed to reach a savings goal.",
    ],
    [
        "./calculators/financial/tax",
        "Choose an income tax or property tax calculator to estimate taxes for planning.",
    ],
    [
        "./calculators/financial/tax/income-tax",
        "Estimate taxable income, tax due, and after-tax income.",
    ],
    [
        "./calculators/financial/tax/property-tax",
        "Estimate annual and monthly property tax.",
    ],
    [
        "./calculators/health-fitness/bmi",
        "Calculate body mass index from height and weight.",
    ],
    [
        "./calculators/health-fitness/bmr",
        "Estimate basal metabolic rate from body measurements.",
    ],
    [
        "./calculators/health-fitness/body-fat",
        "Estimate body fat percentage using BMI, age, and sex.",
    ],
    [
        "./calculators/health-fitness/calorie",
        "Estimate daily calorie needs from BMR and activity level.",
    ],
    [
        "./calculators/health-fitness/heart-rate-zone",
        "Estimate training zones from age and resting heart rate.",
    ],
    [
        "./calculators/health-fitness/ideal-weight",
        "Estimate ideal body weight using a standard formula.",
    ],
    [
        "./calculators/health-fitness/macronutrient",
        "Split daily calories across protein, carbohydrates, and fat.",
    ],
    [
        "./calculators/health-fitness/pregnancy-due-date",
        "Estimate due date and pregnancy milestones.",
    ],
    [
        "./calculators/health-fitness/water-intake",
        "Estimate daily water intake from weight and activity.",
    ],
    [
        "./calculators/math-science/date-time",
        "Find the duration between two dates and times.",
    ],
    [
        "./calculators/math-science/equation-solver",
        "Solve linear equations in the form ax + b = c.",
    ],
    [
        "./calculators/math-science/fraction",
        "Add fractions and convert the result to a decimal.",
    ],
    [
        "./calculators/math-science/percentage",
        "Calculate percentages, changes, and remaining values.",
    ],
    [
        "./calculators/math-science/scientific",
        "Run common scientific operations on one value.",
    ],
    [
        "./calculators/math-science/standard",
        "Calculate with two numbers and a basic operator.",
    ],
    [
        "./calculators/math-science/statistics",
        "Calculate mean and sample spread for a set of values.",
    ],
    ["./calculators/math-science/unit-converter", "Convert common length units."],
    ["./calculators/travel/distance", "Calculate distance from speed and travel time."],
    [
        "./calculators/travel/flight-time",
        "Estimate total trip time including taxi and layover time.",
    ],
    ["./calculators/travel/gas-cost", "Estimate fuel cost for a trip."],
    [
        "./calculators/travel/mileage",
        "Calculate fuel mileage from miles driven and fuel used.",
    ],
    [
        "./calculators/travel/timezone-converter",
        "Convert an hour between two UTC offsets.",
    ],
    ["./calculators/travel/toll-cost", "Estimate total toll cost for repeated tolls."],
    [
        "./calculators/travel/trip-cost",
        "Estimate total trip cost across fuel, lodging, food, and tolls.",
    ],
    ["./calculators/utility/age", "Calculate age from birth date to a target date."],
    [
        "./calculators/utility/carbon-footprint",
        "Estimate annual transport emissions from mileage and efficiency.",
    ],
    [
        "./calculators/utility/cooking-converter",
        "Convert cups, tablespoons, and milliliters.",
    ],
    ["./calculators/utility/discount", "Calculate sale price and savings."],
    [
        "./calculators/utility/electricity-cost",
        "Estimate energy use and cost for an appliance.",
    ],
    ["./calculators/utility/split-bill", "Split a bill after tax and tip."],
    [
        "./calculators/utility/time-duration",
        "Calculate duration between two times on the same day.",
    ],
    ["./calculators/utility/tip", "Calculate tip and per-person total."],
    ["./calculators/utility/water-usage", "Estimate household water use."],
]);

export function getCalculatorNote(path: string) {
    return calculatorNotes.get(path) ?? "";
}

export const calculatorGroups = [
    {
        key: "business",
        name: "Business Calculators",
        path: "./business",
        calculators: [
            {
                name: "Break Even Calculator",
                path: "./calculators/business/break-even",
            },
            {
                name: "Discount Calculator",
                path: "./calculators/business/discount",
            },
            {
                name: "Inventory Turnover Calculator",
                path: "./calculators/business/inventory-turnover",
            },
            {
                name: "Markup Markdown Calculator",
                path: "./calculators/business/markup-markdown",
            },
            {
                name: "Payroll Calculator",
                path: "./calculators/business/payroll",
            },
            {
                name: "Profit Margin Calculator",
                path: "./calculators/business/profit-margin",
            },
            {
                name: "Roi Calculator",
                path: "./calculators/business/roi",
            },
            {
                name: "Tip Calculator",
                path: "./calculators/business/tip",
            },
            {
                name: "Vat Sales Tax Calculator",
                path: "./calculators/business/vat-sales-tax",
            },
        ],
    },
    {
        key: "construction",
        name: "Construction Calculators",
        path: "./construction",
        calculators: [
            {
                name: "Area Calculator",
                path: "./calculators/construction/area",
            },
            {
                name: "Concrete Calculator",
                path: "./calculators/construction/concrete",
            },
            {
                name: "Flooring Calculator",
                path: "./calculators/construction/flooring",
            },
            {
                name: "Home Affordability Calculator",
                path: "./calculators/construction/home-affordability",
            },
            {
                name: "Lumber Calculator",
                path: "./calculators/construction/lumber",
            },
            {
                name: "Paint Calculator",
                path: "./calculators/construction/paint",
            },
            {
                name: "Renovation Cost Calculator",
                path: "./calculators/construction/renovation-cost",
            },
            {
                name: "Roof Pitch Calculator",
                path: "./calculators/construction/roof-pitch",
            },
        ],
    },
    {
        key: "financial",
        name: "Financial Calculators",
        path: "./financial",
        calculators: [
            {
                name: "Credit Card Payoff Calculator",
                path: "./calculators/financial/credit-card-payoff",
            },
            {
                name: "Currency Converter Calculator",
                path: "./calculators/financial/currency-converter",
            },
            {
                name: "Emi Calculator",
                path: "./calculators/financial/emi",
            },
            {
                name: "Interest Calculator",
                path: "./calculators/financial/interest",
            },
            {
                name: "Investment Return Calculator",
                path: "./calculators/financial/investment-return",
            },
            {
                name: "Loan Calculator",
                path: "./calculators/financial/loan",
            },
            {
                name: "Mortgage Calculator",
                path: "./calculators/financial/mortgage",
            },
            {
                name: "Net Worth Calculator",
                path: "./calculators/financial/net-worth",
            },
            {
                name: "Retirement Planning Calculator",
                path: "./calculators/financial/retirement-planning",
            },
            {
                name: "Savings Goal Calculator",
                path: "./calculators/financial/savings-goal",
            },
            {
                name: "Tax Calculator",
                path: "./calculators/financial/tax",
            },
        ],
    },
    {
        key: "health-fitness",
        name: "Health Fitness Calculators",
        path: "./health-fitness",
        calculators: [
            {
                name: "Bmi Calculator",
                path: "./calculators/health-fitness/bmi",
            },
            {
                name: "Bmr Calculator",
                path: "./calculators/health-fitness/bmr",
            },
            {
                name: "Body Fat Calculator",
                path: "./calculators/health-fitness/body-fat",
            },
            {
                name: "Calorie Calculator",
                path: "./calculators/health-fitness/calorie",
            },
            {
                name: "Heart Rate Zone Calculator",
                path: "./calculators/health-fitness/heart-rate-zone",
            },
            {
                name: "Ideal Weight Calculator",
                path: "./calculators/health-fitness/ideal-weight",
            },
            {
                name: "Macronutrient Calculator",
                path: "./calculators/health-fitness/macronutrient",
            },
            {
                name: "Pregnancy Due Date Calculator",
                path: "./calculators/health-fitness/pregnancy-due-date",
            },
            {
                name: "Water Intake Calculator",
                path: "./calculators/health-fitness/water-intake",
            },
        ],
    },
    {
        key: "math-science",
        name: "Math Science Calculators",
        path: "./math-science",
        calculators: [
            {
                name: "Date Time Calculator",
                path: "./calculators/math-science/date-time",
            },
            {
                name: "Equation Solver Calculator",
                path: "./calculators/math-science/equation-solver",
            },
            {
                name: "Fraction Calculator",
                path: "./calculators/math-science/fraction",
            },
            {
                name: "Percentage Calculator",
                path: "./calculators/math-science/percentage",
            },
            {
                name: "Scientific Calculator",
                path: "./calculators/math-science/scientific",
            },
            {
                name: "Standard Calculator",
                path: "./calculators/math-science/standard",
            },
            {
                name: "Statistics Calculator",
                path: "./calculators/math-science/statistics",
            },
            {
                name: "Unit Converter Calculator",
                path: "./calculators/math-science/unit-converter",
            },
        ],
    },
    {
        key: "travel",
        name: "Travel Calculators",
        path: "./travel",
        calculators: [
            {
                name: "Distance Calculator",
                path: "./calculators/travel/distance",
            },
            {
                name: "Flight Time Calculator",
                path: "./calculators/travel/flight-time",
            },
            {
                name: "Gas Cost Calculator",
                path: "./calculators/travel/gas-cost",
            },
            {
                name: "Mileage Calculator",
                path: "./calculators/travel/mileage",
            },
            {
                name: "Timezone Converter Calculator",
                path: "./calculators/travel/timezone-converter",
            },
            {
                name: "Toll Cost Calculator",
                path: "./calculators/travel/toll-cost",
            },
            {
                name: "Trip Cost Calculator",
                path: "./calculators/travel/trip-cost",
            },
        ],
    },
    {
        key: "utility",
        name: "Utility Calculators",
        path: "./utility",
        calculators: [
            {
                name: "Age Calculator",
                path: "./calculators/utility/age",
            },
            {
                name: "Carbon Footprint Calculator",
                path: "./calculators/utility/carbon-footprint",
            },
            {
                name: "Cooking Converter Calculator",
                path: "./calculators/utility/cooking-converter",
            },
            {
                name: "Discount Calculator",
                path: "./calculators/utility/discount",
            },
            {
                name: "Electricity Cost Calculator",
                path: "./calculators/utility/electricity-cost",
            },
            {
                name: "Split Bill Calculator",
                path: "./calculators/utility/split-bill",
            },
            {
                name: "Time Duration Calculator",
                path: "./calculators/utility/time-duration",
            },
            {
                name: "Tip Calculator",
                path: "./calculators/utility/tip",
            },
            {
                name: "Water Usage Calculator",
                path: "./calculators/utility/water-usage",
            },
        ],
    },
] as const;
