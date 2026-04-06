import { useState } from "react";
import PackageSelection from "./PackageSelection";
import SetQuantity from "./SetQuantity";
import Recommendation from "./Recommendation";
import Modification from "./Modification";

export default function OrderMenu() {
    const [step, setStep] = useState("package");

    return (
        <>
            {step === "package" && (
                <PackageSelection
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "quantity" && (
                <SetQuantity
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "recommendation" && (
                <Recommendation
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
            {step === "modification" && (
                <Modification
                    onNext={(nextStep: string) => setStep(nextStep)}
                />
            )}
        </>
    );
}