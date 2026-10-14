import BusinessPlanProblemSection from "./business-plan-problem-section"
import BusinessPlanFeasibilitySection from "./business-plan-feasibility-section"
import BusinessPlanGrowthStrategySection from "./business-plan-growth-strategy-section"
import BusinessPlanTeamSection from "./business-plan-team-section"

function BusinessPlanReport() {
    return (
        <>
            <BusinessPlanProblemSection />
            <BusinessPlanFeasibilitySection />
            <BusinessPlanGrowthStrategySection />
            <BusinessPlanTeamSection />
        </>
    )
}

export default BusinessPlanReport
